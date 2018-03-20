function Vec(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vec.prototype.length = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vec.prototype.normalize = function () {
	var length = this.length()
	this.x = this.x / length;
	this.y = this.y / length;
}

Vec.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
}

Vec.prototype.substract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
}

Vec.prototype.multiply = function (vec) {
	this.x *= vec.x;
	this.y *= vec.y;
}

