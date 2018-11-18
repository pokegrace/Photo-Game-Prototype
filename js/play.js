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

        this.likes = 0;
        this.likeStyle = {font: "40px Comic Sans MS", fill: 'red', align: 'left', wordWrapWidth: 300, wordWrap: true};
        this.likeText = game.add.text(75 , 560, "0", this.likeStyle);

        game.music[0].play()
        game.music[1].stop()
        game.music[2].stop()
},
	update: function() 
	{
        if (Math.random() > 0.9 - 0.001 * this.likes)
        {
            this.likes++;
        }
            console.log(this.likes)
        this.likeText.setText(Math.floor(this.likes));

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
