Chord = function () {
    var chord = {
	root: "C",
	isMajor: true,
	tone: 0,

	allChords: {},
	notes: function () {
	    return [
		chord.rootName(),
		chord.clone().addInterval(3).addTones(+chord.isMajor + 3).reduce().rootName(),
		chord.clone().addInterval(5).addTones(7).reduce().rootName(),
	    ];
	},
	noteDiff: function (other) {
	    n = chord.notes();
	    o = other.notes();

	    ret = {};
	    for (var i = 0; i < 3; i++) {
		if (n[i] != o[0] && n[i] != o[1] && n[i] != o[2]) ret["old"] = n[i];
		if (o[i] != n[0] && o[i] != n[1] && o[i] != n[2]) ret["new"] = o[i];
	    }
	    return ret;
	},
	accidentals: function () {
	    chord.reduce();
	    if (chord.root === "B" && chord.tone === 0) return "#";
	    
	    var count = (chord.tone - chord.tones[chord.root]) % 12;

	    var c = "#";
//	    if (count < 0) {c = "b"}

	    var s = "";
	    for (var i = 0; i < Math.abs(count); i++) {s += c};
            return s;
	},
	rootName: function () {
	    return chord.root + chord.accidentals();
	},
	toString: function () {
	    var mode = chord.isMajor ? "" : "m";
	    return chord.rootName() + mode;
	},
	tones: {
	    "C":  0,
	    "D":  2,
	    "E":  4,
	    "F":  5,
	    "G":  7,
	    "A":  9,
	    "B": 11,
	},
	roots: {
	    0:  "C",
	    1:  "C",
	    2:  "D",
	    3:  "D",
	    4:  "E",
	    5:  "F",
	    6:  "F",
	    7:  "G",
	    8:  "G",
	    9:  "A",
	    10: "A",
	    11: "B",
	},
	flipMode: function () {
	    chord.isMajor = !chord.isMajor;
	    return chord;
	},
	addInterval: function (interval) {
	    interval = interval > 0 ? interval - 1 : interval + 1;
	    var aNum = "A".charCodeAt(0);
	    var nNum = chord.root.charCodeAt(0);
	    var newNum = (nNum - aNum + interval) % 7;
	    newNum = (newNum + 7) % 7;
	    newNum = newNum + aNum;
	    chord.root = String.fromCharCode(newNum);
	    return chord;
	},
	addTones: function (count) {
	    chord.tone = (chord.tone + count) % 12;
	    if (chord.tone - chord.tones[chord.root] > 6) {
		chord.tone = (chord.tone - 144) % 12;
	    } else if (chord.tones[chord.root] - chord.tone > 6) {
		chord.tone = (chord.tone + 144) % 12;
	    }
	    return chord;
	},
	
	reduce: function () {
	    chord.tone = chord.tone % 12;
	    chord.root = chord.roots[chord.tone];	   
	    return chord;
	},

	getOrCreate: function (newChord) {
	    newChord = newChord.reduce();
	    if (chord.allChords[newChord.toString()] === undefined) {
		chord.allChords[newChord.toString()] = newChord;
		newChord.allChords = chord.allChords;
	    }
	    return chord.allChords[newChord.toString()];
	},
	
	p: function () {
	    return chord.getOrCreate(chord.newp());
	},
	l: function () {
	    return chord.getOrCreate(chord.newl());
	},
	r: function () {
	    return chord.getOrCreate(chord.newr());
	},
	
	newp: function () {
	    return chord.clone().flipMode();
	},
	newl: function () {
	    if (chord.isMajor) {
		return chord.clone().addInterval( 3).addTones( 4).flipMode();
	    } else {
		return chord.clone().addInterval(-3).addTones(-4).flipMode();
	    }
	},
	newr: function () {
	    if (chord.isMajor) {
		return chord.clone().addInterval(-3).addTones(-3).flipMode();
	    } else {
		return chord.clone().addInterval( 3).addTones( 3).flipMode();
	    }
	},

	clone: function () {
	    var c = Chord();
	    c.root    = chord.root;
	    c.tone    = chord.tone;
	    c.isMajor = chord.isMajor;
	    return c;
	},
    }
    chord.allChords[chord.toString()] = chord;
    return chord;
}
