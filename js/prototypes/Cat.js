function Cat(rhappiness){
    Phaser.Sprite.call( this, game, game.width / 2, game.height / 2, 'cat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.25);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.happiness = rhappiness;
    this.approachSuccessRate;
    this.treatSuccessRate;
    
    game.add.existing(this);
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function(){

	// calculating approach success rate
	this.approachSuccessRate = Math.log(this.happiness) * 20 + 8;

	// calculating treat success rate
	if(this.happiness >= 75 && this.happiness <= 100)
		this.treatSuccessRate = 95;
	if(this.happiness >= 50 && this.happiness < 75)
		this.treatSuccessRate = 85;
	if(this.happiness >= 25 && this.happiness < 50)
		this.treatSuccessRate = 70;
	if(this.happiness >= 1 && this.happiness < 25)
		this.treatSuccessRate = 65;
}