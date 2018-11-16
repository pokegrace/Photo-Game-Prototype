var moveTutorial = function(game) 
{
	// Global state variables

    game.catDistance = 100;
    game.playerIsSneaking = false;
}


moveTutorial.prototype = {
	preload: function() 
	{
        game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() 
	{
        
        // draw the map
        map = game.add.tilemap('tile_maps')
        map.addTilesetImage('CatographerObstacles', 'obstacles');
        map.addTilesetImage('CatographerTiles', 'tiles');
        backgroundLayer = map.createLayer(0)

        obstacleLayer = map.createLayer(1)
        map.setCollisionByExclusion([], true, 1, true);
        obstacleLayer.resizeWorld();

        // player character
		player = new Player(20, 20, false);


        topLayer = map.createLayer(2)
        game.camera.follow(player);
        //game.camera.setSize(100,100);

        // target cat
        cat = new OverWorldCat(800, 50);

        this.textBox = game.add.sprite(game.width/2, game.height/2, "battleUI", "battletextbox");
        this.textBox.anchor.setTo(0.5);
        this.textBox.scale.x = 1.9; this.textBox.scale.y = 3.1;
		this.style = { font: "20px Arial", fill: "#000000", align: "center" };
		title = game.add.text(game.width / 2, game.height/2, "Hello and welcome to Catographer!\nHere you’ll sneak up on cats to get the best shot.\nIf you land in the cat’s line of sight, it’ll start the photo battle.\nYou may use the objects you see to hide behind so the cat doesn’t spot you.\nTry to get as close to the cat as possible without the cat running away.\nUse the arrow keys to move and hit shift to move silently towards the cat.\nCollect treats on the map to help later on in the photo battle.", this.style)
        title.anchor.setTo(0.5);
 

    },
	update: function() 
	{
    
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    if(enterKey.justPressed())
		{
            game.state.start('move');
            game.sound.play('gameStart');
	    }
    
    }
}
