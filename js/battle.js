var battle = function(game) 
{
	// stuff
}

// Global state variables
var arrow;
var cat, catScale;
var actionText, approachText, treatText, photoText;
var distance = 75, distanceText;
var happiness = 50, happinessText;

battle.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		style1 = {font: "65px Arial", fill: "#ffffff", align: "center"};
		title = game.add.text(game.width / 2, 50, 'Battle!', style1);
		title.anchor.setTo(0.5);

		cat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		cat.anchor.setTo(0.5);
		// set cat size to 25%
		catScale = 0.25;
		cat.scale.setTo(catScale);

		// creating action text to describe to player
		style2 = {font: '28px Arial', fill: '#ffffff', align: 'center'};
		actionText = game.add.text(game.width / 2, 100, 'Use W and D to move cursor.', style2);
		actionText.anchor.setTo(0.5);

		distanceText = game.add.text(850, 25, 'Distance: 75 ft. away', style2);
		distanceText.anchor.setTo(0.5);

		happinessText = game.add.text(100, 25, 'Happiness: 50', style2);
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
		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
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

		// if an option is selected, do something
		if(arrow.x == approachText.x && ENTERkey.justPressed())
		{
			actionText.setText('You approached the cat.');
			distance -= 25;
			distanceText.setText('Distance: ' + distance + ' ft. away');
			catScale += 0.25;
			cat.scale.setTo(catScale);
			if(distance <= 0)
			{
				actionText.setText('You cannot get any closer.');
				distanceText.setText('Distance: 0 ft. away');
				catScale = 1;
				cat.scale.setTo(catScale);
			}
		}
		if(arrow.x == treatText.x && ENTERkey.justPressed())
		{
			actionText.setText('You gave the cat a treat.');
			happiness += 10;
			happinessText.setText('Happiness: ' + happiness);
		}
		if(arrow.x == photoText.x && ENTERkey.justPressed())
		{
			actionText.setText('You took a photo of the cat.');
			// game.state.start('photo');
		}
	},
};