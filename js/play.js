var play = function(game) 
{
	// Global state variables
}


play.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		style = { font: "55px Arial", fill: "#ffffff", align: "center" };
		title = game.add.text(game.width / 2, 50, 'Play!', style);
		title.anchor.setTo(0.5);
		
//		text = game.add.text(game.width / 4, 550, 'Press B to battle!', style);
//		text.anchor.setTo(0.5);

        text = game.add.text(game.width*3 / 4, 550, 'Press M to move!', style);
		text.anchor.setTo(0.5);

		cat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		cat.anchor.setTo(0.5);

		battleKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
		moveKey = game.input.keyboard.addKey(Phaser.Keyboard.M);


},
	update: function() 
	{
		if(battleKey.justPressed())
		{
            game.state.start('battle');
            game.sound.play('gameStart');
        }
        if(moveKey.justPressed())
		{
            game.state.start('move');
            game.sound.play('gameStart');
	    }
    },
};
