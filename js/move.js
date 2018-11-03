var move = function(game) 
{
	// Global state variables
}


move.prototype = {
	preload: function() 
	{
		// preload
	},
	create: function() 
	{
		// create
		style = { font: "65px Arial", fill: "#ffffff", align: "center" };
		title = game.add.text(game.width / 2, 50, 'Move!', style);
		title.anchor.setTo(0.5);

		cat = game.add.sprite(game.width / 2, game.height / 2, 'cat');
		cat.anchor.setTo(0.5);
		// set cat size to 25%
		cat.scale.setTo(0.25);
	},
	update: function() 
	{
		// update
	},
};
