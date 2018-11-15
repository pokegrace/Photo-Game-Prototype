var move = function(game) 
{
	// Global state variables

    game.catDistance = 100;
    game.playerIsSneaking = false;
    catFlee = false;
    route = 1;

    points1 = {
	'x':[800,1190,1190,1050,1050,1150],
	'y':[100,200,350,450,650,680]
    };
    points2 = {
	'x':[1150,1160,1100,950],
	'y':[680,1000,1200,1200]
    };
    points3 = {
	'x':[950,850,550,550,670,670,630],
	'y':[1200,1200,900,700,650,500,470]
    };
    points4 = {
	'x':[630,550,550,700,800],
	'y':[470,450,200,150,100]
    };
    pi = 0;
    ix = 1;
    path1 = [];
    path2 = [];
    path3 = [];
    path4 = [];
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
            catFlee = true;
        }
	game.physics.arcade.collide(player, treat1, pickup, null, this);
	game.physics.arcade.collide(player, treat2, pickup, null, this);
	game.physics.arcade.collide(player, treat3, pickup, null, this);

	if( catFlee == true){
	 cat.coneRange = 0;
	 if(route == 1 && pi < path1.length){
	 cat.x = path1[pi].x;
	 cat.y = path1[pi].y;
	 cat.rotation = path1[pi].angle;
	 pi= pi+5;
	 if (pi >= path1.length)
            {
                catFlee = false;
		pi = 0;
		route++;
		cat.coneRange = 200;
            }
	 }
	 if(route == 2 && pi < path2.length){
	 cat.x = path2[pi].x;
	 cat.y = path2[pi].y;
	 cat.rotation = path2[pi].angle;
	 pi= pi+10;
	 if (pi >= path2.length)
            {
                catFlee = false;
		pi = 0;
		route++;
		cat.coneRange = 200;
            }
	 }
	 if(route == 3 && pi < path3.length){
	 cat.x = path3[pi].x;
	 cat.y = path3[pi].y;
	 cat.rotation = path3[pi].angle;
	 pi= pi+10;
	 if (pi >= path3.length)
            {
                catFlee = false;
		pi = 0;
		route++;
		cat.coneRange = 200;
            }
	 }
	 if(route == 4 && pi < path4.length){
	 cat.x = path4[pi].x;
	 cat.y = path4[pi].y;
	 cat.rotation = path4[pi].angle;
	 pi= pi+10;
	 if (pi >= path4.length)
            {
                catFlee = false;
		pi = 0;
		route++;
		cat.coneRange = 200;
            }
	 }
	 if(route > 4){route=1;}
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
        path1 = [];
	path2 = [];
	path3 = [];
	path4 = [];

	var t = 1/game.width;
	for(var i=0;i<1;i+=t){
	 var px1 = game.math.linearInterpolation(points1.x, i);
         var py1 = game.math.linearInterpolation(points1.y, i);
	 var node1 = { x: px1, y: py1, angle: 0 };
 	 path1.push(node1);
	 var px2 = game.math.linearInterpolation(points2.x, i);
         var py2 = game.math.linearInterpolation(points2.y, i);
	 var node2 = { x: px2, y: py2, angle: 0 };
 	 path2.push(node2);
	 var px3 = game.math.linearInterpolation(points3.x, i);
         var py3 = game.math.linearInterpolation(points3.y, i);
	 var node3 = { x: px3, y: py3, angle: 0 };
 	 path3.push(node3);
	 var px4 = game.math.linearInterpolation(points4.x, i);
         var py4 = game.math.linearInterpolation(points4.y, i);
	 var node4 = { x: px4, y: py4, angle: 0 };
 	 path4.push(node4);
	 ix++;
	}

}