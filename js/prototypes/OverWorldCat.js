function OverWorldCat(){
    Phaser.Sprite.call( this, game, game.width * 3 /4 , game.height / 2, 'cat');

    this.anchor.setTo(0.5);
    this.scale.setTo(0.25);
    game.physics.enable(this, Phaser.Physics.ARCADE);


    this.coneRange = 200;
    this.detectionDot = game.add.graphics(0, 0);
    this.lastRotation = this.rotation - 1;
    this.lastBody = {x:0, y:0};

    game.add.existing(this);
}

OverWorldCat.prototype = Object.create(Phaser.Sprite.prototype);
OverWorldCat.prototype.constructor = OverWorldCat;

OverWorldCat.prototype.update = function(){
    // spin the cat
    this.rotation = this.rotation + 0.01;


    if (this.rotation != this.lastRotation ||
        this.lastBody.x != this.body.x ||
        this.body.y != this.lastBody.y)
    {
        this.detectionDot.clear();
        this.lastRotation = this.rotation;
        this.lastBody.x = this.body.x;
        this.lastBody.y = this.body.y;
        this.last
        var conePath = [this.x, this.y];
        for (var i = this.rotation - 1; i <= this.rotation + 1; i += 0.1)
        {
            var x = this.x + this.coneRange * Math.cos(i);
            var y = this.y + this.coneRange * Math.sin(i);
            var ray = new Phaser.Line(this.x, this.y, x, y);

            var point = this.drawConeAroundWalls(ray);

            conePath.push(point.x);
            conePath.push(point.y);
        }
            this.detectionDot.lineStyle(2, 0xffd900, 1);
            this.detectionDot.beginFill(0x00FF00, .3);
            this.detectionDot.drawPolygon(conePath);
            this.detectionDot.endFill();
            this.detectionDot.heigth = 0;
}

}


// taking inspiration from the raycasting example here


OverWorldCat.prototype.drawConeAroundWalls = function(ray) {
    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;
    var point = {x:ray.end.x, y:ray.end.y};

    var distanceToPlayer = Number.POSITIVE_INFINITY;

    // check distanct to player
    var lines = [
        new Phaser.Line(player.body.x+10, player.body.y+10, player.body.x-10 + player.width, player.y+10),
        new Phaser.Line(player.body.x+10, player.body.y+10, player.body.x+10, player.body.y-10 + player.height),
        new Phaser.Line(player.body.x-10 + player.width, player.body.y+10,
            player.body.x-10 + player.width, player.body.y+10 + player.height),
        new Phaser.Line(player.body.x+10, player.body.y-10 + player.height,
            player.body.x-10 + player.width, player.body.y-10 + player.height)
    ];

    for(var i = 0; i < lines.length; i++) {
        var intersect = Phaser.Line.intersects(ray, lines[i]);
        if (intersect) {
            // Find the closest intersection
            distance =
                this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
            if (distance < distanceToPlayer) {
                distanceToPlayer = distance;
                closestIntersection = intersect;
            }
        }
    }

    if (game.playerIsSneaking)
    {


        // For each of the walls...
        overWorldWalls.forEach(function(wall) {
            // Create an array of lines that represent the four edges of each wall
            var lines = [
                new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                new Phaser.Line(wall.x + wall.width, wall.y,
                    wall.x + wall.width, wall.y + wall.height),
                new Phaser.Line(wall.x, wall.y + wall.height,
                    wall.x + wall.width, wall.y + wall.height)
            ];

            // Test each of the edges in this wall against the ray.
            // If the ray intersects any of the edges then the wall must be in the way.
            for(var i = 0; i < lines.length; i++) {
                var intersect = Phaser.Line.intersects(ray, lines[i]);
                if (intersect) {
                    // Find the closest intersection
                    distance =
                        this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                    if (distance < distanceToWall) {
                        distanceToWall = distance;
                        closestIntersection = intersect;
                    }
                }
            }
        }, this);
    }
    if (distanceToPlayer < distanceToWall)
    {
        console.log(cat, player);
        game.state.start('battle');
        game.sound.play('catDetects');
    }
    return (closestIntersection) ? closestIntersection: point;

};
