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
		title = game.add.image(0, 0, 'title');
		



		battleKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
		moveKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		tutorialKey = game.input.keyboard.addKey(Phaser.Keyboard.T);

        game.music[0].play()
        game.music[1].stop()
        game.music[2].stop()
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
            game.state.start('moveTutorial');
            game.sound.play('gameStart');
	    }
	    if(tutorialKey.justPressed())
	    {
	    	game.state.start('battleTutorial');
	    }
    },
};
