Game = {};

A = {
    w: 601,
    h: 601,
};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};
