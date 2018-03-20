function Block() {}

Block.prototype = new Rect();

Block.prototype.hitPoints = 1;

Block.prototype.color = '#f39c12';

Block.prototype.draw = function (ctx) {
	ctx.save();
	if (this.hitPoints == 1) ctx.fillStyle = this.color;
	if (this.hitPoints == 2) ctx.fillStyle = 'orange';
	if (this.hitPoints == 3) ctx.fillStyle = 'red';
	ctx.fillRect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
	//ctx.strokeRect(this.x, this.y, this.width, this.height);
	ctx.restore();
}
