function Treat(x,y){
    Phaser.Sprite.call( this, game, x, y, 'battleUI', 'treat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.4);
    game.physics.enable(this, Phaser.Physics.ARCADE);

    
    game.add.existing(this);
    this.enableBody = true;
}

Treat.prototype = Object.create(Phaser.Sprite.prototype);
Treat.prototype.constructor = Treat;

Treat.prototype.update = function(){
	
	
}
