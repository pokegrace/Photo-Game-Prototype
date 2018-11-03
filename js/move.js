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
        cat = game.add.sprite(game.width / 3, game.height / 3, 'cat');
		cat.anchor.setTo(0.5);
		// set cat size to 10%
		cat.scale.setTo(0.1);
        game.physics.enable(cat, Phaser.Physics.ARCADE);
        //cat.body.onCollide.add(catIsCaught, this);

    },
	update: function() 
	{


        if (this.physics.arcade.collide(cat, player))
        {
        catIsCaught(cat, player);
        }
    },
};

function catIsCaught (cat, player){
    console.log(cat, player);
    game.state.start('battle');
}
