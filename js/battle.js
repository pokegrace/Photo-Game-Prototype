var battle = function(game) 
{
	// stuff
}

// Global state variables
var arrow;
var cat, catScale;
var actionText, catText, turnText;
var approachText, treatText, photoText;
var distanceText, happinessText;
var playerTurn;

battle.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		distance = 75;
		playerTurn = true;

		style1 = {font: "65px Arial", fill: "#ffffff", align: "center"};
		title = game.add.text(game.width / 2, 50, 'Battle!', style1);
		title.anchor.setTo(0.5);

		// randomly assign a happiness to cat from (70 - 100)
		rhappiness = randomRate(7, 11);
		rhappiness *= 10;	

		// adding cat object 
		cat = new Cat(rhappiness);
		game.add.existing(cat);
		// scaling cat for distance
		catScale = 0.25;

		// telling player whose turn it is
		style2 = {font: '28px Arial', fill: '#ffffff', align: 'center'};
		turnText = game.add.text(game.width / 2, 100, 'It\'s your turn.', style2);
		turnText.anchor.setTo(0.5);

		// creating action text to describe to player
		actionText = game.add.text(game.width / 2, 150, 'Use left and right arrow keys to move cursor.', style2);
		actionText.anchor.setTo(0.5);

		distanceText = game.add.text(850, 25, 'Distance: 75 ft. away', style2);
		distanceText.anchor.setTo(0.5);

		happinessText = game.add.text(100, 25, 'Happiness: ' + cat.happiness, style2);
		happinessText.anchor.setTo(0.5);

		// adding text for possible actions
		textStyle = {font: '32px Arial', fill: '#ffffff', align: 'center'};
		approachText = game.add.text(200, 500, 'Approach', textStyle);
		approachText.anchor.setTo(0.5);

		waitText = game.add.text(400, 500, 'Wait', textStyle);
		waitText.anchor.setTo(0.5);

		treatText = game.add.text(600, 500, 'Give Treat', textStyle);
		treatText.anchor.setTo(0.5);

		photoText = game.add.text(800, 500, 'Take Photo', textStyle);
		photoText.anchor.setTo(0.5);

		// pointer to actions
		arrow = game.add.sprite(approachText.x, approachText.y + 50, 'arrow');
		arrow.scale.setTo(0.07);
		arrow.anchor.setTo(0.5);

		// adding keys to control actions
		ENTERkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		// static variable to make cat run chance happen once
		counter = 0;
	},
	update: function() 
	{
		console.log('Player turn: ' + playerTurn);
		// tracking location of arrow
		if(arrow.x == approachText.x && rightkey.justPressed())
			arrow.x = waitText.x;
		else if(arrow.x == waitText.x && rightkey.justPressed())
			arrow.x = treatText.x;
		else if(arrow.x == treatText.x && rightkey.justPressed())
			arrow.x = photoText.x;
		else if(arrow.x == photoText.x && rightkey.justPressed())
			arrow.x = approachText.x;
		else if(arrow.x == approachText.x && leftkey.justPressed())
			arrow.x = photoText.x;
		else if(arrow.x == photoText.x && leftkey.justPressed())
			arrow.x = treatText.x;
		else if(arrow.x == treatText.x && leftkey.justPressed())
			arrow.x = waitText.x;
		else if(arrow.x == waitText.x && leftkey.justPressed())
			arrow.x = approachText.x;

		if(playerTurn)
		{
			turnText.setText('It\'s your turn.');
			//--------------------------------- APPROACH ----------------------------------------------------------
			if(arrow.x == approachText.x && ENTERkey.justPressed())
			{
				// comparing roll to cat.successRate
				var roll = randomRate(1, 101);
				console.log('approach roll: ' + roll);
				console.log('cat success rate: ' + cat.approachSuccessRate);

				// change happiness
				if(cat.happiness == 100)
					cat.happiness -= randomRate(5, 25);
				else if(cat.happiness >= 90 && cat.happiness < 100)
					cat.happiness -= randomRate(6, 25);
				else if(cat.happiness >= 80 && cat.happiness < 90)
					cat.happiness -= randomRate(7, 30);
				else if(cat.happiness >= 70 && cat.happiness < 80)
					cat.happiness -= randomRate(8, 30);
				else if(cat.happiness >= 60 && cat.happiness < 70)
					cat.happiness -= randomRate(10, 35);
				else if(cat.happiness >= 50 && cat.happiness < 60)
					cat.happiness -= randomRate(12, 35);
				else if(cat.happiness >= 40 && cat.happiness < 50)
					cat.happiness -= randomRate(14, 40);
				else if(cat.happiness >= 30 && cat.happiness < 40)
					cat.happiness -= randomRate(15, 39);
				else if(cat.happiness >= 20 && cat.happiness < 30)
					cat.happiness -= randomRate(15, 29);
				else if(cat.happiness >= 10 && cat.happiness < 20)
					cat.happiness -= randomRate(10, 19);
				else if(cat.happiness > 0 && cat.happiness < 10)
					cat.happiness -= randomRate(1, 9);
				else if(cat.happiness <= 0)
					cat.happiness = 0;
				// setting the text
				happinessText.setText('Happiness: ' + cat.happiness);

				// if the approach is successful, change the distance
				if(cat.approachSuccessRate > roll)
				{
					// change stats
					actionText.setText('You approached the cat.');
					distance -= 25;
					distanceText.setText('Distance: ' + distance + ' ft. away');
					catScale += 0.25;
					cat.scale.setTo(catScale);

					// cap distance
					if(distance <= 0)
					{
						actionText.setText('You cannot get any closer.');
						distanceText.setText('Distance: 0 ft. away');
						catScale = 1;
						cat.scale.setTo(catScale);
					}	
				}
				else
				{
					happinessText.setText('Happiness: ' + cat.happiness);
					actionText.setText('You failed to approach the cat.');
				}
				game.time.events.add(2000, function() {playerTurn = false;}, this);
			}
//--------------------------------- WAIT AND WATCH ------------------------------------------------------
			if(arrow.x == waitText.x && ENTERkey.justPressed())
			{
				actionText.setText('You wait patiently to see what the cat will do.');
				game.time.events.add(2000, function() {playerTurn = false;}, this);
			}

//--------------------------------- GIVE TREAT ----------------------------------------------------------
			if(arrow.x == treatText.x && ENTERkey.justPressed())
			{
				var roll = randomRate(1, 101);
				console.log('treat roll: ' + roll);
				console.log('cat success rate: ' + cat.treatSuccessRate);

				if(cat.treatSuccessRate > roll)
				{
					// changing stats
					actionText.setText('You gave the cat a treat.');
					distance -= 25;
					distanceText.setText('Distance: ' + distance + ' ft. away');
					catScale += 0.25;
					cat.scale.setTo(catScale);

					// change happiness
					cat.happiness += randomRate(10, 25);
					happinessText.setText('Happiness: ' + cat.happiness);
				}
				else
					actionText.setText('You failed to give the cat a treat.');

				// cap distance and happiness
				if(distance <= 0)
				{
					distanceText.setText('Distance: 0 ft. away');
					catScale = 1;
					cat.scale.setTo(catScale);
				}
				if(cat.happiness >= 100)
				{
					cat.happiness = 100;
					happinessText.setText('Happiness: ' + cat.happiness);
				}
				game.time.events.add(2000, function() {playerTurn = false;}, this);
			}
//--------------------------------- TAKE PHOTO ----------------------------------------------------------
			if(arrow.x == photoText.x && ENTERkey.justPressed())
			{
				actionText.setText('You took a photo of the cat.');
				// game.state.start('photo');
				game.time.events.add(2000, function() {playerTurn = false;}, this);
			}
		}
//--------------------------------- CAT TURN -------------------------------------------------------------
		if(!playerTurn && counter == 0)
		{
			turnText.setText('It is the cat\'s turn.');

			var runChance = Math.log(cat.happiness) * 20 + 8;
			var roll = randomRate(1, 101);

			if(runChance > roll)
			{
				catText = 'The cat is staring at you intently...';
			}
			else
			{
				catText = 'The cat ran away...';
				game.time.events.add(2000, function() {game.state.start('play');}, this);
			}
				

			actionText.setText(catText);

			counter++;

			// add a delay when changing text
			game.time.events.add(2000, function() {playerTurn = true; counter = 0;}, this);
		}
	},
};

function randomRate(min, max)
{
	rand = Math.floor(Math.random() * (max - min) + min);
	return rand;
}