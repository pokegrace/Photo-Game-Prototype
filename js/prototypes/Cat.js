function Cat(rmood){
    Phaser.Sprite.call( this, game, game.width / 2, game.height / 2, 'cat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.25);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.mood = rmood;
    this.approachSuccessRate; 
    this.treatSuccessRate;
    
    game.add.existing(this);
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function(){

	// calculating approach success rate
	this.approachSuccessRate = Math.log(this.mood) * 20 + 8;

	// calculating treat success rate
	if(this.mood >= 75 && this.mood <= 100)
		this.treatSuccessRate = 95;
	if(this.mood >= 50 && this.mood < 75)
		this.treatSuccessRate = 85;
	if(this.mood >= 25 && this.mood < 50)
		this.treatSuccessRate = 70;
	if(this.mood >= 1 && this.mood < 25)
		this.treatSuccessRate = 65;
}