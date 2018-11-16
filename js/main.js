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
	game.state.add('moveTutorial', moveTutorial);
	game.state.add('move', move);
	game.state.add('catstagram', catstagram);
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
		game.load.image('phone', 'phone.png');


        //load cat photos
		game.load.path = './assets/catPhotos/';
        pictureNumbers = [
            ['FA',2],
            ['MA',4],
            ['CA',3],
            ['FN',2],
            ['MN',4],
            ['CN',5],
            ['FH',2],
            ['MH',3],
            ['CH',4]
        ]
        for (var i = 0; i < pictureNumbers.length; i++)
        {
            var catClass = pictureNumbers[i][0];
            for (var inClass = 1; inClass <= pictureNumbers[i][1]; inClass++)
            {
                game.load.image(catClass + inClass, catClass+inClass+'.jpg');
            }
        }


        // loading tile map

		game.load.path = './assets/';
        game.load.tilemap('tile_maps', 'CatographerMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'CatographerTiles.png');
        game.load.image('obstacles', 'CatographerObstacles.png');


        // loading audio
        game.load.path = './assets/sounds/placeholders/'
        game.load.audio('catAngry', ['catAngry.mp3','catAngry.ogg']);
        game.load.audio('catDetects', ['catDetects.mp3','catDetects.ogg']);
        game.load.audio('catHappy', ['catHappy.mp3','catHappy.ogg']);
        game.load.audio('gameStart', ['gameStart.mp3','gameStart.ogg']);
        game.load.audio('menuSwitch', ['menuSwitch.mp3','menuSwitch.ogg']);
        game.load.audio('scoringPage', ['scoringPage.mp3','scoringPage.ogg']);
        game.load.audio('shutterNoise', ['shutterNoise.mp3','shutterNoise.ogg']);
        game.load.audio('step', ['step.mp3','step.ogg']);

        game.load.path = './assets/UI/';
        game.load.atlas('battleUI', 'battleUI.png', 'battleUI.json');
},
	create: function()
	{
		game.state.start('play');
	},
};
