// global variables

// State management
window.onload = function() 
{
	game = new Phaser.Game(1000, 630, Phaser.AUTO, 'game');
	// add states
	game.state.add('Load', Load);
	game.state.add('play', play);
	game.state.add('battle', battle);
	game.state.add('move', move);
	game.state.start('Load');
}

var Load = function(game) {};
Load.prototype = {
	preload: function()
	{
		// loading assets
		game.load.path = './assets/placeholders/';
		game.load.image('cat', 'cat.png');
	},
	create: function()
	{
		game.state.start('play');
	},
};
