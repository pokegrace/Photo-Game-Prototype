function Cat(rhappiness){
    Phaser.Sprite.call( this, game, game.width  / 2 , game.height / 2, 'cat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.25);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.happiness = rhappiness;
    this.approachSuccess = true;
    this.treatSuccess = true;
    // randomRate function in battle.js
    randApproach = randomRate(0, 101);	// for calculating success % of approach
    randTreat = randomRate(0, 101); // for calculating success % of treat
    console.log(randApproach);
    console.log(randTreat);
    
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
		if(randApproach == 1)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 80 && this.happiness < 90)
	{
		if(randApproach <= 12)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 70 && this.happiness < 80)
	{
		if(randApproach <= 23)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 60 && this.happiness < 70)
	{
		if(randApproach <= 34)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 50 && this.happiness < 60)
	{
		if(randApproach <= 45)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 40 && this.happiness < 50)
	{
		if(randApproach <= 56)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 30 && this.happiness < 40)
	{
		if(randApproach <= 67)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 20 && this.happiness < 30)
	{
		if(randApproach <= 78)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness >= 10 && this.happiness < 20)
	{
		if(randApproach <= 89)
			this.approachSuccess = false;
		else
			this.approachSuccess = true;
	}
	else if(this.happiness > 0 && this.happiness < 10)
		this.approachSuccess = false;

	// calculating treat success rate
	if(this.happiness >= 75 && this.happiness <= 100)
	{
		if(randTreat <= 10)
			this.treatSuccess = false;
		else
			this.treatSuccess = true;
	}
	else if(this.happiness >= 50 && this.happiness < 75)
	{
		if(randTreat <= 25)
			this.treatSuccess = false;
		else
			this.treatSuccess = true;
	}
	else if(this.happiness >= 25 && this.happiness < 50)
	{
		if(randTreat <= 50)
			this.treatSuccess = false;
		else
			this.treatSuccess = true;
	}
	else if(this.happiness > 0 && this.happiness < 25)
	{
		if(randTreat <= 75)
			this.treatSuccess = false;
		else
			this.treatSuccess = true;
	}
}
