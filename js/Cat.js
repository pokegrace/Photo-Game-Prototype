function Cat(rhappiness){
    Phaser.Sprite.call( this, game, game.width / 2, game.height / 2, 'cat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.25);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.happiness = rhappiness;
    this.approachSuccess = true;
    // randomRate function in battle.js
    rand = randomRate(0, 101);	// for calculating success %
    console.log(rand);

    game.add.existing(this);
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function(){
	// calculating approach success rate
    if(this.happiness == 100)
    	this.approachSuccess = true;
	else if(this.happiness >= 90 && this.happiness < 100)
	{
		if(rand == 1)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 80 && this.happiness < 90)
	{
		if(rand <= 12)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 70 && this.happiness < 80)
	{
		if(rand <= 23)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 60 && this.happiness < 70)
	{
		if(rand <= 34)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 50 && this.happiness < 60)
	{
		if(rand <= 45)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 40 && this.happiness < 50)
	{
		if(rand <= 56)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 30 && this.happiness < 40)
	{
		if(rand <= 67)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 20 && this.happiness < 30)
	{
		if(rand <= 78)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 10 && this.happiness < 20)
	{
		if(rand <= 89)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness > 0 && this.happiness < 10)
		this.approachSuccess = false;

	// calculating treat success rate

}