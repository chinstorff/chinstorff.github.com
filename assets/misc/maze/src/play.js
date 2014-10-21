Game.Play = function (game) { };

A.color = {
    alive: 0xFFCCCC,
    dead:  0xF5F5F5,
    head:  0x7A9999,
};

A.keys = {};

A.square = {};

Game.Play.prototype = {
    create: function () {
	game.stage.backgroundColor = '#ccc';

	A.num_cells  = A.num_cells || 10;
	A.cell_width = (A.h - 1) / A.num_cells;

	A.grid_painted = false;

	A.list = {
	    alive: [],
	    dead:  [],
	    
	    new_alive: [],
	    new_dead:  [],
	};

	A.farthest = {
	    distance: 0,
	    location: [-1, -1],
	};
	
	A.grid = new Grid(A.num_cells, A.num_cells);

	A.start = [Math.floor(Math.random() * A.num_cells), Math.floor(Math.random() * A.num_cells)]

	this.push_alive(A.start);
	
	A.keys.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	A.keys.space.onDown.add(function () {
	    game.state.start('Menu');
	}, this);

	A.step_count = 0;
	
	if (A.graphics) {
	    A.graphics.destroy();
	}

	this.lists_to_grid();
	this.paint();
	this.paint_cell_alive(A.start[0], A.start[1], A.color.head);
    },

    update: function () {
	if (A.list.alive.length) {
	    this.step();
	}

	if (A.step_count === 2 * A.num_cells * A.num_cells) {
	    this.paint_cell_alive(A.farthest.location[0], A.farthest.location[1], A.color.head);
	}
    },

    step: function () {
	var latest = A.list.alive[A.list.alive.length - 1];
	var neighbor;

	A.farthest.last_location = A.farthest.location;
	
	if (latest && A.step_count < 2 * A.num_cells * A.num_cells - 2) {
	    neighbor = A.grid.randomEmptyNeighborOf(latest[0], latest[1]);

	    if (neighbor) {
		this.push_alive(neighbor);
	    }
	    else if (A.list.alive.length) {
		this.push_dead(this.pop_alive());
	    }

	    if (A.list.alive.length > A.farthest.distance) {
		A.farthest.location = A.list.alive[A.list.alive.length - 1];
		A.farthest.distance = A.list.alive.length;		
	    }
	}

	if (A.farthest.last_location !== A.farthest.location && A.farthest.last_location[0] >= 0) {
	    this['paint_cell_' + A.grid.contentsOf(A.farthest.last_location[0], A.farthest.last_location[1])](A.farthest.last_location[0], A.farthest.last_location[1]);
	}
	this.paint_cell_alive(A.farthest.location[0], A.farthest.location[1], A.color.head);
	
	this.lists_to_grid();
	this.paint();
	
	A.step_count++;
    },

    lists_to_grid: function () {
	for (var i = 0; i < A.list.alive.length; i++) {
	    A.grid.addPiece(A.list.alive[i][0], A.list.alive[i][1], 'alive', true);
	}
	for (var i = 0; i < A.list.dead.length; i++) {
	    A.grid.addPiece(A.list.dead[i][0], A.list.dead[i][1], 'dead', true);
	}
    },

    push_alive: function (val) {
	A.list.alive.push(val);
	A.list.new_alive.push(val);
    },

    push_dead: function (val) {
	A.list.dead.push(val);
	A.list.new_dead.push(val);
    },

    pop_alive: function (val) {
	var ret = A.list.alive.pop(val);
	if (A.list.new_alive[A.list.new_alive.length - 1] === ret) {
	    A.list.new_alive.pop();
	}
	return ret;
    },
    
    paint: function () {
/*	if (A.graphics) {
	    A.graphics.destroy();
	}*/

	A.graphics = game.add.graphics(0, 0);

	if (!A.grid_painted) {
	    this.paint_grid();
	};

	this.paint_list('new_alive');
	this.paint_list('new_dead');
    },

    paint_grid: function () {
	var dist;
	for (var i = 0; i < A.num_cells + 1; i++) {
	    dist = Math.floor(i * A.cell_width);
	    
	    this.paint_line(0, dist, A.w, dist);
	    this.paint_line(dist, 0, dist, A.h);
	}
	A.grid_painted = true;
    },

    paint_line: function (x1, y1, x2, y2, color) {
	color = color || 0x000000;
	A.graphics.lineStyle(1, color, 1);

	A.graphics.moveTo(x1, y1);
	A.graphics.lineTo(x2, y2);
    },

    paint_list: function (name) {
	var cell, index, prior, x, y;
	for (var i = 0; i < A.list[name].length; i++) {
	    cell = A.list[name][i];

	    if (name === 'new_alive') {
		this.paint_cell_alive(cell[0], cell[1]);
	    }
	    else if (name === 'new_dead') {
		this.paint_cell_dead(cell[0], cell[1]);
	    }

	    index = this.indexOf_2d_array(A.list.alive, cell);
	    if (index && name === 'new_alive') {
		prior = A.list.alive[index-1];
		val_x = Math.floor(cell[0] * A.cell_width);
		val_y = Math.floor(cell[1] * A.cell_width);
		
		if (cell[0] - prior[0] === 1) {
		    this.paint_line(val_x, val_y + 1, val_x, val_y + A.cell_width - 1, A.color.dead);
		}
		if (cell[0] - prior[0] === -1) {
		    val_x += A.cell_width;
		    this.paint_line(val_x, val_y + 1, val_x, val_y + A.cell_width - 1, A.color.dead);
		}
		if (cell[1] - prior[1] === 1) {
		    this.paint_line(val_x + 1, val_y, val_x + A.cell_width - 1, val_y, A.color.dead);
		}
		if (cell[1] - prior[1] === -1) {
		    val_y += A.cell_width;
		    this.paint_line(val_x + 1, val_y, val_x + A.cell_width - 1, val_y, A.color.dead);
		}
	    }
	}
	A.list[name] = [];
    },

    paint_cell_alive: function (x, y, color) {
	var offset = Math.floor(A.cell_width / 5 * 1);
	color = color || A.color.alive;
	
	this.paint_cell_dead(x, y);
	this.paint_cell(x, y, color, offset);
    },
    
    paint_cell_dead: function (x, y) {
	this.paint_cell(x, y, A.color.dead);
    },
    
    paint_cell: function (x, y, color, offset) {
	offset = offset || 0;

	val_x = Math.floor(x * A.cell_width);
	val_y = Math.floor(y * A.cell_width);

	this.paint_rect(val_x + offset, val_y + offset, A.cell_width - 2 * offset, color);
    },
    
    paint_rect: function (x, y, width, color) {
	A.graphics.lineStyle(1, 0x000000, 0);
	A.graphics.beginFill(color, 1);
	A.graphics.drawRect(x+1, y+1, width-1, width-1);
    },

    indexOf_2d_array: function (arr_search, arr_value) {
	var matching, i, j;
	for (i = 0; i < arr_search.length; i++) {
	    matching = true;

	    for (j = 0; j < arr_value.length; j++) {
		if (arr_search[i][j] !== arr_value[j]) {
		    matching = false;
		}   
	    }

	    if (matching) {
		return i;
	    }
	}
    }
};
