var move = function(game) 
{
	// Global state variables
}


move.prototype = {
	preload: function() 
	{
        game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() 
	{
		// create

        // player character
		player = new Player();

        // target cat
        cat = new Cat();

    },
	update: function() 
	{


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
