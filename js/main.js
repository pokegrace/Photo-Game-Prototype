// global variables
var distance;

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
		game.load.image('arrow', 'arrow.png');
		game.load.image('obstacle', 'obstacle.png');

        game.load.path = './assets/sounds/placeholders/'
        game.load.audio('catAngry', ['catAngry.mp3','catAngry.ogg']);
        game.load.audio('catDetects', ['catDetects.mp3','catDetects.ogg']);
        game.load.audio('catHappy', ['catHappy.mp3','catHappy.ogg']);
        game.load.audio('gameStart', ['gameStart.mp3','gameStart.ogg']);
        game.load.audio('menuSwitch', ['menuSwitch.mp3','menuSwitch.ogg']);
        game.load.audio('scoringPage', ['scoringPage.mp3','scoringPage.ogg']);
        game.load.audio('shutterNoise', ['shutterNoise.mp3','shutterNoise.ogg']);
        game.load.audio('step', ['step.mp3','step.ogg']);
},
	create: function()
	{
		game.state.start('play');
	},
};
