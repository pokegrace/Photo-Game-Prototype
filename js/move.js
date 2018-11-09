var move = function(game) 
{
	// Global state variables

    game.catDistance = 100;
    game.playerIsSneaking = false;
}


move.prototype = {
	preload: function() 
	{
        game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() 
	{
		// create
        // wall group
        overWorldWalls = game.add.group();
        overWorldWalls.enableBody = true;
        game.physics.enable(overWorldWalls, Phaser.Physics.ARCADE);

        var wall = game.add.sprite(game.world.width/2 + 50, game.world.height/2, 'obstacle', null, overWorldWalls);
        wall.scale.x = 0.2;
        wall.scale.y = 0.2;
        wall.body.immovable = true;

        var wall = game.add.sprite(game.world.width/2 + 120, game.world.height/2 + 40, 'obstacle', null, overWorldWalls);
        wall.scale.x = 0.2;
        wall.scale.y = 0.2;
        wall.body.immovable = true;

        var wall = game.add.sprite(game.world.width/2 + 160, game.world.height/2 + -80, 'obstacle', null, overWorldWalls);
        wall.scale.x = 0.2;
        wall.scale.y = 0.2;
        wall.body.immovable = true;

        // player character
		player = new Player();

        // target cat
        cat = new OverWorldCat();




    },
	update: function() 
	{
        game.catDistance = Math.floor(Phaser.Math.distance(player.x, player.y, cat.x, cat.y));
        console.log('distance: ' + game.catDistance);


        game.physics.arcade.collide(player, overWorldWalls, function(){console.log("bump wall")}, null, this);

        if (this.physics.arcade.collide(cat, player))
        {
            catIsCaught(cat, player);
        }


        if (Phaser.Math.distance(cat.x, cat.y, player.x, player.y) < 100 &&
            !player.crawling)
        {
            catFlees(cat, player);
        }
        if(player.x < 0 || player.x > game.width || player.y < 0 || player.y > game.height){
	   game.state.restart();
	}

    },
};

function catIsCaught (cat, player){
    console.log(cat, player);
    game.state.start('battle');
}

function catFlees (cat, player) {
     cat.body.velocity.x = 4 * player.body.velocity.x;
     cat.body.velocity.y = 4 * player.body.velocity.y;
}
