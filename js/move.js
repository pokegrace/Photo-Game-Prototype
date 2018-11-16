var move = function(game) 
{
	// Global state variables

    game.catDistance = 100;
    game.playerIsSneaking = false;
    catFlee = false;

    points = {
	'x':[800,1190,1190,1050,1050,1150,1160,1100,950,850,550,550,670,670,630,550,550,700,800],
	'y':[100,200,350,450,650,680,1000,1200,1200,1200,900,700,650,500,470,450,200,150,100]
    };

    pi = 0;
    ix = 1;
    path = [];
    timer = 0;
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
        map.addTilesetImage('CatographerObstacles', 'obstacles');
        map.addTilesetImage('CatographerTiles', 'tiles');
        backgroundLayer = map.createLayer(0)

        obstacleLayer = map.createLayer(1)
        map.setCollisionByExclusion([], true, 1, true);
        obstacleLayer.resizeWorld();

        // player character
		player = new Player(20, 20);


        topLayer = map.createLayer(2)


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
        cat = new OverWorldCat(800, 100);

	treat1 = new Treat(150, 450);
	treat2 = new Treat(450, 1200);
	treat3 = new Treat(1200, 50);

	plot();
    },
	update: function() 
	{
        game.catDistance = Math.floor(Phaser.Math.distance(player.x, player.y, cat.x, cat.y));
        console.log('distance: ' + game.catDistance);

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
            if(timer <= 0){
	     if(catFlee == true){ catFlee = false;}
	     else{catFlee = true;}
	     timer = 50;
 	    }
        }
	if(timer != 0){
		timer--;
	}
	game.physics.arcade.collide(player, treat1, pickup, null, this);
	game.physics.arcade.collide(player, treat2, pickup, null, this);
	game.physics.arcade.collide(player, treat3, pickup, null, this);

	cat.coneRange = 0;
	if( catFlee == true){
	 cat.x = path[pi].x;
	 cat.y = path[pi].y;
	 cat.rotation = path[pi].angle;
	 pi--;
	 if (pi < 0)
            {
		pi = path.length-1;
            }
	}else{
	 cat.x = path[pi].x;
	 cat.y = path[pi].y;
	 cat.rotation = path[pi].angle;
	 pi++;
	 if (pi >= path.length)
            {
		pi = 0;
            }
	}
	
    },
};

function catIsCaught (cat, player){
    console.log(cat, player);
    game.state.start('battle');
}

function reportCollision(x,y){console.log("",x,y)}

function pickup(player, treat){
   treat.kill();
}
function plot(){
	path = [];

	var t = 1/game.width;
	for(var i=0;i<1;i+=t){
	 var px = game.math.linearInterpolation(points.x, i);
         var py = game.math.linearInterpolation(points.y, i);
	 var node = { x: px, y: py, angle: 0 };
	 path.push(node);
	 ix++;
	}

}