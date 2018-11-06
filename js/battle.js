var battle = function(game) 
{
	// stuff
}

// Global state variables
var arrow;
var cat, catScale;
var actionText, approachText, treatText, photoText;
var distance, distanceText;
var happiness, happinessText;

battle.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		distance = 75;
		happiness = 50;

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

		// creating action text to describe to player
		style2 = {font: '28px Arial', fill: '#ffffff', align: 'center'};
		actionText = game.add.text(game.width / 2, 100, 'Use left and right arrow keys to move cursor.', style2);
		actionText.anchor.setTo(0.5);

		distanceText = game.add.text(850, 25, 'Distance: 75 ft. away', style2);
		distanceText.anchor.setTo(0.5);

		happinessText = game.add.text(100, 25, 'Happiness: ' + cat.happiness, style2);
		happinessText.anchor.setTo(0.5);

		// adding text for possible actions
		textStyle = {font: '32px Arial', fill: '#ffffff', align: 'center'};
		approachText = game.add.text(300, 500, 'Approach', textStyle);
		approachText.anchor.setTo(0.5);

		treatText = game.add.text(500, 500, 'Give Treat', textStyle);
		treatText.anchor.setTo(0.5);

		photoText = game.add.text(700, 500, 'Take Photo', textStyle);
		photoText.anchor.setTo(0.5);

		// pointer to actions
		arrow = game.add.sprite(approachText.x, approachText.y + 50, 'arrow');
		arrow.scale.setTo(0.07);
		arrow.anchor.setTo(0.5);

		// adding keys to control actions
		ENTERkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	},
	update: function() 
	{
		// tracking location of arrow
		if(arrow.x == approachText.x && rightkey.justPressed())
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
			arrow.x = approachText.x;

		// APPROACH
		if(arrow.x == approachText.x && ENTERkey.justPressed())
		{
			// comparing roll to cat.successRate
			var roll = randomRate(1, 101);
			console.log('approach roll: ' + roll);
			console.log('cat success rate: ' + cat.approachSuccessRate);

			// if cat.successRate > roll, then success!
			if(cat.approachSuccessRate > roll)
			{
				// changing stats
				actionText.setText('You approached the cat.');
				distance -= 25;
				distanceText.setText('Distance: ' + distance + ' ft. away');
				catScale += 0.25;
				cat.scale.setTo(catScale);

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
					actionText.setText('Your cat ran away.');
				happinessText.setText('Happiness: ' + cat.happiness);
			}
			else
			{
				happinessText.setText('Happiness: ' + cat.happiness);
				actionText.setText('Approach failed. Your cat ran away.');
				game.state.start('play');
			}

			// cap distance
			if(distance <= 0)
			{
				actionText.setText('You cannot get any closer.');
				distanceText.setText('Distance: 0 ft. away');
				catScale = 1;
				cat.scale.setTo(catScale);
			}			
		}
		// GIVE TREAT
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
		}
		// TAKE PHOTO
		if(arrow.x == photoText.x && ENTERkey.justPressed())
		{
			actionText.setText('You took a photo of the cat.');
			// game.state.start('photo');
		}
	},
};

function randomRate(min, max)
{
	rand = Math.floor(Math.random() * (max - min) + min);
	return rand;
}