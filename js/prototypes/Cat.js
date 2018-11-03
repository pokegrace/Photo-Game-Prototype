function Cat(){
    Phaser.Sprite.call( this, game, game.width/3, game.height/3, 'cat')
    this.anchor.setTo(0.5);
    this.scale.setTo(0.1);
    game.physics.enable(this, Phaser.Physics.ARCADE)
    
    game.add.existing(this);
}

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function(){

}