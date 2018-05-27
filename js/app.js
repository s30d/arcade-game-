/*jshint esversion: 6 */

'use strict';

// Global variable declaration
const allEnemies = [];
let hero;

//Superclass from which Enemy and Player inherit
class Player {
  constructor(x, sprite) {
    this.x = x;
    this.sprite = sprite;
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our hero must avoid
class Enemy extends Player {
  constructor(x, sprite) {
    super(x, sprite);
    this.y = this.setY();
    this.speed = this.setSpeed(150);
    // The image/sprite for our enemies, this uses
    // A helper we've provided to easily load images
  }
  // Place enemy objects randomly on one of the three pavements
  setY() {
    const tempArr = [60, 145, 230];
    return tempArr[Math.floor(Math.random() * 3)];
  }
  // Randomly set how fast an enemy object moves
  setSpeed(level) {

    /*document.levels.onclick = function(){
    var radVal = document.levels.rads.value;
  level = radVal ;
}
this.speed = level;*/
this.speed = level;
    return level + Math.floor(Math.random() * 110);
  }

  update(dt) {
    let e = document.getElementById('easy');
    let m = document.getElementById('medium');
    let d = document.getElementById('difficult');
    if (this.x < 505 ) {

      if(e.checked){
        this.speed = this.setSpeed(e.value);
      }
      if(m.checked){
        this.speed = this.setSpeed(m.value);
      }
      if(d.checked){
        this.speed = this.setSpeed(d.value);
      }
      this.x += this.speed * dt;

    } else {
      this.x = -100;
      this.y = this.setY();

        if(e.checked){
          this.speed = this.setSpeed(e.value);
        }
        if(m.checked){
          this.speed = this.setSpeed(m.value);
        }
        if(d.checked){
          this.speed = this.setSpeed(d.value);
}


    }
  }
}

// Hero Class
class Hero extends Player {
  constructor(x, y, sprite) {
    super(x, sprite);
    this.y = y;
    this.score = 0;
    this.reset = () => {
      this.x = 200;
      this.y = 400;
    };
  }

  update(x=0, y=0) {
    if (this.y <= -25) {
      this.reset();
      this.score += 1;

      this.updateScore();
    } else {
      this.x += x;
      this.y += y;
    }
  }
  // Update the score on the screen each time the hero wins
  updateScore() {
    let score = document.querySelector('#score');
    score.textContent = this.score;
  }

  handleInput(dir){
    // Make sure hero can't move off screen
    switch(dir) {
      case 'left':
      if (this.x > 0)
        this.update(-100, 0);
      break;
      case 'right':
      if (this.x < 400)
        this.update(100, 0);
      break;
      case 'up':
      if (this.y > -25)
        this.update(0, -85);
      break;
      case 'down':
      if (this.y < 400)
        this.update(0, 85);
      break;
    }
  }
}

// Instantiate our objects
for (let i = 0; i < 4; i++) {
  allEnemies.push(new Enemy(0, 'images/enemy-bug.png'));
}

hero = new Hero(200, 400, 'images/char-boy.png');


// This listens for key presses and sends the keys to your
// Hero.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  hero.handleInput(allowedKeys[e.keyCode]);
});
