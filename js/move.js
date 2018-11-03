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

		photographer = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		photographer.anchor.setTo(0.5);
		// set cat size to 25%
		photographer.scale.setTo(0.25);
        game.physics.enable(photographer, Phaser.Physics.ARCADE);

    },
	update: function() 
	{
        // check if the player is sneaking
        var control = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        var crawling = control.isDown;
        var accelleration = (crawling) ? 5 : 10;
        var topSpeed = (crawling) ? 40 : 80;


        // vertical movement
        var arrows = game.input.keyboard.createCursorKeys();
        if (arrows.up.isDown && arrows.down.isUp)
            {
                photographer.body.velocity.y-=accelleration;
            }
        else if (arrows.down.isDown && arrows.up.isUp)
            {
                photographer.body.velocity.y+=accelleration;
            }
        else
            {
                if (photographer.body.velocity.y > 0)
                    photographer.body.velocity.y = Math.floor(photographer.body.velocity.y/2);
                if (photographer.body.velocity.y < 0)
                    photographer.body.velocity.y = Math.ceil(photographer.body.velocity.y/2);
            }

        // horizontal movement
        if (arrows.right.isDown && arrows.left.isUp)
            {
                photographer.body.velocity.x+=accelleration;
            }
        else if (arrows.left.isDown && arrows.right.isUp)
            {
                photographer.body.velocity.x-=accelleration;
            }
        else
            {
                if (photographer.body.velocity.x > 0)
                    photographer.body.velocity.x = Math.floor(photographer.body.velocity.x/2);
                if (photographer.body.velocity.x < 0)
                    photographer.body.velocity.x = Math.ceil(photographer.body.velocity.x/2);
            }
	    photographer.body.velocity.clampX(-topSpeed, topSpeed);
	    photographer.body.velocity.clampY(-topSpeed, topSpeed);

    },
};
