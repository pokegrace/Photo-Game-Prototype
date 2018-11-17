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


        phone = game.add.sprite(game.world.width/2 + 200, game.height/2, 'phone', null);
        phone.enableBody = true;
        phone.anchor.set(0.5)
        game.physics.enable(phone, Phaser.Physics.ARCADE);
        phone.body.velocity.x = -300;
        var catDistanceScore = 100* (game.startDistance - game.photoDistance)/game.startDistance;
        var photoQuality =( catDistanceScore + game.catMood )/2;

        this.numberOfLikes = Math.ceil(Math.log(photoQuality)
                                                *Math.pow(photoQuality*0.1, Math.min(photoQuality*0.1, 5.5)))

        console.log(this.numberOfLikes);
        this.likeStyle = {font: "20px Comic Sans MS", fill: 'red', align: 'left', wordWrapWidth: 300, wordWrap: true};
        this.likeText = game.add.text(phone.x-50 , 535, "", this.likeStyle);
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
                this.comment = game.add.text(phone.x+10, phone.y+185, generateComment(), style);
                this.comment.anchor.set(0.5)
                //add PHOTO here;
                console.log(this.catDistanceKey, this.catMoodKey, "Before drawing")
                var key = this.catDistanceKey +  this.catMoodKey +
                    Math.ceil(Math.random()*this.pictureNumbers[this.catDistanceKey + this.catMoodKey])
                if (this.photo == null)
                this.photo = game.add.sprite(phone.x+15, phone.y-35, key);
                this.photo.scale.x = 0.5;
                this.photo.scale.y = 0.5;
                this.photo.anchor.set(0.5);

                this.likeText.x = phone.x-110;
                this.likeText.y = phone.y+120;
                var numberOfLikes = this.numberOfLikes
                var likeText = this.likeText;
                var displayedLikes = this.displayedLikes;
                cal = setInterval(function()
                {
                 
                 if (displayedLikes < numberOfLikes)
                    {
                        displayedLikes++;
                        if (displayedLikes < numberOfLikes-100)
                            displayedLikes += 10;
                        if (displayedLikes < numberOfLikes-1000)
                            displayedLikes += 100;
                        if (displayedLikes < numberOfLikes-10000)
                            displayedLikes += 1000;
                        if (displayedLikes < numberOfLikes-100000)
                            displayedLikes += 10000;

                        console.log(displayedLikes, numberOfLikes)
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

