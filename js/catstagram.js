var catstagram = function(game) 
{
	// Global state variables
}


catstagram.prototype = {
	preload: function() 
	{
        game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() 
	{

		 style = {font: "45px Comic Sans MS", fill: '#facade', align: 'center'};

		 catstagramTitleText = game.add.text(game.world.width/2, 25, 'Catstagram', style);
         catstagramTitleText.anchor.setTo(0.5);

        // create phone


        phone = 
        game.add.sprite(game.world.width/2 + 200, 100, 'phone', null);
        phone.enableBody = true;

        game.physics.enable(phone, Phaser.Physics.ARCADE);
        phone.body.velocity.x = -300;

        this.numberOfLikes = Math.floor(Math.random()*1000); // placeholder
        this.likeStyle = {font: "20px Comic Sans MS", fill: 'red', align: 'left', wordWrapWidth: 300, wordWrap: true};
        this.likeText = game.add.text(game.world.width/2 + 15 , 535, "", this.likeStyle);
        this.displayedLikes = 0;
        this.comment = null;
        // text (R to restartd)
    },
	update: function() 
	{
        //have phone drop into screen

        if (phone.x < game.world.width/2 - 50) {phone.body.velocity.x += 80}
        if (phone.body.velocity.x> 200) {
            phone.body.velocity.x = 0
            
		    style = {font: "20px Comic Sans MS", fill: '#000000', align: 'left', wordWrapWidth: 300, wordWrap: true};
            if (this.comment === null)
                this.comment = game.add.text(game.world.width/2 - 20, 570, generateComment(), style);
                var numberOfLikes = this.numberOfLikes
                var likeText = this.likeText;
                var displayedLikes = this.displayedLikes;
                cal = setInterval(function()
                {
                        console.log(displayedLikes)
                 
                 if (displayedLikes < numberOfLikes)
                    {
                        displayedLikes++;
                        console.log(displayedLikes)
                        likeText.setText(displayedLikes)
                    }
                    else
                    {
                        setTimeout(function()
                        {
                            game.state.start('move');
                        }, 10000);
                        window.clearInterval(cal);
                    }
                }, 10)

            }

        // have likes tick upward

        //write comment to phone
    },
};

