/* 
 * This is the spritelib source file.
 */
constants = {
    TOPHIT: 1,
    BOTTOMHIT: 2,
    LEFTHIT: 3,
    RIGHTHIT: 4    
}

var liveRocketLib = false;
var unitKilled = false;
var gameOver = false;
var gameWon = false;

/*
 * Rectangle Object
 */
function Rect(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype = {
    setSize: function(width,height) {
        this.width = width;
        this.height = height;
    },
    setPos: function(x,y) {
        this.x = x;
        this.y = y;
    },
    inside: function(x,y) {
        if((x > this.x) && (x < this.x+this.width))
            if((y > this.y) && (y < this.y+this.height))
                return(true);
        return(false);
    },
    backHit: function(r) {
        if(this.x < r.x)
            return constants.LEFTHIT;
        if(this.x+this.width > r.x+r.width)
            return constants.RIGHTHIT;
        if(this.y < r.y)
            return constants.TOPHIT;
        if(this.y+this.height > r.y+r.height)
            return constants.BOTTOMHIT;
        return(0);
    },
    overlap: function(r) {
    }
};

/*
 * Sprite Object
 */
function Sprite(x, y, width, height) {
    this.rect = new Rect(x,y,width,height);
    this.images = [];
    this.animations = [];
    this.current = 0;
    this.dx = 0;
    this.dy = 0;
    this.animation = [this.current];
    this.index = 0;
    this.flagx = 0;
    this.flagy = 0;

    this.enemyDistance = 0;
    this.liveRocket = false;

    this.juggernaut = false;
    this.juggernautHP = 3;

    this.specialist = false;

    this.queen = false;
    this.queenHP = 5;
}

Sprite.prototype = {
    imageBase: function(image) {
        this.base = image;
    },
    addImage: function(x, y, width, height) {
        var rect = new Rect(x,y,width,height);
        this.images.push(rect);
    },
    addAnimation: function(name, seq) {
        this.animations[name] = seq;
    },
    animate: function(name) {
        this.animation = this.animations[name];
        this.current = 1;
    },
    flipx: function() {
        if(this.flagx)
            this.flagx = 0;
        else
            this.flagx = 1;
    },
    flipy: function() {
        if(this.flagy)
            this.flagy = 0;
        else
            this.flagy = 1;
    },
    draw: function(ctx) {
        var r = this.images[this.current];
        var r2 = this.rect;
        if(this.flagx || this.flagy) {
            ctx.save();
            ctx.translate((r2.x+r2.width/2),(r2.y+r2.height/2));
            if(this.flagx)
                ctx.scale(-1,1);
            if(this.flagy)
                ctx.scale(1,-1);
          ctx.translate(-(r2.x+r2.width/2),-(r2.y+r2.height/2));
        }
        ctx.drawImage(this.base,r.x,r.y,r.width,r.height,r2.x,r2.y,r2.width,r2.height);
        if(this.flagx || this.flagy) {
            ctx.restore();
        }
    },
    move: function(dt) {
        var x = this.rect.x;
        var y = this.rect.y;
        this.rect.setPos(x+this.dx*dt, y+this.dy*dt);

        //console.log(this.enemyDistance);
        if (this.enemyDistance >= 500)
        {
            gameOver = true;
            stopGame();
        }

        if (this.specialist)
        {
            var jump = Math.floor((Math.random() * 100));
            if (1 > jump)
            {
                this.enemyDistance += 50;
                this.setPos(this.rect.x, this.enemyDistance);
            }
            var juke = Math.floor((Math.random() * 50));
            if (1 > juke)
            {
                this.flipx();
                this.setVelocity(-this.dx,this.dy);
            }
        }

        if (this.queen)
        {
            var speedBurst = Math.floor((Math.random() * 200));
            if (1 > speedBurst)
            {
                this.setVelocity(this.dx-5, 0)
            }

            if (unitKilled)
            {
                if (1 > speedBurst)
                {
                    console.log("Queen: How DARE you!!");
                    this.setVelocity(this.dx-10, 0);
                }

                this.aUnitDied(false);
            }

            var jump = Math.floor((Math.random() * 150));
            if (1 > jump)
            {
                this.enemyDistance += 50;
                this.setPos(this.rect.x, this.enemyDistance);
            }
        }
    },
    setPos: function(x,y) {
        this.rect.setPos(x,y);
    },
    setSize: function(width, height)
    {
        this.rect.setSize(width, height);
    },
    setVelocity: function(vx, vy) {
        this.dx = vx;
        this.dy = vy;
    },
    hit: function(sp) {
        return(this.rect.inside(sp.rect.x,sp.rect.y));
    },
    hitB: function(r) {
        return(this.rect.backHit(r));
    },
    step: function() {
        this.index = this.index+1;
        if(this.index >= this.animation.length)
            this.index = 0;
        this.current = this.animation[this.index];
    },
    setRocket: function(rocketState)
    {
        liveRocketLib = rocketState;
    },
    aUnitDied: function(deadUnit)
    {
        unitKilled = deadUnit;
    }
}

/*
 * Background Object
 */
function Background(x, y, width, height) {
    this.screenRect = new Rect(x,y,width,height);
    this.backRect = new Rect(x,y,width,height);
    this.image = null;
}

Background.prototype = {
    setImage: function(image) {
        this.image = image;
    },
    scroll: function(dx,dy) {
        this.backRect.setPos(this.backRect.x+dx,this.backRect.y+dy);
    },
    draw: function(ctx) 
    {
        ctx.fillStyle = "#000000";

        if(gameWon)
            ctx.fillRect(0,232,800,100);
        else if(!gameOver)
            ctx.fillRect(0,500,800,50);
        else
            ctx.fillRect(0,232,800,100)

        ctx.font = "50px Arial";
        ctx.fillStyle = "red";

        if (gameWon)
        {
            ctx.fillStyle = "green";

            if (diff == 5)
                ctx.fillText("Uh-- oh wow. Congratulations! O_O", 5, 300);
            else
                ctx.fillText("Y  O  U   W  I  N", 230, 300);
        }
        else if (!gameOver)
            ctx.fillText("D  A  N  G  E  R   Z  O  N  E", 90, 543);
        else
            ctx.fillText("Y  O  U   L  O  S  E", 185, 300);

        // Laser Beams?
        // if (diff == 1)
        // {
        //     console.log(player.dx);
        //     ctx.moveTo(this.x, 550);
        //     ctx.lineTo(200, 0);
        //     ctx.stroke();
        // }
        var r1 = this.backRect;
        var r2 = this.screenRect;
        if(this.image != null)
            ctx.drawImage(this.image,r1.x, r1.y, r1.width, r1.height, r2.x, r2.y, r2.width, r2.height);
    }
}

var __nativeST__ = window.setTimeout, __nativeSI__ = window.setInterval;

window.setTimeout = function (oThis, vCallback, nDelay ) {
    aArgs = Array.prototype.slice.call(arguments, 2);  
    return __nativeST__(vCallback instanceof Function ? function () {   
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};  

window.setInterval = function (oThis, vCallback, nDelay ) {
    aArgs = Array.prototype.slice.call(arguments, 2);
    return __nativeSI__(vCallback instanceof Function ? function () {
        vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
};

/*
 * Game object.
 */
function Game(canvas) {
    this.sprites = [];
    this.background = null;
    this.player = new Player(canvas);
    this.running = 0;
    this.dt = 0.1;
    this.canvas = canvas;
}

Game.prototype = {
    addSprite: function(sp) {
        this.sprites.push(sp);
    },
    removeSprite: function(sp) {
        var i = this.sprites.indexOf(sp);
        if(i >= 0)
            this.sprites.splice(i,1);
    },
    setBackground: function(back) {
        this.background = back;
    },
    getPlayer: function(player) {
        return(this.player);
    },
    start: function(dt) {
        this.running = 1;
        this.dt = dt;
        this.loop();
    },
    stop: function() {
        this.running = 0;
    },
    loop: function() {
        var r;
        var i,j;
        var len = this.sprites.length;
        for(i=0; i<len; i++) {
            this.sprites[i].move(this.dt);
            this.sprites[i].step();
        }
        if(this.background) 
        {
             for(i=0; i<len; i++) 
             {
                 r=this.sprites[i].hitB(this.background.backRect);
                 if((r > 0) && (this.sprites[i].collideB)) 
                 {
                     this.sprites[i].collideB(r);
                     len = this.sprites.length;
                 }
             }
        }
        cancelLoop: for(i=0; i<len; i++) {
            if(this.sprites[i].collide) {
                for(j=0; j<len; j++) {
                    if((i!=j) && this.sprites[i].hit(this.sprites[j])) {
                        this.sprites[i].collide();
                        break cancelLoop;
                    }
                }
            }
        }
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        if(this.background)
            this.background.draw(ctx);
        len = this.sprites.length;
        for(i=0; i<len; i++) {
            this.sprites[i].draw(ctx);
        }
        this.player.draw(ctx);
        if(this.running)
//            setTimeout(this.loop.bind(this),this.dt*1000);
        setTimeout(this, this.loop, this.dt*1000);
    }
 
}

function Player(canvas) {
    this.canvas = canvas;
    this.x = canvas.width/2;
    this.y = canvas.height-100;
    this.sprite = null;
    this.dx = 10;
    this.dy = 10;
    var blist = document.getElementsByTagName("body");
    blist[0].addEventListener("keydown",PlayerKey.bind(this),true);
    canvas.focus();
}

function PlayerKey(event) {
    var leftArrow = 37;
    var rightArrow = 39;
    var downArrow = 40;
    var upArrow = 38;
    var spaceBar = 32;
    
    if(event.keyCode == leftArrow) 
    {
        this.setPos(this.x-this.dx, this.y);
    }
    else if(event.keyCode == rightArrow) 
    {
        this.setPos(this.x+this.dx, this.y);
    } 
    else if(event.keyCode == spaceBar && liveRocketLib == false) 
    {
        if(this.fire)
        {
            this.fire();
        }
    }
    event.stopPropagation();
}

Player.prototype = {
    setPos: function (x, y) {
        this.x = x;
        this.y = y;
        if(this.sprite)
            this.sprite.setPos(this.x, this.y);
    },
    setSprite: function(sp) {
        this.sprite = sp;
    },
    draw: function(ctx) {
        if(this.sprite)
            this.sprite.draw(ctx);
    }
}
