Game.Menu = function (game) { };

A.num_cells_array = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 25, 30, 40, 50, 60, 75, 100, 120, 150, 200];
A.num_cells_index = 5;
A.num_cells = A.num_cells_array[A.num_cells_index];

Game.Menu.prototype = {
    create: function () {
	game.stage.backgroundColor = '#ccc';

	A.title = game.add.sprite(100, 200, 'title');
	
	A.keys.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	A.keys.left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	A.keys.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	A.keys.space.onDown.add(function () {
	    game.state.start('Play');
	}, this);
	A.keys.left.onDown.add(function () {
	    if (A.num_cells_index > 0) {
		A.num_cells = A.num_cells_array[--A.num_cells_index];
	    }
	    this.paint_grid()
	}, this);
	A.keys.right.onDown.add(function () {
	    if (A.num_cells_index < A.num_cells_array.length - 1) {
		A.num_cells = A.num_cells_array[++A.num_cells_index];
	    }
	    this.paint_grid()
	}, this);
	
	A.graphics = game.add.graphics(0, 0);
	this.paint_grid();
    },

    paint_grid: function () {
	var dist;

	if (A.graphics) {
	    A.graphics.destroy();
	    A.graphics = game.add.graphics(0, 0);
	}
	
	A.cell_width = (A.h - 1) / A.num_cells;
	
	for (var i = 0; i < A.num_cells + 1; i++) {
	    dist = Math.floor(i * A.cell_width);
	    
	    this.paint_line(0, dist, A.w, dist);
	    this.paint_line(dist, 0, dist, A.h);
	}

	A.title.bringToTop();
    },

    paint_line: function (x1, y1, x2, y2, color) {
	color = color || 0x000000;
	A.graphics.lineStyle(1, color, 1);

	A.graphics.moveTo(x1, y1);
	A.graphics.lineTo(x2, y2);
    },
};
