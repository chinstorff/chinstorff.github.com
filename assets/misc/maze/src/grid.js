Grid = function (columns, rows) {
    this.possible = {
	alive: 'alive',
	dead:  'dead',
    },
    this.columns = columns || 8;
    this.rows    = rows    || 8;

    // create empty grid
    this.grid = [];
    for (var i = 0; i < this.columns; i++) {
	this.grid[i] = [];
	for (var j = 0; j < this.rows; j++) {
	    this.grid[i][j] = '';
	}
    };
};

Grid.prototype = {
    contentsOf: function (x, y) {
	return this.grid[x][y];
    },

    emptyNeighborsOf: function (x, y) {
	var neighbors = [];
	var emptyNeighbors = [];
	
	neighbors.push([x, y + 1]);
	neighbors.push([x, y - 1]);
	neighbors.push([x + 1, y]);
	neighbors.push([x - 1, y]);

	var nx, ny;
	for (var i = 0; i < neighbors.length; i++) {
	    nx = neighbors[i][0];
	    ny = neighbors[i][1];

	    if (!(nx < 0 || nx >= this.rows || ny < 0 || ny >= this.rows)) {
		if (!this.contentsOf(nx, ny)) {
		    emptyNeighbors.push(neighbors[i]);
		}
	    }
	}
	
	return emptyNeighbors;
    },

    randomEmptyNeighborOf: function (x, y) {
	var emptyNeighbors = this.emptyNeighborsOf(x, y);

	if (emptyNeighbors.length) {
	    var index = Math.floor(Math.random() * emptyNeighbors.length)
	    return emptyNeighbors[index];
	}

	return false;
    },
    
    addPiece: function (x, y, piece, force) {
	force = force || false;

	if (force) {
	    this.addPossible(piece);
	    this.grid[x][y] = piece;

	    return this;
	}

	if (this.possible[piece] && !this.contentsOf(x, y)) {
	    this.grid[x][y] = piece;

	    return this;
	}

	return false;
    },

    removePiece: function (x, y) {
	this.grid[x][y] = '';
	return this;
    },

    movePiece: function (oldX, oldY, newX, newY, force) {
	var piece = this.contentsOf(oldX, oldY);
	if (piece) {
	    if (this.addPiece(newX, newY, piece, force)) {
		this.removePiece(oldX, oldY);
	    }
	}
	return this;
    },

    clear: function () {
	for (var i = 0; i < this.columns; i++) {
	    this.grid[i] = [];
	    for (var j = 0; j < this.rows; j++) {
		this.grid[i][j] = '';
	    }
	}
	return this;
    },

    addPossible: function (value) {
	this.possible[value] = value;
	return this;
    },

    toString: function (div) {
	var ret = '';
	div = div || ', ';

	for (var j = 0; j < this.rows; j++) {
	    for (var i = 0; i < this.columns; i++) {		
		ret += this.contentsOf(i, j) + div;
	    }
	    ret += '\n';
	}

	return ret;
    },
};

Grid.prototype.constructor = Grid;
