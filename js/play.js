var play = function(game) 
{
	// Global state variables
}


play.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		style = { font: "65px Arial", fill: "#ffffff", align: "center" };
		title = game.add.text(game.width / 2, 50, 'Play!', style);
		title.anchor.setTo(0.5);

		cat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		cat.anchor.setTo(0.5);
	},
	update: function() 
	{
		// update
	},
};