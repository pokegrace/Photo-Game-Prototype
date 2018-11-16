var battleTutorial = function(game) 
{
	// stuff
}

battleTutorial.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{

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

		waitButton = game.add.sprite(55, 130, 'battleUI', 'wait');
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

		moodHead = game.add.sprite(125, 15, 'battleUI', 'moodHead');
		moodBar = game.add.sprite(175, 33, 'battleUI', 'moodBar');
		moodOutline = game.add.sprite(125, 15, 'battleUI', 'moodOutline');

		// randomly assign a mood to cat from (70 - 100)
		rmood = randomRate(7, 11);
		rmood *= 10;	

		setMoodBar(rmood);

		tutorialCat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		tutorialCat.anchor.setTo(0.5);
		tutorialCat.scale.setTo(0.5);
		
		// creating action text to describe to player
		style1 = {font: '20px Arial', fill: '#000000', align: 'center', wordWrap: true, wordWrapWidth: 350};
		actionText = game.add.text(0, 0, 'Wait and watch.', style1);
		actionText.anchor.setTo(0.5);
		battleTextBox.addChild(actionText);

		style2 = {font: '28px Arial', fill: '#ffffff', align: 'center'};
		distanceText = game.add.text(500, 600, 'Distance: 120 ft. away', style2);
		distanceText.anchor.setTo(0.5);

		moodText = game.add.text(110, 60, rmood + ' / 100', style2);
		moodText.anchor.setTo(0.5);
		moodOutline.addChild(moodText);

		// adding tutorial panels
		tutorialPanel = game.add.sprite(game.width / 2 + 20, 85, 'tutorialtextbox');
		tutorialPanel.anchor.setTo(0.5);
		enterButton = game.add.sprite(145, 50, 'enterButton');
		enterButton.scale.setTo(0.6);
		enterButton.anchor.setTo(0.5);
		tutorialPanel.addChild(enterButton);
		tutorialStyle = {font: '18px Arial', fill: '#000000', align: 'center', wordWrap: true, wordWrapWidth: 350};
		tutorialText = game.add.text(0, 0, 'Welcome to the battle state!\nInside the battle, you only get one photo so make it count! You get 4 actions, each will affect the cat\'s mood.', tutorialStyle);
		tutorialText.anchor.setTo(0.5);
		tutorialPanel.addChild(tutorialText);

		// adding keys to control button highlights
		ENTERkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		upkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		downkey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		leftkey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		rightkey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		tutorialCounter = 0;
	},
	update: function() 
	{
		if(tutorialCounter == 0 && ENTERkey.justPressed())
		{
			tutorialCounter++;
			waitButton.frame = 13;
			tutorialPanel.x = 325;
			tutorialPanel.y = 120;
			tutorialText.setText('Wait: You do nothing. Maybe the cat will change poses!');
		}
		else if(tutorialCounter == 1 && ENTERkey.justPressed())
		{
			tutorialCounter++;
			waitButton.frame = 12;
			treatButton.frame = 10;
			tutorialPanel.x = 325;
			tutorialPanel.y = 310;
			tutorialText.setText('Give treat: If successful, raises the cat\'s mood and brings them closer.');
		}
		else if(tutorialCounter == 2 && ENTERkey.justPressed())
		{
			tutorialCounter++;
			treatButton.frame = 11;
			approachButton.frame = 15;
			tutorialPanel.x = 325;
			tutorialPanel.y = 500;
			tutorialText.setText('Approach: Lowers cat\'s mood but may get you even closer to the cat.');
		}
		else if(tutorialCounter == 3 && ENTERkey.justPressed())
		{
			tutorialCounter++;
			approachButton.frame = 0;
			photoButton.scale.setTo(1.2);
			tutorialPanel.x = 660;
			tutorialPanel.y = 290;
			tutorialText.setText('Take photo: Ends the battle and takes you to the catstagram screen.');
		}
		else if(tutorialCounter == 4 && ENTERkey.justPressed())
		{
			tutorialCounter++;
			photoButton.scale.setTo(1);
			tutorialPanel.x = game.width / 2;
			tutorialPanel.y = game.height / 2;
			tutorialText.setText('Get close to the cat but also make sure the cat is happy, to get a good photo.\nGood luck!');
		}
		else if(tutorialCounter == 5 && ENTERkey.justPressed())
			game.state.start('battle');
	},
};