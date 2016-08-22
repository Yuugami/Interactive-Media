/* 
 * Earthbound Demo
 */

var game;
//var mobSpeed = -50;//(prompt("Choose monster speed. (Number between 1 and 100"));// Used

function init() 
{
    /*
    * Get Canvas
    * Place the Game inside the Canvas
    */
    var canvas = document.getElementById("myCanvas");
    game = new Game(canvas); 

    // var canvas2 = document.getElementById("rooms");
    // var ctx = canvas2.getContext("2d");
    // var img = document.getElementById("nessRoom")
    // var pat = ctx.createPattern(img, "repeat");
    // ctx.rect(0, 0, 150, 100);
    // ctx.fillStyle = pat;
    // ctx.fill();
    /****************************************
    * Parameters:
    * 1 - X - X Coordinate (Position on Canvas)
    * 2 - Y - Y Coordinate (Position on Canvas)
    * 3 - Width - Width it MUST fill
    * 4 - Height - Height it MUST fill
    ****************************************/ 
    var sp = new Sprite(375,0,40,50);
    var img = document.getElementById("mainPlayer"); // Get the image
    sp.imageBase(img); // Gain access to the image
    /**************************************** 
    * Pick parts of the image to create an animation
    * It seems Width:15,Height:24 may be perfect for almost all human sprites
    ****************************************/
    sp.addImage(0,0,15,24); // Moving Down Right Foot - 0
    sp.addImage(17,0,15,24); // Moving Down Left Foot - 1
    sp.addImage(32,0,15,24); // Moving Up - 2
    sp.addImage(48,0,15,24); // Left Idle - 3
    sp.addImage(64,0,15,24); // Left Moving - 4
    // sp.addImage(64,0,15,24); // Diagonal Up Idle - 5
    // sp.addImage(64,0,15,24); // Diagonal Up Moving - 6
    // sp.addImage(64,0,15,24); // Diagonal Down Idle - 7
    // sp.addImage(64,0,15,24); // Diagonal Down Moving - 8
    // May not include 4 through 8.

    //sp.addAnimation("walk",[1]);
    //sp.animate("walk"); //They start walking on their own if this is on.
    // I want it to walk IF a button is pressed. Go to spritelib.js to fix.

    game.addSprite(sp);

    // game.addSprite(sp2);
    //----
    var back = new Background(0,0,800,600);
    game.setBackground(back);
    //----
    //var pimg = document.getElementById("mainPlayer");
    var player = game.getPlayer();
    // Get image for player 
    // Pick 2 images to swap between
    //sp = new Sprite(250, 450, 40, 55);
    //sp.imageBase(pimg);
    //sp.addImage(0, 0, 15, 22);
    //sp.addImage(291, 159, 15, 20);
    /////////////////////////////////////
    
    player.setSprite(sp);
    player.setPos(375,130);
    
    game.start(0.1);
}