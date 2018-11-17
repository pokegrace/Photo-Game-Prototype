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
		game.load.spritesheet('char', 'rpg_sprite_walk.png', 24, 32, 36);


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


        // loading placeholder audio
        game.load.path = './assets/sounds/placeholders/'
        game.load.audio('scoringPage', ['scoringPage.mp3','scoringPage.ogg']);

        // final audio
        game.load.path = './assets/sounds/SFX/'
        game.load.audio('step', ['Footsteps.mp3','Footsteps.ogg']);
        game.load.audio('shutterNoise', ['CameraClick.mp3','CameraClick.ogg']);
        game.load.audio('catDetects', ['Meow2.mp3','Meow2.ogg']);
        game.load.audio('catTakesTurn', ['Meow1.mp3','Meow1.ogg']);
        game.load.audio('menuSwitch', ['UISwitch.mp3','UISwitch.ogg']);
        game.load.audio('menuClick', ['UIClick.mp3','UIClick.ogg']);
        game.load.audio('gameStart', ['UIClick.mp3','UIClick.ogg']);

        // music
        game.load.path = './assets/sounds/Music/'
        game.load.audio('Instagram', ['InstagramMusic.mp3','InstagramMusic.ogg']);
        game.load.audio('Battle', ['BattleMusic.mp3','BattleMusic.ogg']);
        game.load.audio('Overworld', ['OverworldMusic.mp3','OverworldMusic.ogg']);


        game.music = [];

        game.load.path = './assets/UI/';
        game.load.atlas('battleUI', 'battleUI.png', 'battleUI.json');
},
	create: function()
	{
        game.music.push(game.add.audio('Instagram'));
        game.music.push(game.add.audio('Overworld'));
        game.music.push(game.add.audio('Battle'));
	},
    update: function(){
		game.music[0].loop = true
		game.music[1].loop = true
		game.music[2].loop = true
        if(
            ! game.music[0].isDecoding &&
            ! game.music[1].isDecoding &&
            ! game.music[2].isDecoding
        )
		{
            game.music[0].volume = 0.2
		    game.music[1].volume = 0.2
		    game.music[2].volume = 0.2
            game.state.start('play');
        }
    }
};
