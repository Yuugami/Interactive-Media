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

function isNumber(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function chooseDifficulty()
{
    for(; diff < 1 || diff > 5;)
    {
        var areYouSure = true;
        diff = prompt("Choose a difficulty: \n1 - Easy\n2 - Medium\n3 - Hard\n4 - Nightmare\n5 - Hell");
        if (!isNumber(diff))
            diff = 0;

        switch(diff)
        {
            case "1":
                mobSpeed = -20;
                pointsPerKill = 25;
                break;
            case "3":
                mobSpeed = -75;
                pointsPerKill = 100;
                break;
            case "4":
                mobSpeed = -100;
                pointsPerKill = 200;
                break;
            case "5":
                areYouSure = confirm("Are you SURE that you want to play this mode? This requires intense speed and timing.");
                if (areYouSure)
                {
                    mobSpeed = -100;
                    pointsPerKill = 500;
                    alert("You were warned. Good luck.");
                }
                else
                    areYouSure = false;
                break;
        }

        if (!areYouSure)
            diff = 0;
    }
}

function nextRound()
{
    if (currentRound < FinalRound)
    {
        currentRound++;
        document.getElementById("round").innerHTML = currentRound;
        enemies = currentRound;
        newRound();
    }
    else
    {
        gameWon = true;
        stopGame();
    }
}

function addMonster(i)
{
    var xloc = Math.floor((Math.random() * 750));
    var sp = new Sprite(xloc,i,45,50);
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
        if (!this.juggernaut || !this.queen)
        {
        //     this.juggernautHP--;
        // if (this.juggernautHP == 0)
        //     game.removeSprite(this);

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

    enemies++;
    game.addSprite(sp);
}