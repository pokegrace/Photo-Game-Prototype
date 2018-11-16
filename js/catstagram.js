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


        phone = game.add.sprite(game.world.width/2 + 200, 100, 'phone', null);
        phone.enableBody = true;
        game.physics.enable(phone, Phaser.Physics.ARCADE);
        phone.body.velocity.x = -300;
        var catDistanceScore = 100* (game.startDistance - game.photoDistance)/game.startDistance;
        var photoQuality =( catDistanceScore + game.catMood )/2;

        this.numberOfLikes = Math.ceil(Math.log(photoQuality)*Math.pow(photoQuality*0.1, 5.5)/100)

        console.log(this.numberOfLikes);
        this.likeStyle = {font: "20px Comic Sans MS", fill: 'red', align: 'left', wordWrapWidth: 300, wordWrap: true};
        this.likeText = game.add.text(game.world.width/2 + 15 , 535, "", this.likeStyle);
        this.displayedLikes = 0;
        this.comment = null;
        this.photo = null;

        this.catMoodKey = 'A';
        this.catDistanceKey = 'F';
        console.log(game.catMood, game.catDistance)
        if (game.catMood > 33) this.catMoodKey = 'N';
        if (100-game.photoDistance > 33) this.catDistanceKey = 'M';
        if (game.catMood > 66) this.catMoodKey = 'H';
        if (100-game.photoDistance > 66) this.catDistanceKey = 'C';
                console.log(100-game.photoDistance)
        this.pictureNumbers = {
            'FA':2,
            'MA':4,
            'CA':3,
            'FN':2,
            'MN':4,
            'CN':5,
            'FH':2,
            'MH':3,
            'CH':4,
        }

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
                //add PHOTO here;
                console.log(this.catDistanceKey, this.catMoodKey, "Before drawing")
                var key = this.catDistanceKey +  this.catMoodKey +
                    Math.ceil(Math.random()*this.pictureNumbers[this.catDistanceKey + this.catMoodKey])
                if (this.photo == null)
                this.photo = game.add.sprite(640, 380, key);
                this.photo.scale.x = 0.5;
                this.photo.scale.y = 0.5;
                this.photo.anchor.x = 0.5;
                this.photo.anchor.y = 0.5;

                var numberOfLikes = this.numberOfLikes
                var likeText = this.likeText;
                var displayedLikes = this.displayedLikes;
                cal = setInterval(function()
                {
                 
                 if (displayedLikes < numberOfLikes)
                    {
                        displayedLikes++;
                        //console.log(displayedLikes)
                        likeText.setText(displayedLikes)
                    }
                    else
                    {
                        setTimeout(function()
                        {
                            game.state.start('play');
                        }, 10000);
                        window.clearInterval(cal);
                    }
                }, 10)

            }
    },
};

