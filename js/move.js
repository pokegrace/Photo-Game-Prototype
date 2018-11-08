var move = function(game) 
{
	// Global state variables

    game.catDistance = 100;
    game.playerIsSneaking = false;

    bmd = null;
    points = {
	'x':[800,800,500,500,800],
	'y':[200,500,500,200,200]
    };
    pi = 0;
    ix = 1;
    path = [];
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

	bmd = this.add.bitmapData(this.game.width, this.game.height);
        bmd.addToWorld();

	plot();
	
    },

	
	update: function() 
	{
        game.catDistance = Math.floor(Phaser.Math.distance(player.x, player.y, cat.x, cat.y));


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
	
	if (Phaser.Math.distance(cat.x, cat.y, player.x, player.y) < 150 &&
            !player.crawling)
        {
            if(cat.rotation != game.physics.arcade.angleBetween(cat, player)){
	      cat.rotation = cat.rotation + 0.01;
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

function catFlees (cat, player) {
     cat.body.velocity.x = 4 * player.body.velocity.x;
     cat.body.velocity.y = 4 * player.body.velocity.y;
}

function plot(){
	bmd.clear();
        path = [];

	var t = 1/game.width;
	for(var i=0;i<1;i+=t){
	 var px = game.math.linearInterpolation(points.x, i);
         var py = game.math.linearInterpolation(points.y, i);
	 var node = { x: px, y: py, angle: 0 };
	 if (ix > 0)
	 {
    	  //node.angle = game.math.angleBetweenPoints(path[ix - 1], node);
	 }
 	 path.push(node);
	 ix++;
	}
	
	

	bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
	for (var p = 0; p < points.x.length; p++)
        {
          bmd.rect(this.points.x[p]-3, points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
        }

}