var battle = function(game) 
{
	// Global state variables
}


battle.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		style = { font: "65px Arial", fill: "#ffffff", align: "center" };
		title = game.add.text(game.width / 2, 50, 'Battle!', style);
		title.anchor.setTo(0.5);

		cat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		cat.anchor.setTo(0.5);
		// set cat size to 25%
		cat.scale.setTo(0.25);

		textStyle = {font: '32px Arial', fill: '#ffffff', align: 'center'};
		approachText = game.add.text(300, 500, 'Approach', textStyle);
		approachText.anchor.setTo(0.5);

		treatText = game.add.text(500, 500, 'Give Treat', textStyle);
		treatText.anchor.setTo(0.5);

		photoText = game.add.text(700, 500, 'Take Photo', textStyle);
		photoText.anchor.setTo(0.5);

		arrow = game.add.sprite(approachText.x, approachText.y + 50, 'arrow');
		arrow.anchor.setTo(0.5);
		arrow.scale.setTo(0.07);
	},
	update: function() 
	{
		// update
	},
};