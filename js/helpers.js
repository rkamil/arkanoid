//helper do dziedziczenia
function extend(obj, properties) {
	
}

//kolizja prostokąt-prostokąt
function rectCollision(rect_a, rect_b) {
	
	if (rect_a.x <= rect_b.x + rect_b.width &&
	   rect_a.x + rect_a.width >= rect_b.x &&
	   rect_a.y <= rect_b.y + rect_b.height &&
	   rect_a.height + rect_a.y >= rect_b.y) {
		return true;
	}
	
	return false;
	
}
/*
function rectCollision(object1, object2) {
	if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
			return true;
	}
	return false;
}*/

/*
function rectCollision(a, b) {
	return (Math.abs(a.x - b.x) < (a.width + b.width) / 2) &&
     (Math.abs(a.y - b.y) < (a.height + b.height) / 2);
}*/

//klasa do obsługi prostokątów
function Rect(x, y, width, height) {
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
}

Rect.prototype.getLeft = function () {
	return this.x;
}

Rect.prototype.getTop = function () {
	return this.y;
}

Rect.prototype.getRight = function () {
	return this.x + this.width;
}

Rect.prototype.getBottom = function () {
	return this.y + this.height;
}

Rect.prototype.rectCollision = function (rect) {
	return rectCollision(this, rect);
}

//funkcja do wczytywania leveli
function loadLevel(data) {
	game.levels.push(data);
	
	return data;
}
