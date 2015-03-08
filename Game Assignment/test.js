/* 
 * A simple test script for spritelib
 */

var game;
var rocket;
var points = 0; // Used
var enemies = 1; // Used
var currentRound = 1; // Used
var specialRound = 5; // Used
var FinalRound = 50; // Used
var mobSpeed = -50;//(prompt("Choose monster speed. (Number between 1 and 100"));// Used

function init() 
{
    /*
    * Get Canvas
    * Place the Game inside the Canvas
    */
    var canvas = document.getElementById("myCanvas");
    game = new Game(canvas); 

    /*
    * Create the sprites for enemies
    * Multiply the amount of objects created.
    */
    var sp = new Sprite(375,0,45,50);
    var img = document.getElementById("sprites"); // Get the image
    sp.imageBase(img); // Access to the image
    sp.addImage(5,0,58,40); // Pick parts of it.
    sp.addImage(70,0,58,40);
    sp.addAnimation("walk",[0,1]);
    sp.animate("walk");
    sp.setVelocity(mobSpeed,0);
    sp.setRocket(false);

    sp.collideB = function(r) 
    {
        this.enemyDistance += 50;
        //console.log("Enemy Flag = " + this.flagx + ". Distance is = " +this.enemyDistance);
        this.flipx();
        //console.log("After flip...");
        // A flagx of 1 means it's going to the right. 
        //console.log("Enemy Flag = " + this.flagx + ". Distance is = " +this.enemyDistance);
        //console.log("--------------");

        if (this.flagx === 1)
        {
            this.setPos(0, this.enemyDistance);
        }
        else
        {
            this.setPos(750, this.enemyDistance);
        }

        this.setVelocity(-this.dx,this.dy);
    };

    sp.collide = function() 
    {
        game.removeSprite(this);
        game.removeSprite(rocket);
        this.liveRocket = false;
        //console.log("Live rocket is " + this.liveRocket);
        sp.setRocket(this.liveRocket);
        points += 50;
        document.getElementById("score").innerHTML = points;
        enemies -= 1;
        if (enemies === 0)
        {
            if (currentRound < FinalRound)
            {
                currentRound++;
                document.getElementById("round").innerHTML = currentRound;
                enemies = currentRound;
                newRound();
            }
        }
    };

    game.addSprite(sp);
    // game.addSprite(sp2);

    var back = new Background(0,0,800,600);
    game.setBackground(back);
    var pimg = document.getElementById("player");
    var player = game.getPlayer();
    // Get image for player 
    // Pick 2 images to swap between
    sp = new Sprite(250, 450, 50, 50);
    sp.imageBase(pimg);
    sp.addImage(274, 159, 15, 20);
    //sp.addImage(291, 159, 15, 20);
    /////////////////////////////////////
    player.setSprite(sp);
    player.setPos(375,550);

    rocket = new Sprite(250,250,25,25);
    rocket.imageBase(pimg);
    rocket.addImage(18,117,18,20);


    rocket.collideB = function(r) 
    {
        game.removeSprite(this);
        this.liveRocket = false;
        //console.log("Live rocket is " + this.liveRocket);
        sp.setRocket(this.liveRocket);
    };
    player.fire = function()
    {
        rocket.setPos(player.x+15,player.y-50);
        rocket.setVelocity(0,-300);
        game.addSprite(rocket);
        this.liveRocket = true;
        //console.log("Live rocket is " + this.liveRocket);
        sp.setRocket(this.liveRocket);
    };
    
    game.start(0.1);
}

function stopGame() {
    game.stop();
}

function startGame() {
    game.start(0.1);
}

function newRound()
{
    for (var i = 0; i < currentRound; i++)
    {
        var xloc = Math.floor((Math.random() * 750));
        /*
        * Every 5 rounds, monsters will start to spawn 50 pixels closer
        *
        * A check is made every round to see if the next round is divisible
        * by 5. If so, it is a special round.
        *
        * Special rounds spawns certain monsters 50 pixels closer to the player
        */

        var sp = new Sprite(xloc,distDict(i, specialRound),45,50);
        sp.enemyDistance = distDict(i, specialRound);
        //console.log("Monster " + i + " is at " + sp.enemyDistance);
        if ((i+1)%5==0)
        {
            specialRound = (i+1);
        }

        var img = document.getElementById("sprites"); // Get the image
        sp.imageBase(img); // Access to the image
        sp.addImage(5,0,58,40); // Pick parts of it.
        sp.addImage(70,0,58,40);
        sp.addAnimation("walk",[0,1]);
        sp.animate("walk");
        sp.setVelocity(mobSpeed,0);

        sp.collideB = function(r) 
        {
            this.enemyDistance += 50;
            this.flipx();

            if (this.flagx === 1)
            {
                this.setPos(0, this.enemyDistance);
            }
            else
            {
                this.setPos(750, this.enemyDistance);
            }

            this.setVelocity(-this.dx,this.dy);
        };

        sp.collide = function() 
        {
            game.removeSprite(this);
            game.removeSprite(rocket);
            liveRocket = false;
            sp.setRocket(this.liveRocket);
            points += 50;
            document.getElementById("score").innerHTML = points;
            enemies -= 1;
            if (enemies === 0)
            {
                if (currentRound < FinalRound)
                {
                    currentRound++;
                    document.getElementById("round").innerHTML = currentRound;
                    enemies = currentRound;
                    newRound();
                }
            }
        };

    game.addSprite(sp);
    }
}

function distDict(currRound, spRound)
{
    //console.log("Current Round : " + (currRound+1));
    //console.log("Special Round : " + spRound); 
    if (currRound >= spRound)
    {
        if (currRound < spRound+5)
        {
            return (specialRound * 10);
        }
    }
    else
    {
        return 0;
    }
}