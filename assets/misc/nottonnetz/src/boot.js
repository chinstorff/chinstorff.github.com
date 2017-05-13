Game = {
    w: 600,
    h: 450,
};

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	game.load.image('loading-color', 'assets/img/loading-color.png');
    },

    create: function () {
	game.state.start('Load');
    }
};
