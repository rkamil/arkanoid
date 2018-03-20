function Level() {
	this.name = '';
	this.layout = [];
	this.blocks = [];
	this.block_width = 32;
	this.block_height = 24;
}

Level.prototype.prepare = function () {
	this.blocks = [];
	for (var i in this.layout) {
		if (this.layout[i]) {
			var block_y = Math.floor(i / 20);
			var block_x = (i - (block_y * 20));
			
			block_x *= this.block_width;
			block_y *= this.block_height;
			
			var new_block = new Block();
			new_block.x = block_x;
			new_block.y = block_y;
			new_block.width = this.block_width;
			new_block.height = this.block_height;
			new_block.hitPoints = this.layout[i];
			
			this.blocks.push(new_block);
		}
		
	}
}

Level.prototype.reset_level = Level.prototype.prepare;

Level.prototype.update = function (step) {
	
}

Level.prototype.draw = function (ctx) {
	
	
}
