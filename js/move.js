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
        // draw the map
        map = game.add.tilemap('tile_maps')
        map.addTilesetImage('CatographerTiles', 'tiles');
        backgroundLayer = map.createLayer(0)

        // player character
		player = new Player(20, 20);

        map.addTilesetImage('CatographerObstacles', 'obstacles');


        obstacleLayer = map.createLayer(1)
        map.setCollisionByExclusion([], true, 1, true);
        obstacleLayer.resizeWorld();

        // create
        // wall group
        overWorldWalls = game.add.group();
        map.collision.Collisions.forEach(function(obstacle)
        {
            var o = game.add.sprite(obstacle.x, obstacle.y, 'cat')
            game.physics.enable(o, Phaser.Physics.ARCADE)
            o.body.width = obstacle.width;
            o.body.height = obstacle.height;
            o.body.immovable = true;
            o.alpha= 0;
            overWorldWalls.add(o);
        })

        game.camera.follow(player);
        //game.camera.setSize(100,100);

        // target cat
        cat = new OverWorldCat(800, 50);




    },
	update: function() 
	{
        game.catDistance = Math.floor(Phaser.Math.distance(player.x, player.y, cat.x, cat.y));

        // check player collision agains obstacle layer
        game.physics.arcade.collide(player, overWorldWalls, reportCollision, null, this);
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
function reportCollision(x,y){console.log("",x,y)}
