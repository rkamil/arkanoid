function Ball() {}

Ball.prototype = new Rect(0, 0, 8, 8);

Ball.prototype.vx = 0;
Ball.prototype.vy = 0;

Ball.prototype.speed = 460;
Ball.prototype.minSpeed = 100;
Ball.prototype.maxSpeed = 460;

Ball.prototype.color = '#ecf0f1';

//aktualizacja piłki
Ball.prototype.update = function (step) {
	
	//korekcja szybkości piłki
	if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
	if (this.speed < this.minSpeed) this.speed = this.minSpeed;
	
	//ruch piłki poziomy
	this.x += this.vx * this.speed * step;
	
	//kolizja piłki pozioma
	for (var i in current_level.blocks) {
		var block = current_level.blocks[i];
		
		if (this.rectCollision(block)) {
			if (this.vx > 0) {
				this.x = block.x - this.width - 0.1;
				this.vx *= -1;
			}
			else if (this.vx < 0) {
				this.x = block.x + block.width + 0.1;
				this.vx *= -1;
			}
				
			ball.speed += gameplay.bounce_speedup;
			block.hitPoints -= 1;
			if (block.hitPoints == 0) current_level.blocks.splice(i, 1);
		}
	}
	
	//grawitacja
	this.vy += gameplay.gravity * step;
	
	//ruch piłki pionowy
	this.y += this.vy * this.speed * step;
	
	
	//kolizja piłki pionowa
	for (var i in current_level.blocks) {
		var block = current_level.blocks[i];
		
		if (this.rectCollision(block)) {
			if (this.vy > 0) {
				this.y = block.y - this.height - 0.1;
				this.vy *= -1;
			}
			else if (this.vy < 0) {
				this.y = block.y + block.height + 0.1;
				this.vy *= -1;
			}
							
			ball.speed += gameplay.bounce_speedup;
			block.hitPoints -= 1;
			if (block.hitPoints <= 0) current_level.blocks.splice(i, 1);
		}
	}
	
	//kolizja lewo-prawo ze ścianą
	if (this.x + this.width >= game.width || this.x <= 0) {
		
		if (this.vx > 0) this.x = game.width - this.width - 0.1;
		if (this.vx < 0) this.x = 0 + 0.1;
		
		this.vx *= -1;
		this.speed += gameplay.bounce_speedup;
	}
	
	//kolizja góra ze ścianą
	if (this.y <= 0) {
		this.vy *= -1;
		this.speed += gameplay.bounce_speedup;
	}
	
}

//rysowanie piłki
Ball.prototype.draw = function (ctx) {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	//ctx.strokeRect(this.x, this.y, this.width, this.height);
	ctx.restore();
}
