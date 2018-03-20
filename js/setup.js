//ustawienia gry
var game = {
	width: 640,
	height: 480,
	canvas: document.createElement('canvas'),
	background: '#2c3e50',
	levels: []
};

game.canvas.width = game.width;
game.canvas.height = game.height;

document.getElementById('akhadoid').appendChild(game.canvas);
