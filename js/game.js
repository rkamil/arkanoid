//by Akhad

//USTAWIENIA GRY
var buttons = {
	left: false,
	right: false,
	launch: false
};
var mouse = {
	x: 0,
	y: 0
};
var fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });

//ZMIENNE GRY
var ctx = game.canvas.getContext('2d');
var current_level = new Level_1();
var gravity = 0.32;

var gameplay = {
	gravity: 0,
	bounce_speedup: 10
};

current_level.prepare();

var remaining_balls = 3;

var paddle = new Paddle();
var balls = [];

balls.push(new Ball());

var ball = balls[0];

var ball_launched = false;

//TWEAK BAR
var gui = new dat.GUI();
var f1 = gui.addFolder('Game');
var f2 = gui.addFolder('Ball');
var f3 = gui.addFolder('Paddle');
var f4 = gui.addFolder('Blocks');
var f5 = gui.addFolder('Visuals');

f1.add(gameplay, 'gravity').min(0).max(10).step(0.01);
f1.add(gameplay, 'bounce_speedup').min(0).max(100).step(0.5);
f1.add(current_level, 'reset_level');

f2.add(ball, 'minSpeed').min(100).max(2000).step(1);
f2.add(ball, 'maxSpeed').min(100).max(2000).step(1);
f2.add(ball, 'speed').min(100).max(2000).step(1);

f3.add(paddle, 'speed').min(1).max(1000).step(1);

f5.addColor(Block.prototype, 'color')
f5.addColor(ball, 'color');
f5.addColor(paddle, 'color');
f5.addColor(game, 'background');

//AKTUALIZACJA LOGIKI
function update(step) {
	
	//aktualizacja paletki
	paddle.update(step);
	
	//aktualizacja wszystkich piłek
	for (var i in balls)
		balls[i].update(step);
	
	//jeśli piłka nie wystrzelona...
	if (!ball_launched) {
		balls[0].x = paddle.x + (paddle.width / 2) - (balls[0].width / 2);
		balls[0].y = paddle.y - balls[0].height - 0.1;
	}
	
	//wystrzelenie piłki
	if (buttons.launch && !ball_launched) {
		var d = Math.random() * (0.5 - 0.5 + 1) - 0.5;
		var v = new Vec(0, 0.5);

		v.normalize();
		
		balls[0].vx = v.x;
		balls[0].vy = -v.y;
		ball_launched = true;

	}
	
	//kolizja piłek z paletką
	for (var i in balls) {
		if (balls[i].rectCollision(paddle)) {
			
			var hit_x = balls[i].x + balls[i].width / 2;
			var paddle_center = paddle.x + paddle.width / 2;
			
			var angle = (hit_x - paddle_center) / paddle.width;
			
			console.log('hit angle: ' + angle);
			
			var new_angle = new Vec(angle * 1.5, ball.vy);
			new_angle.normalize();
			
			balls[i].y = paddle.y - balls[i].height - 0.1;
			
			balls[i].vx = new_angle.x;
			balls[i].vy *= -1;
			
			balls[i].speed += gameplay.bounce_speedup;
			
			paddle.y = 465;
			Tweener.addTween(paddle, {y: 460, time: 0.5});
		}
	}
	
	//skucie się
	if (balls[0].y >= game.height) {
		remaining_balls -= 1;
		
		//reset piłki
		balls[0].speed = 400;
		balls[0].vx = 0;
		balls[0].vy = 0;
		ball_launched = false;
		
		//animacja paletki
		paddle.width = 0;
		Tweener.addTween(paddle, {width: Paddle.prototype.width, time: 0.8});
	}
	
	//aktualizacja poziomu
	current_level.update(step);
	
	//aktualizacja tweak bara
	for (var i in gui.__controllers) {
		gui.__controllers[i].updateDisplay();
	}
	
}

//RYSOWANIE GRY
function draw(ctx) {

	//ctx.save();
	//ctx.fillStyle = 'rgba(116, 66, 66, 0.4)';
	//ctx.fillRect(0, 0, game.width, game.height);
	//ctx.restore();
	
	ctx.save();
	ctx.fillStyle = game.background;
	ctx.fillRect(0, 0, game.width, game.height);
	ctx.restore();
	
	//rysowanie paletki
	paddle.draw(ctx);
	
	//rysowanie wszystkich piłek
	for (var i in balls)
		balls[i].draw(ctx);
	
	//narysowanie bloczków
	//current_level.draw(ctx);
	for (var i in current_level.blocks) {
		current_level.blocks[i].draw(ctx);
	}
	
	//rysowanie elementów interfejsu
	for (var i = 0; i < remaining_balls; i++) {
		var x = (game.width - 20) - (20 * i);
		var y = game.height - 40;
		
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.restore();
	}
	
	//rysowanie napisów
	ctx.save();
	ctx.fillStyle = 'rgba(200, 200, 200, 1)'
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = 'bold 64px Helvetica';
	if (current_level.blocks.length == 0) ctx.fillText('CLEAR!', game.width / 2, game.height / 2 - 40);
	ctx.restore();
	
}

//GŁÓWNA PĘTLA GRY
var now = 0,
	dt = 0,
	last = (new Date).getTime(),
	step = 1/60.0;
	
function run() {
	fpsmeter.tickStart();
	now = (new Date).getTime();
	dt = dt + Math.min(1, (now - last) / 1000);
	
	while (dt > step) {
		dt = dt - step;
		update(step);
		draw(ctx);
	}
	
	last = now;
	
	requestAnimationFrame(run);
	fpsmeter.tick();
}

run();

//OBSŁUGA ZDARZEŃ
document.onmousemove = function (e) {
	var rect = game.canvas.getBoundingClientRect();
	var x = e.clientX - rect.left;
	var y = e.clientY - rect.top;
	mouse.x = Math.ceil(x);
	mouse.y = Math.ceil(y);
}

document.onmousedown = function (e) {
	buttons.launch = true;
}

document.onmouseup = function (e) {
	buttons.launch = false;
}

document.onkeydown = function (e) {
	if (e.which == 37 || e.which == 65) buttons.left = true;
	if (e.which == 39 || e.which == 68) buttons.right = true;
	if (e.which == 32) buttons.launch = true;
}

document.onkeyup = function (e) {
	if (e.which == 37 || e.which == 65) buttons.left = false;
	if (e.which == 39 || e.which == 68) buttons.right = false;
	if (e.which == 32) buttons.launch = false;
}
