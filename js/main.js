// global variables

// State management
window.onload = function() {
	game = new Phaser.Game(1000, 630, Phaser.AUTO, 'game');
	// add states
	// game.state.add('state', state);
	game.state.add('Load', Load);
	game.state.start('Load');
}

var Load = function(game) {};
Load.prototype = {
	preload: function()
	{
		// loading assets

	},
	create: function()
	{
		// game.state.start('play');
	},
};