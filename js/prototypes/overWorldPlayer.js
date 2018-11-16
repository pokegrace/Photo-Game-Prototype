function Player(x, y, active)
{
    Phaser.Sprite.call( this, game, x, y, 'cat')
    this.anchor.setTo(0.5);
    this.scale.setTo(0.2);
    game.physics.enable(this, Phaser.Physics.ARCADE)
    

    this.active = active;
    game.add.existing(this);

    this.crawling = false;

    this.steppingSound = game.add.audio('step');
    this.steppingSound.volume = 0.3;
    this.body.collideWorldBounds=true;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function()
{
}
Player.prototype.update = function()
{
    if (!this.active) return;

    // check if the player is sneaking
    var control = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.crawling = control.isDown;
    var accelleration = (this.crawling) ? 5 : 10;
    var topSpeed = (this.crawling) ? 40 : 80;

    //tint the character darker if sneaking
    if (this.crawling)
    {
        game.playerIsSneaking = true;
        player.tint = 0x777777;
    }
    else
    {
        game.playerIsSneaking = false;
        player.tint = 0xFFFFFF;
    }
    // vertical movement
    var arrows = game.input.keyboard.createCursorKeys();
    if (arrows.up.isDown && arrows.down.isUp)
        {
            player.body.velocity.y-=accelleration;
        }
    else if (arrows.down.isDown && arrows.up.isUp)
        {
            player.body.velocity.y+=accelleration;
        }
    else
        {
            if (player.body.velocity.y > 0)
                player.body.velocity.y = Math.floor(player.body.velocity.y/2);
            if (player.body.velocity.y < 0)
                player.body.velocity.y = Math.ceil(player.body.velocity.y/2);
        }

    // horizontal movement
    if (arrows.right.isDown && arrows.left.isUp)
        {
            player.body.velocity.x+=accelleration;
        }
    else if (arrows.left.isDown && arrows.right.isUp)
        {
            player.body.velocity.x-=accelleration;
        }
    else
        {
            if (player.body.velocity.x > 0)
                player.body.velocity.x = Math.floor(player.body.velocity.x/2);
            if (player.body.velocity.x < 0)
                player.body.velocity.x = Math.ceil(player.body.velocity.x/2);
        }
    player.body.velocity.clampX(-topSpeed, topSpeed);
    player.body.velocity.clampY(-topSpeed, topSpeed);

    if (!this.crawling && (this.body.velocity.x != 0 || this.body.velocity.y != 0) && !this.steppingSound.isPlaying)
    {
        this.steppingSound.play();
    }
}

