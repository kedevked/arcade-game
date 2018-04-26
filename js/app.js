// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = Math.round(Math.random() * 3) +1;

    setTimeout(()=> {
        this.x = -50;
        this.y = [66, 149, 232][Math.round(Math.random() * 2)];
    }, this.speed * 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = (this.x + dt * this.speed * 150) % (500)
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    //change the speed
    this.speed = Math.round(Math.random() * 3) +1;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * 101;
    this.y = 5 * 80;
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function(move) {
    var xMove = 101;
    var yMove = 83;
     if(move === 'left') {
        this.x -= this.x >= xMove ? xMove : 0;
     }
     if(move === 'right') {
         this.x += this.x < 4 * xMove ? 101 : 0;
     }
     if(move === 'down') {
         this.y += this.y < 5 * 80 ? yMove : 0;
     }
     if(move === 'up') {
         if(this.y >= yMove ) {
            this.y -= yMove
         }else{
            //player won
            document.querySelector('.wrap-hide').classList.remove('wrap-hide');
            player.reset();
            document.querySelector('canvas').style.display = 'none';
         }
     }

}

Player.prototype.reset = function() {
    console.log('reset')
    this.x = 2 * 101;
    this.y = 5 * 80;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []
//two enemies
for(var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
    setInterval(()=> {
        if(allEnemies[0].x > 450){
            allEnemies[allEnemies.length] = new Enemy();
            allEnemies.splice(0, 1);
        }
        
    }, 200)
}

var player = new Player()


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.querySelector('.button-restart').addEventListener('click', function() {
    document.querySelector('.wrap').classList.add('wrap-hide');
    document.querySelector('canvas').style.display = '';
})
