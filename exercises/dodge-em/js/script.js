/**
Dodge 'em
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let smile = undefined;
let kiss = undefined;
let laughingCrying = undefined;
let heartEyes = undefined;
let tongueOut = undefined;
let wink = undefined;
let sleepy = undefined;

let bg = {
  r: 50,
  g: 50,
  b: 50,
  a: 100,
};

//Objects for the enemies.
let enemy1 = {
  x: 0,
  y: undefined,
  size: 200,
  sizeRect: 50,
  vx: 0,
  vy: 0,
  speedx: 4.3,
  speedy: 1,
  color: {
    r: 200,
    g: 100,
    b: 150,
    a: 200,
  },
};

let enemy2 = {
  x: 0,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  speedx: 1,
  speedy: 4,
  color: {
    r: 200,
    g: 100,
    b: 150,
    a: 200,
  },
};

let enemy3 = {
  x: 0,
  y: undefined,
  size: 200,
  vx: 0,
  vy: 0,
  speedx: -3,
  speedy: 1,
  color: {
    r: 200,
    g: 100,
    b: 150,
    a: 200,
  },
};

//Object for the user "me".
let me = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  maxSpeed: 3,
  acceleration: 0.1,
  color: {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  },
  rotate: 0.005,
  angle: 0.0,
  image: undefined,
};

/**
Description of preload
*/
function preload() {
  smile = loadImage(`assets/images/mouth-open-emoji.png`);
  kiss = loadImage(`assets/images/kiss-emoji.png`);
  laughingCrying = loadImage(`assets/images/emoji-laughing-crying.png`);
  heartEyes = loadImage(`assets/images/heart-eyes.png`);
  tongueOut = loadImage(`assets/images/tongue-out.png`);
  wink = loadImage(`assets/images/wink.png`);
  sleepy = loadImage(`assets/images/sleepy.png`);

  me.image = smile;
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //Setup for the coordinates and speed of the enemies at the beginning of the program.
  // +/-enemy.size/2 serves to make sure that the enemy does not appear partially out of the canvas.
  enemy1.x = width - (enemy1.size / 2 + 1); //+1 to make sure it doesn't stick to the side.
  enemy1.y = random(0 + enemy1.size / 2 + 1, height - enemy1.size / 2 - 1);
  enemy1.speedy = random(1, 4);

  enemy2.x = enemy2.size / 2;
  enemy2.y = random(0 + enemy2.size / 2 + 1, height - enemy2.size / 2 - 1);
  enemy2.speedx = random(1, 4);

  enemy3.x = random(0 + enemy3.size / 2 + 1, width - enemy3.size / 2 - 1);
  enemy3.y = enemy3.size / 2;
  enemy3.speedy = random(1, 4);

  //Setup for the position of the user at the beginning.
  imageMode(CENTER);
  rectMode(CENTER);
  me.x = width / 2;
  me.y = height / 2;
}

/**
Description of draw()
*/
function draw() {
  background(bg.r, bg.g, bg.b, bg.a);

  //Create 3 enemies
  // Enemy 1
  noStroke();
  fill(enemy1.color.r, enemy1.color.g, enemy1.color.b, enemy1.color.a);
  //Setting the trajectory of enemy 1.
  enemy1.vx = enemy1.speedx;
  enemy1.vy = enemy1.speedy;
  enemy1.x += enemy1.vx;
  enemy1.y += enemy1.vy;
  ellipse(enemy1.x, enemy1.y, enemy1.size);
  // Make the enemy change direction when touching the sides of the canvas.
  if (enemy1.x > width - enemy1.size / 2 || enemy1.x < 0 + enemy1.size / 2) {
    enemy1.speedx = -enemy1.speedx;
  }
  if (enemy1.y > height - enemy1.size / 2 || enemy1.y < 0 + enemy1.size / 2) {
    enemy1.speedy = -enemy1.speedy;
  }

  // Enemy 2
  fill(enemy2.color.r, enemy2.color.g, enemy2.color.b, enemy2.color.a);
  //Setting the trajectory of enemy 1.
  enemy2.vx = enemy2.speedx;
  enemy2.vy = enemy2.speedy;
  enemy2.x += enemy2.vx;
  enemy2.y += enemy2.vy;
  ellipse(enemy2.x, enemy2.y, enemy2.size);
  // Make the enemy change direction when touching the sides of the canvas.
  if (enemy2.x > width - enemy2.size / 2 || enemy2.x < 0 + enemy2.size / 2) {
    enemy2.speedx = -enemy2.speedx;
  }
  if (enemy2.y > height - enemy2.size / 2 || enemy2.y < 0 + enemy2.size / 2) {
    enemy2.speedy = -enemy2.speedy;
  }

  // Enemy 3
  fill(enemy3.color.r, enemy3.color.g, enemy3.color.b, enemy3.color.a);
  //Setting the trajectory of enemy 1.
  enemy3.vx = enemy3.speedx;
  enemy3.vy = enemy3.speedy;
  enemy3.x += enemy3.vx;
  enemy3.y += enemy3.vy;
  ellipse(enemy3.x, enemy3.y, enemy3.size);
  // Make the enemy change direction when touching the sides of the canvas.
  if (enemy3.x > width - enemy3.size / 2 || enemy3.x < 0 + enemy3.size / 2) {
    enemy3.speedx = -enemy3.speedx;
  }
  if (enemy3.y > height - enemy3.size / 2 || enemy3.y < 0 + enemy3.size / 2) {
    enemy3.speedy = -enemy3.speedy;
  }

  //Make the enemies change direction when they collide together.
  //Collision between enemies 1 and 2.
  let dEnemy1 = dist(enemy1.x, enemy1.y, enemy2.x, enemy2.y);
  if (dEnemy1 < enemy1.size / 2 + enemy2.size / 2) {
    enemy1.speedx = -enemy1.speedx;
    enemy1.speedy = -enemy1.speedy;
    enemy2.speedx = -enemy2.speedx;
    enemy2.speedy = -enemy2.speedy;
    //If when the enemies collide, one is already against the border of the canvas, it won't go outside (because of the -enemy.speed).
    if (
      enemy1.x - enemy1.size / 2 === 0 ||
      enemy1.x + enemy1.size / 2 === width ||
      enemy1.y - enemy1.size / 2 === 0 ||
      enemy1.y + enemy1.size / 2 === height ||
      enemy2.x - enemy2.size / 2 === 0 ||
      enemy2.x + enemy2.size / 2 === width ||
      enemy2.y - enemy2.size / 2 === 0 ||
      enemy2.y + enemy2.size / 2 === height
    ) {
      enemy1.speedx = enemy1.speedx;
      enemy1.speedy = enemy1.speedy;
      enemy2.speedx = enemy2.speedx;
      enemy2.speedy = enemy2.speedy;
    }
  }

  //Collision between enemies 1 and 3.
  let dEnemy2 = dist(enemy1.x, enemy1.y, enemy3.x, enemy3.y);
  if (dEnemy2 < enemy1.size / 2 + enemy3.size / 2) {
    enemy1.speedx = -enemy1.speedx;
    enemy1.speedy = -enemy1.speedy;
    enemy3.speedx = -enemy3.speedx;
    enemy3.speedy = -enemy3.speedy;
    //If when the enemies collide, one is already against the border of the canvas, it won't go outside (because of the -enemy.speed).
    if (
      enemy1.x - enemy1.size / 2 === 0 ||
      enemy1.x + enemy1.size / 2 === width ||
      enemy1.y - enemy1.size / 2 === 0 ||
      enemy1.y + enemy1.size / 2 === height ||
      enemy3.x - enemy3.size / 2 === 0 ||
      enemy3.x + enemy3.size / 2 === width ||
      enemy3.y - enemy3.size / 2 === 0 ||
      enemy3.y + enemy3.size / 2 === height
    ) {
      enemy1.speedx = enemy1.speedx;
      enemy1.speedy = enemy1.speedy;
      enemy3.speedx = enemy3.speedx;
      enemy3.speedy = enemy3.speedy;
    }
  }

  //Collision between enemies 2 and 3.
  let dEnemy3 = dist(enemy2.x, enemy2.y, enemy3.x, enemy3.y);
  if (dEnemy3 < enemy2.size / 2 + enemy3.size / 2) {
    enemy2.speedx = -enemy2.speedx;
    enemy2.speedy = -enemy2.speedy;
    enemy3.speedx = -enemy3.speedx;
    enemy3.speedy = -enemy3.speedy;
    //If when the enemies collide, one is already against the border of the canvas, it won't go outside (because of the -enemy.speed).
    if (
      enemy2.x - enemy2.size / 2 === 0 ||
      enemy2.x + enemy2.size / 2 === width ||
      enemy2.y - enemy2.size / 2 === 0 ||
      enemy2.y + enemy2.size / 2 === height ||
      enemy3.x - enemy3.size / 2 === 0 ||
      enemy3.x + enemy3.size / 2 === width ||
      enemy3.y - enemy3.size / 2 === 0 ||
      enemy3.y + enemy3.size / 2 === height
    ) {
      enemy2.speedx = enemy2.speedx;
      enemy2.speedy = enemy2.speedy;
      enemy3.speedx = enemy3.speedx;
      enemy3.speedy = enemy3.speedy;
    }
  }

  //Create "me" and its movements.
  push();
  // fill(me.color.r, me.color.g, me.color.b, me.color.a);
  //Making "me" follow the mouse with an acceleration effect.
  if (mouseX > me.x) {
    me.ax = me.acceleration;
  } else if (mouseX < me.x) {
    me.ax = -me.acceleration;
  }
  if (mouseY > me.y) {
    me.ay = me.acceleration;
  } else if (mouseY < me.y) {
    me.ay = -me.acceleration;
  }
  me.vx += me.ax;
  me.vx = constrain(me.vx, -me.maxSpeed, me.maxSpeed);

  me.vy += me.ay;
  me.vy = constrain(me.vy, -me.maxSpeed, me.maxSpeed);

  me.x += me.vx;
  me.y += me.vy;
  //Make "me" rotate in a cool way.
  me.angle += me.rotate;
  let t = tan(me.angle);
  translate(me.x, me.y, me.size);
  rotate(t);
  image(me.image, 0, 0, me.size, me.size);
  pop();

  //Changing the background when "me" and "enemies" collide.
  let distMeEnemy1 = dist(me.x, me.y, enemy1.x, enemy1.y);
  let distMeEnemy2 = dist(me.x, me.y, enemy2.x, enemy2.y);
  let distMeEnemy3 = dist(me.x, me.y, enemy3.x, enemy3.y);
  if (
    distMeEnemy1 < me.size / 2 + enemy1.size / 2 ||
    distMeEnemy2 < me.size / 2 + enemy2.size / 2 ||
    distMeEnemy3 < me.size / 2 + enemy3.size / 2
  ) {
    if (bg.r === 50 && bg.g === 50 && bg.b === 50) {
      bg.r = random(0, 255);
      bg.g = random(0, 255);
      bg.b = random(0, 255);
    } else {
      bg.r = 50;
      bg.g = 50;
      bg.b = 50;
    }
    //Making the emoji change when collision with the enemies.
    if (me.image === smile) {
      me.image = kiss;
    } else if (me.image === kiss) {
      me.image = laughingCrying;
    } else if (me.image === laughingCrying) {
      me.image = heartEyes;
    } else if (me.image === heartEyes) {
      me.image = tongueOut;
    } else if (me.image === tongueOut) {
      me.image = wink;
    } else if (me.image === wink) {
      me.image = sleepy;
      //Tells you to go sleep after the sleepy emoji.
    } else {
      background(0);
      textAlign(CENTER);
      textSize(60);
      textStyle(BOLD);
      stroke(255, 0, 0);
      fill(255, 0, 0);
      text("GO SLEEP!!", width / 2, height / 2);
      noLoop();
    }
  }

  //When an enemy and the user come into contact, the enemy's coordinates change.
  if (distMeEnemy1 < me.size / 2 + enemy1.size / 2) {
    enemy1.x = width - (enemy1.size / 2 + 1);
    enemy1.y = random(0 + enemy1.size / 2, height - enemy1.size / 2);
    enemy1.speedx = 4.3;
    enemy1.speedy = random(1, 4);
  }
  if (distMeEnemy2 < me.size / 2 + enemy2.size / 2) {
    enemy2.x = enemy2.size / 2;
    enemy2.y = random(0 + enemy2.size / 2, height - enemy2.size / 2);
    enemy2.speedx = random(1, 4);
    enemy2.speedy = 4;
  }
  if (distMeEnemy3 < me.size / 2 + enemy3.size / 2) {
    enemy3.x = random(0 + enemy3.size / 2, width - enemy3.size / 2);
    enemy3.y = enemy3.size / 2;
    enemy3.speedx = -3;
    enemy3.speedy = random(1, 4);
  }
}

function mousePressed() {
  me.image = smile;
  loop();
}
