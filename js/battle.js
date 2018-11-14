var battle = function(game) 
{
	// stuff
}

// Global state variables
var arrow;
var cat, catScale;
var actionText, catText, turnText;
var approachText, treatText, photoText;
var distanceText, moodText;
var playerTurn;

var approachSuccessText = ['Success!', 'You\'ve successfully moved closer.', 'The cat has yet to move.'];
var approachFailText = ['The cat has moved away from you.', 'The cat appears unamused before moving.'];
var treatSuccessText = ['The cat looks interested in you.', 'The cat appears to be looking cute for you.', 'The cat has taken the treat.'];
var treatFailText = ['The cat does not appear to like the treat.', 'The cat looks horrified at you.', 'The cat doesn\'t take the treat.'];
var photoSuccessText = ['Cat photo acquired!', 'Photo successful, time for Catstagram.', 'Time to show the world the photo.'];
var catHappyText = ['The cat appears intrigued.', 'The cat looks visibly happy.'];
var catNeutralText = ['They stare at you questioningly.', 'The cat doesn\'t appear to care about you.'];
var catUnhappyText = ['They look ready to bolt any minute.', 'They look highly annoyed at you.', 'You\'re slightly afraid this cat may come up and claw you.',
						'You can clearly tell this cat is unhappy.'];
var catRunText = ['Cat has run away!', 'Cat was bored and left.', 'You scared the cat away!'];

battle.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		distance = (game.catDistance < 100) ? 100 : game.catDistance;
		maxDistance = 240;

		// for highlighting buttons
		choice = 0;

		// adding UI assets
		panel = game.add.sprite(0, 0, 'battleUI', 'panels');

		photoButton = game.add.sprite(925, 290, 'battleUI', 'camerabutton');
		photoButton.anchor.setTo(0.5);
		panel.addChild(photoButton);

		catTurn = game.add.sprite(925, 560, 'battleUI', 'catturn');
		catTurn.anchor.setTo(0.5);
		panel.addChild(catTurn);

		yourTurn = game.add.sprite(925, 560, 'battleUI', 'yourturn');
		yourTurn.anchor.setTo(0.5);
		panel.addChild(yourTurn);

		waitButton = game.add.sprite(55, 130, 'battleUI', 'whighlight');
		waitButton.anchor.setTo(0.5);
		panel.addChild(waitButton);

		treatButton = game.add.sprite(55, 315, 'battleUI', 'treat');
		treatButton.anchor.setTo(0.5);
		panel.addChild(treatButton);

		approachButton = game.add.sprite(55, 500, 'battleUI', 'approach');
		approachButton.anchor.setTo(0.5);
		panel.addChild(approachButton);

		battleTextBox = game.add.sprite(500, 530, 'battleUI', 'battletextbox');
		battleTextBox.anchor.setTo(0.5);

		moodBar = game.add.sprite(125, 15, 'battleUI', 'goodmood');

		// randomly assign a mood to cat from (70 - 100)
		rmood = randomRate(7, 11);
		rmood *= 10;	

		// adding cat object 
		cat = new Cat(rmood);
		game.add.existing(cat);
		// scaling cat
		if(distance <= 0)
			catScale = 1;
		else if(distance >= 200)
			catScale = 0.2;
		else
			catScale = (maxDistance - distance) / maxDistance;
		cat.scale.setTo(catScale);

		// telling player whose turn it is
		style2 = {font: '28px Arial', fill: '#ffffff', align: 'center'};

		// creating action text to describe to player
		style1 = {font: '20px Arial', fill: '#000000', align: 'center'};
		actionText = game.add.text(0, 0, 'Wait and watch.', style1);
		actionText.anchor.setTo(0.5);
		battleTextBox.addChild(actionText);

		distanceText = game.add.text(500, 600, 'Distance: 75 ft. away', style2);
        distanceText.setText('Distance: ' + distance + ' ft. away');
		distanceText.anchor.setTo(0.5);

		moodText = game.add.text(110, 60, cat.mood + ' / 100', style2);
		moodText.anchor.setTo(0.5);
		moodBar.addChild(moodText);

		// adding keys to control button highlights
		ENTERkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		upkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downkey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		setTurn('player');

		// static variable to make cat run chance happen once
		counter = 0;
	},
	update: function() 
	{
		console.log('Player turn: ' + playerTurn);
		
		// highlighting buttons based on choice
		if(choice == 0 && downkey.justPressed())
		{
			choice = 1;
			actionText.setText('Give a treat.');
			waitButton.frame = 9;
			treatButton.frame = 7;
		}
		else if(choice == 1 && downkey.justPressed())
		{
			choice = 2;
			actionText.setText('Approach.');
			treatButton.frame = 8;
			approachButton.frame = 12;
		}
		else if(choice == 1 && upkey.justPressed())
		{
			choice = 0;
			actionText.setText('Wait and watch.');
			treatButton.frame = 8;
			waitButton.frame = 10;
		}
		else if(choice == 2 && upkey.justPressed())
		{
			choice = 1;
			actionText.setText('Give a treat.');
			approachButton.frame = 13;
			treatButton.frame = 7;
		}
		else if(choice == 4 && leftkey.justPressed())
		{
			choice = 1;
			actionText.setText('Give a treat.');
			photoButton.scale.setTo(1);
			treatButton.frame = 7;
		}
		else if(choice == 1 && rightkey.justPressed())
		{
			choice = 4;
			actionText.setText('Take a photo.');
			treatButton.frame = 8;
			photoButton.scale.setTo(1.2);
		}

		if(playerTurn)
		{
        	// play selection switch sound
        	if (rightkey.justPressed() || leftkey.justPressed() || upkey.justPressed() || downkey.justPressed())
        	{
           		game.sound.play('menuSwitch');
        	}
			//--------------------------------- APPROACH ----------------------------------------------------------
			if(choice == 2 && ENTERkey.justPressed())
			{
				// comparing roll to cat.successRate
				var roll = randomRate(1, 101);
				console.log('approach roll: ' + roll);
				console.log('cat success rate: ' + cat.approachSuccessRate);

				// change mood
				if(cat.mood == 100)
					cat.mood -= randomRate(5, 25);
				else if(cat.mood >= 90 && cat.mood < 100)
					cat.mood -= randomRate(6, 25);
				else if(cat.mood >= 80 && cat.mood < 90)
					cat.mood -= randomRate(7, 30);
				else if(cat.mood >= 70 && cat.mood < 80)
					cat.mood -= randomRate(8, 30);
				else if(cat.mood >= 60 && cat.mood < 70)
					cat.mood -= randomRate(10, 35);
				else if(cat.mood >= 50 && cat.mood < 60)
					cat.mood -= randomRate(12, 35);
				else if(cat.mood >= 40 && cat.mood < 50)
					cat.mood -= randomRate(14, 40);
				else if(cat.mood >= 30 && cat.mood < 40)
					cat.mood -= randomRate(15, 39);
				else if(cat.mood >= 20 && cat.mood < 30)
					cat.mood -= randomRate(15, 29);
				else if(cat.mood >= 10 && cat.mood < 20)
					cat.mood -= randomRate(10, 19);
				else if(cat.mood > 0 && cat.mood < 10)
					cat.mood -= randomRate(1, 9);
				else if(cat.mood <= 0)
					cat.mood = 0;
				// setting the text
				moodText.setText(cat.mood + ' / 100');

				// if the approach is successful, change the distance
				if(cat.approachSuccessRate > roll)
				{
					// approach a random distance each time
					var distRoll = randomRate(20, 80);
					// randomly generate a text to appear in box
					var r = randomRate(0, 3);
					// change stats
					actionText.setText(approachSuccessText[r]);
					distance -= distRoll;
					distanceText.setText('Distance: ' + distance + ' ft. away');
					if(distance >= 200)
						catScale = 0.2;
					else
						catScale = (maxDistance - distance) / maxDistance;
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
					// randomly generate a text to appear in box
					var r = randomRate(0, 2);
					moodText.setText(cat.mood + ' / 100');
					actionText.setText(approachFailText[r]);
				}
				disableKeys();
				game.time.events.add(2000, function() {setTurn('cat');}, this);
			}
//--------------------------------- WAIT AND WATCH ------------------------------------------------------
			if(choice == 0 && ENTERkey.justPressed())
			{
				actionText.setText('You wait patiently and watch.');
				disableKeys();
				game.time.events.add(2000, function() {setTurn('cat');}, this);
            }
//--------------------------------- GIVE TREAT ----------------------------------------------------------
			if(choice == 1 && ENTERkey.justPressed())
			{
				var roll = randomRate(1, 101);
				console.log('treat roll: ' + roll);
				console.log('cat success rate: ' + cat.treatSuccessRate);

				if(cat.treatSuccessRate > roll)
				{
					// randomly generate a text to appear in box
					var r = randomRate(0, 3);
					actionText.setText(treatSuccessText[r]);
					// giving a treat will always give you +50 ft.
					distance -= 40;
					distanceText.setText('Distance: ' + distance + ' ft. away');
					if(distance >= 200)
						catScale = 0.2;
					else
						catScale = (maxDistance - distance) / maxDistance;
					cat.scale.setTo(catScale);

					// change mood
					cat.mood += randomRate(10, 25);
					moodText.setText(cat.mood + ' / 100');
				}
				else
				{
					// randomly generate a text to appear in box
					var r = randomRate(0, 3);
					actionText.setText(treatFailText[r]);
				}

				// cap distance and mood
				if(distance <= 0)
				{
					distanceText.setText('Distance: 0 ft. away');
					catScale = 1;
					cat.scale.setTo(catScale);
				}
				if(cat.mood >= 100)
				{
					cat.mood = 100;
					moodText.setText(cat.mood + ' / 100');
				}
				disableKeys();
				game.time.events.add(2000, function() {setTurn('cat');}, this);
			}
//--------------------------------- TAKE PHOTO ----------------------------------------------------------
			if(choice == 4 && ENTERkey.justPressed())
			{
				// play shutter sound effect
           		game.sound.play('shutterNoise');
           		// randomly generate a text to appear in box
				var r = randomRate(0, 3);
				actionText.setText(photoSuccessText[r]);
				game.time.events.add(2000, function() {setTurn('cat'); game.state.start('catstagram');}, this);
			}
		}
//--------------------------------- CAT TURN -------------------------------------------------------------
		if(!playerTurn && counter == 0)
		{
			setTurn('cat');

			var runChance = Math.log(cat.mood) * 20 + 8;
			var roll = randomRate(1, 101);

			// if runChance > roll then cat stays
			if(runChance > roll)
			{
				if(cat.mood >= 67 && cat.mood <= 100)
				{
					// randomly generate a text to appear in box
					var r = randomRate(0, 2);
					actionText.setText(catHappyText[r]);
				}
				else if(cat.mood >= 34 && cat.mood < 67)
				{
					// randomly generate a text to appear in box
					var r = randomRate(0, 2);
					actionText.setText(catNeutralText[r]);
				}
				else if(cat.mood >= 0 && cat.mood < 34)
				{
					// randomly generate a text to appear in box
					var r = randomRate(0, 4);
					actionText.setText(catUnhappyText[r]);
				}
			}
			else
			{
				// randomly generate a text to appear in box
				var r = randomRate(0, 3);
				actionText.setText(catRunText[r]);
				game.time.events.add(2000, function() {enableKeys(); game.state.start('play');}, this);
			}
			counter++;

			// add a delay when changing text
			game.time.events.add(2000, function() {setTurn('player'); enableKeys(); counter = 0;}, this);
		}
	},
};

// generates a random number within given range
function randomRate(min, max)
{
	rand = Math.floor(Math.random() * (max - min) + min);
	return rand;
}

function disableKeys()
{
	ENTERkey.enabled = false;
	upkey.enabled = false;
	downkey.enabled = false;
	leftkey.enabled = false;
	rightkey.enabled = false;
}

function enableKeys()
{
	ENTERkey.enabled = true;
	upkey.enabled = true;
	downkey.enabled = true;
	leftkey.enabled = true;
	rightkey.enabled = true;
}

function setTurn(turn)
{
	if(turn == 'player')
	{
		playerTurn = true;
		choice = 0;
		waitButton.frame = 10;
		actionText.setText('Wait and watch.');
		catTurn.visible = false;
		yourTurn.visible = true;
	}
	else if(turn == 'cat')
	{
		playerTurn = false;
		catTurn.visible = true;
		yourTurn.visible = false;
		waitButton.frame = 9;
		treatButton.frame = 8;
		approachButton.frame = 13;
		photoButton.scale.setTo(1);
	}
}