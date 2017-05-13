Game.Play = function (game) { };

var play = { };

Game.Play.prototype = {
    create: function () {
	play.polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
	play.notes = ["C2", "C4", "D#4", "G4"];
	play.loop = new Tone.Loop(function(time){
	    play.polySynth.triggerAttackRelease(play.notes, "8n", time);
	}, "4n");
	play.loop.start("0m");

	game.input.onDown.add(Game.Play.prototype.startPlay);
	
	play.c = Chord().p();

	play.graphics = game.add.graphics(0, 0);
	play.text = [];

	play.drawCount = 1;
	
	var urinscr  = 30;
	var uside    = urinscr / 0.28867513459481;
	var urcircum = urinscr * 2;
	var urcircle = 30;
	play.triangleDim = [
	    {
		rinscr:  urinscr,
		side:    uside,
		rcircum: urcircum,
		rcircle: urcircle,
	    },
	    {
		rinscr:  -1 * urinscr,
		side:    -1 * uside,
		rcircum: -1 * urcircum,
		rcircle: urcircle,
	    }
	];

	play.cursors = game.input.keyboard.createCursorKeys();
	play.cursors.left.onDown.add(this.moveLeft);
	play.cursors.right.onDown.add(this.moveRight);
	play.cursors.up.onDown.add(this.moveUp);
	play.cursors.down.onDown.add(this.moveDown);
	play.keys = {};
	play.keys.p = game.input.keyboard.addKey(Phaser.Keyboard.P);
	play.keys.r = game.input.keyboard.addKey(Phaser.Keyboard.R);
	play.keys.l = game.input.keyboard.addKey(Phaser.Keyboard.L);
	play.keys.p.onDown.add(this.moveParallel);
	play.keys.r.onDown.add(this.moveRelative);
	play.keys.l.onDown.add(this.moveLeading);
	
	this.addTitle(30, 25);
	this.addInstructions(Game.w - 170, Game.h - 70);
	
	this.draw();
    },

    startPlay: function () {
	Tone.Transport.start();
    },
    
    addTitle: function (x, y) {
	game.add.text(x+4,  y+5,  "Interactive", {font:"24px Arial", fill: "#FFFFFF"});
	game.add.text(x+28, y+25, "Tonnetz",     {font:"36px Arial", fill: "#FFFFFF"});
	var textGraphics = game.add.graphics(0, 0);
	textGraphics.lineStyle(2, 0xFFFFFF, 0.8);
	textGraphics.drawPolygon(x+0,   y+0, x+0,   y+67);
	textGraphics.drawPolygon(x+159, y+0, x+159, y+67);
    },

    addInstructions: function (x, y) {
	game.add.text(x+4,  y+5,  "Move with P, R, L", {font:"16px Arial", fill: "#FFFFFF"});
	game.add.text(x+32, y+25, "or arrow keys",     {font:"16px Arial", fill: "#FFFFFF"});
    },
    
    draw: function () {
	play.graphics.clear();
	play.text.forEach(function (x) { x.destroy(); });
	play.text = [];
	play.chordDrawCount = 0;
	play.drawCount++;

	var x = 300;
	var y = 195;
	
	play.graphics.lineStyle(2, 0xFFFFFF, 0.8);
	play.graphics.beginFill(0x666666);

	this.drawChords(x, y, play.c.allChords["Cm"], 0);
    },
    
    drawChords: function (x, y, chord, depth) {
	var dim = play.triangleDim[+chord.isMajor];
	var maxDepth = 6;

	if (depth <= maxDepth) {
	    if (chord.drawCount != play.drawCount) {
		chord.drawCount = play.drawCount;
		chord.x = x;
		chord.y = y;
		this.drawChord(chord);
	    }
	    
	    if (chord.p()) {
		this.drawChords(x, y + dim.rcircum, chord.p(), depth + 1);
	    }
	    if (chord.l()) {
		this.drawChords(x - dim.side / 2, y - dim.rinscr, chord.l(), depth + 1);
	    }
	    if (chord.r()) {
		this.drawChords(x + dim.side / 2, y - dim.rinscr, chord.r(), depth + 1);
	    }
	}
    },

    drawChord: function (chord) {
	if (play.chordDrawCount > 48) {return this.draw()};
	
	var x = chord.x;
	var y = chord.y;
	
	var dim = play.triangleDim[+chord.isMajor];

	if (chord.toString() === play.c.toString()) {
	    play.graphics.beginFill(0xFFFFFF);
	}
	
	var a = new Phaser.Point(x,                y - dim.rcircum);
	var b = new Phaser.Point(x - dim.side / 2, y + dim.rinscr);
	var c = new Phaser.Point(x + dim.side / 2, y + dim.rinscr);
	play.graphics.drawTriangle([a,b,c,a]);

	play.graphics.beginFill(0x666666);
	play.graphics.drawCircle(a.x, a.y, dim.rcircle);
	play.graphics.drawCircle(b.x, b.y, dim.rcircle);
	play.graphics.drawCircle(c.x, c.y, dim.rcircle);

	var style = {
	    font: "14px Arial",
	    fill: "#FFFFFF",
	    align: "center",
	};

	var n = chord.notes();
	var na = n[1];
	var nb = +chord.isMajor ? n[2] : n[0];
	var nc = +chord.isMajor ? n[0] : n[2];

	var ta = game.add.text(a.x, a.y, na, style);
	var tb = game.add.text(b.x, b.y, nb, style);
	var tc = game.add.text(c.x, c.y, nc, style);
	ta.anchor.set(0.5, 0.4);
	tb.anchor.set(0.5, 0.4);
	tc.anchor.set(0.5, 0.4);
	play.text.push(ta, tb, tc);
	play.chordDrawCount += 1;
    },

    update: function () {

    },

    moveParallel: function () {
	play.c = play.c.p();
	Game.Play.prototype.drawChord(play.c.p());
	Game.Play.prototype.drawChord(play.c);

	var n = play.c.notes();
	var diff = play.c.p().noteDiff(play.c);
	for (var i = 1; i < 4; i++) {
	    play.notes[i] = play.notes[i].replace(diff.old, diff.new);
	}
    },

    moveRelative: function () {
	play.c = play.c.r();
	Game.Play.prototype.drawChord(play.c.r());
	Game.Play.prototype.drawChord(play.c);

	var diff = play.c.r().noteDiff(play.c);
	play.notes[0] = play.c.rootName() + "2";
	for (var i = 1; i < 4; i++) {
	    play.notes[i] = play.notes[i].replace(diff.old, diff.new);
	}
    },

    moveLeading: function () {
	play.c = play.c.l();
	Game.Play.prototype.drawChord(play.c.l());
	Game.Play.prototype.drawChord(play.c);

	var diff = play.c.l().noteDiff(play.c);
	play.notes[0] = play.c.rootName() + "2";
	for (var i = 1; i < 4; i++) {
	    play.notes[i] = play.notes[i].replace(diff.old, diff.new);
	}
    },
    
    moveLeft: function () {
	if (play.c.isMajor) {
	    Game.Play.prototype.moveRelative();
	} else {
	    Game.Play.prototype.moveLeading();
	}
    },
    moveRight: function () {
	if (play.c.isMajor) {
	    Game.Play.prototype.moveLeading();
	} else {
	    Game.Play.prototype.moveRelative();
	}
    },
    moveUp: function () {
	if (play.c.isMajor) {
	    Game.Play.prototype.moveParallel();
	}
    },
    moveDown: function () {
	if (!play.c.isMajor) {
	    Game.Play.prototype.moveParallel();
	}
    },
};
