/* 
 * A simple test script for spritelib
 */

var game;
var rocket;

function init() 
{
    var canvas = document.getElementById("myCanvas");
    game = new Game(canvas);
    var sp = new Sprite(25,25,50,50);
    var img = document.getElementById("sprites");
    sp.imageBase(img);
    sp.addImage(0,339,32,31);
    sp.addImage(40,339,32,31);
    sp.addImage(74,339,32,31);
    sp.addImage(105,339,32,31);
    sp.addImage(136,339,32,31);
    sp.addImage(171,339,32,31);
    sp.addImage(208,339,32,31);
    sp.addImage(239,339,32,31);
    sp.addImage(272,339,30,31);
    sp.addImage(345,339,32,31);
    sp.addAnimation("walk",[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    sp.animate("walk");
    sp.setVelocity(-40,0);

    sp.collideB = function(r) 
    {
        this.flipx();
        this.setVelocity(-this.dx,this.dy);
    };

    sp.collide = function() 
    {
        game.removeSprite(this);
        game.removeSprite(rocket);
    };

    game.addSprite(sp);
    var back = new Background(0,0,500,500);
    game.setBackground(back);
    var pimg = document.getElementById("player");
    var player = game.getPlayer();
    sp = new Sprite(250,450, 50, 50);
    sp.imageBase(pimg);
    sp.addImage(241,25, 16, 11);
    player.setSprite(sp);
    player.setPos(250,450);
    rocket = new Sprite(250,250,25,25);
    rocket.imageBase(pimg);
    rocket.addImage(18,117,18,20);

    rocket.collideB = function(r) 
    {
        game.removeSprite(this);
    };
    player.fire = function()
    {
        rocket.setPos(player.x+15,player.y-50);
        rocket.setVelocity(0,-60);
        game.addSprite(rocket);
    };
    
    game.start(0.1);
}

function stopGame() {
    game.stop();
}

function startGame() {
    game.start(0.1);
}
