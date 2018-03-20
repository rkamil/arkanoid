function Paddle() {}

Paddle.prototype = new Rect((game.width / 2) - 50, 460, 100, 14);

Paddle.prototype.vx = 0;
Paddle.prototype.last_vx = 0;
Paddle.prototype.dir = 0;

Paddle.prototype.speed = 120;

Paddle.prototype.color = '#f39c12';

Paddle.prototype.update = function (step) {
	
	
	//prędkość w ostatniej klatce
	this.prev_vx = this.vx;
	
	//zdarzenia gracza
	/*if (buttons.left) {
		this.vx -= 0.5;

	}
	if (buttons.right) {
		this.vx += 0.5;

	}*/
	this.x = mouse.x - this.width / 2;
	
	//kierunek ruchu
	this.dir = this.vx - this.last_vx;
	
	//poprawa prędkości paletki
	if (!buttons.left && !buttons.right) this.vx = 0;
	if (!buttons.left && this.vx < 0) this.vx = 0;
	if (!buttons.right && this.vx > 0) this.vx = 0;
	
	//ruch paletki
	this.x += this.vx * this.speed * step;
	
	//kolizja paletki ze ścianami
	if (this.x < 0) {
		this.x = 0;
		this.vx = 0;
	}
	if (this.x + this.width > game.width) {
		this.x = game.width - this.width;
		this.vx = 0;
	}
	
}

Paddle.prototype.draw = function (ctx) {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	//ctx.strokeRect(this.x, this.y, this.width, this.height);
	ctx.restore();
}
