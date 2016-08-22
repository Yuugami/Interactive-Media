/* 
 * A simple test script for spritelib
 */

var game;
var rocket;
var diff = 0; // Difficulty Level
var points = 0; 
var pointsPerKill = 0;
var enemies = 1;
var currentRound = 40; 
var specialRound = 5; 
var FinalRound = 50; 
var mobSpeed = -50; 

// Special Monster Chances
var juggernaut = 30;
var crawler = 20;
var specialist = 15;
var queen = 5;

function init() 
{
    /*
    * Get Canvas
    * Place the Game inside the Canvas
    */
    chooseDifficulty();
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
    sp.addImage(70,0,64,40);
    sp.addAnimation("walk",[0,1]);
    sp.animate("walk");
    sp.setVelocity(mobSpeed,0);
    sp.setRocket(false);

    sp.collideB = function(r) 
    {
        this.enemyDistance += 50;
        this.flipx();
        // A flagx of 1 means it's going to the right. 
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
        if (!this.juggernaut || !this.queen)
        {
            game.removeSprite(this);
            game.removeSprite(rocket);
            liveRocket = false;
            sp.setRocket(this.liveRocket);
            points += pointsPerKill;
            document.getElementById("score").innerHTML = points;
            enemies -= 1;
            if (enemies === 0)
            {
                nextRound();
            }
        }
    };

    game.addSprite(sp);
    //----
    var back = new Background(0,0,800,600);
    game.setBackground(back);
    //----
    var pimg = document.getElementById("player");
    var player = game.getPlayer();
    // Get image for player 
    // Pick 2 images to swap between
    sp = new Sprite(250, 450, 50, 50);
    sp.imageBase(pimg);
    sp.addImage(274, 159, 15, 20);
    sp.addImage(291, 159, 15, 20);
    sp.addAnimation("walk",[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]);
    sp.animate("walk");
    game.addSprite(sp);
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
        sp.setRocket(this.liveRocket);
    };
    player.fire = function()
    {
        rocket.setPos(player.x+15,player.y-50);
        rocket.setVelocity(0,-325);
        game.addSprite(rocket);
        this.liveRocket = true;
        sp.setRocket(this.liveRocket);
    };
    // Don't let the player move out of the canvas.
    sp.collideB = function(r)
    {
        if (player.x < 375)
            player.setPos(0, 550);
        else
            player.setPos(750, 550);
    }
    
    if (diff == 5)
        document.getElementById('finaldiff').play();
    else
        document.getElementById('bgmusic').play();

    game.start(0.1);
}

function stopGame() {
    game.stop();

    if (diff == 5)
        document.getElementById('finaldiff').pause();
    else
        document.getElementById('bgmusic').pause();

    if (gameOver)
    {
        document.getElementById('gameover').play();
    }

    if (gameWon)
    {
        if (diff == 5)
            document.getElementById('victoryH').play();
        else
            document.getElementById('victory').play();
    }
}

function startGame() {

    if (!gameOver && !gameWon)
    {
        if (diff == 5)
            document.getElementById('finaldiff').play();
        else
            document.getElementById('bgmusic').play();

        game.start(0.1);
    }
}

function newRound()
{
    for (var i = 0; i < currentRound; i++)
    {
        var xloc = Math.floor((Math.random() * 750));
        var specialMobSpawn = Math.floor((Math.random() * 100));
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
        if (currentRound > 5)
        {
            if (queen > specialMobSpawn && currentRound > 20)
            {
                sp.setPos(xloc, 0);
                img = document.getElementById("player");
                sp.imageBase(img);
                sp.addImage(26, 0, 49, 40)
                sp.addImage(82, 0, 56, 40)
                sp.addAnimation("walk",[0,0,0,0,1,1,1,1]);
                sp.animate("walk");
                sp.setVelocity(mobSpeed,0);
                sp.queen = true;
            }
            else if (specialist > specialMobSpawn && currentRound > 15)
            {
                sp.addImage(144,47,53,33);
                sp.addImage(213,47,53,33);
                sp.addAnimation("walk",[0,0,1,0,1,0,0,]);
                sp.animate("walk");
                sp.setVelocity(mobSpeed+5,0);
                sp.specialist = true;
            }
            else if (crawler > specialMobSpawn && currentRound > 10)
            {
                sp.addImage(8,48,57,35);
                sp.addImage(76,45,57,37);
                sp.addAnimation("walk",[0,1]);
                sp.animate("walk");
                sp.setVelocity(mobSpeed-20,0);
            }
            else if (juggernaut > specialMobSpawn)
            {
                sp.addImage(138,0,66,42);
                sp.addImage(206,0,66,42);
                sp.addAnimation("walk",[0,0,0,1,1,1]);
                sp.animate("walk");
                sp.setVelocity(mobSpeed+15,0);
                sp.juggernaut = true;
            }
            else
            {
                sp.addImage(5,0,58,40);
                sp.addImage(70,0,64,40);
                sp.addAnimation("walk",[0,1]);
                sp.animate("walk");
                sp.setVelocity(mobSpeed,0);
            }
        }
        else
        {
            sp.addImage(5,0,58,40);
            sp.addImage(70,0,64,40);
            sp.addAnimation("walk",[0,1]);
            sp.animate("walk");
            sp.setVelocity(mobSpeed,0);
        }

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
            // If the missile collides with a unit that isn't the
            // Juggernaut or Queen, kill normally
            if (!this.juggernaut && !this.queen)
            {
                this.aUnitDied(true);
                game.removeSprite(this);
                game.removeSprite(rocket);
                liveRocket = false;
                sp.setRocket(this.liveRocket);
                points += pointsPerKill;
                document.getElementById("score").innerHTML = points;
                enemies -= 1;
                if (enemies === 0)
                {
                    nextRound();
                }
            }
            // Otherwise, detect which unit it is and deduct HP accordingly.
            // Killing it when HP reaches 0.
            else
            {
                if(this.juggernaut)
                {
                    this.juggernautHP -= 1;
                    game.removeSprite(rocket);
                    liveRocket = false;
                    sp.setRocket(this.liveRocket);
                }

                if(this.juggernautHP == 0)
                {
                    this.aUnitDied(true);
                    game.removeSprite(this);
                    game.removeSprite(rocket);
                    liveRocket = false;
                    sp.setRocket(this.liveRocket);
                    points += pointsPerKill;
                    document.getElementById("score").innerHTML = points;
                    enemies -= 1;
                    if (enemies === 0)
                    {
                        nextRound();
                    }
                }

                if(this.queen)
                {
                    this.queenHP -= 1;
                    game.removeSprite(rocket);
                    liveRocket = false;
                    sp.setRocket(this.liveRocket);
                }

                if(this.queenHP == 0)
                {
                    game.removeSprite(this);
                    game.removeSprite(rocket);
                    liveRocket = false;
                    sp.setRocket(this.liveRocket);
                    points += pointsPerKill;
                    document.getElementById("score").innerHTML = points;
                    enemies -= 1;
                    if (enemies === 0)
                    {
                        nextRound();
                    }
                }

            }
        };

    game.addSprite(sp);
    }

    if (diff == 5)
    {
        specialRound = 5;
        for(var i = 0; i < currentRound; i++)
        {
            addMonster(distDict(i, specialRound));

            if ((i+1)%5==0)
            {
                specialRound = (i+1);
            }
        }
    }
}