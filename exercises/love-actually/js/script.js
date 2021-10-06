/**
Looking for love
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//variable to change the state of the program.
let state = `title`;

//Object for the element the user can move around ("me").
let me = {
  x: undefined,
  y: undefined,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 255,
    b: 255,
    a: 150,
  },
};

//Object that contains all the hearts that the user ("me") can interact with.
let hearts = {
  blackHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 0,
    ty: 10,
    alpha: 255,
  },
  blueHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 100,
    ty: 110,
    alpha: 255,
  },
  greenHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 200,
    ty: 210,
    alpha: 255,
  },
  orangeHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 300,
    ty: 310,
    alpha: 255,
  },
  pinkHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 400,
    ty: 410,
    alpha: 255,
  },
  purpleHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 500,
    ty: 510,
    alpha: 255,
  },
  redHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 600,
    ty: 610,
    alpha: 255,
  },
  whiteHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 700,
    ty: 710,
    alpha: 255,
  },
  yellowHeart: {
    image: undefined,
    x: undefined,
    y: undefined,
    size: undefined,
    vx: 0,
    vy: 0,
    speed: 10,
    tx: 800,
    ty: 810,
    alpha: 255,
  },
  nbHearts: 7,
};

/**
preload()

function that puts all the images used in this program into variables.
*/
function preload() {
  //images
  hearts.blackHeart.image = loadImage("assets/images/black-heart.png");
  hearts.blueHeart.image = loadImage("assets/images/blue-heart.png");
  hearts.greenHeart.image = loadImage("assets/images/green-heart.png");
  hearts.orangeHeart.image = loadImage("assets/images/orange-heart.png");
  hearts.pinkHeart.image = loadImage("assets/images/pink-heart.png");
  hearts.purpleHeart.image = loadImage("assets/images/purple-heart.png");
  hearts.redHeart.image = loadImage("assets/images/red-heart.png");
  hearts.whiteHeart.image = loadImage("assets/images/white-heart.png");
  hearts.yellowHeart.image = loadImage("assets/images/yellow-heart.png");
}

/**
setup()

function that sets up everything (hearts and "me") before the start of draw().
*/
function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  setupMe();
  setupAllHearts();
}

/**
setupHearts

function that sets up "heart."
*/
function setupHearts(heart) {
  heart.x = random(0, width);
  heart.y = random(0, height);
  heart.size = random(100, 150);
}

/**
setupAllHearts

function applying setupHearts to all the colored hears.
*/
function setupAllHearts() {
  setupHearts(hearts.blueHeart);
  setupHearts(hearts.greenHeart);
  setupHearts(hearts.orangeHeart);
  setupHearts(hearts.pinkHeart);
  setupHearts(hearts.purpleHeart);
  setupHearts(hearts.redHeart);
  setupHearts(hearts.whiteHeart);
  setupHearts(hearts.yellowHeart);
}

/**
setupMe()

function to setup the coordinates and speed of "me."
*/
function setupMe() {
  me.x = width / 2;
  me.y = height / 2;

  me.vx = me.speed;
  me.vy = me.speed;
}

/**
draw()

function that chooses the background's color and calls functions depending on the "state" variable.
*/
function draw() {
  background(10);

  switch (state) {
    case `title`:
      title();
      break;

    case `simulation`:
      simulation();
      break;

    case `ending1`:
      ending1();
      break;

    case `ending2`:
      ending2();
      break;

    case `ending3`:
      ending3();
      break;

    case `ending4`:
      ending4();
      break;

    case `ending5`:
      ending5();
      break;

    case `ending6`:
      ending6();
      break;

    case `ending7`:
      ending7();
      break;

    case `ending8`:
      ending8();
      break;

    case `ending9`:
      ending9();
      break;
  }
}

/**
typeSetting()

function that sets up the information for most of the text that appears in the program.
*/
function typeSetting() {
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, CENTER);
  textSize(40);
  textStyle(BOLD);
}

/**
title()

function for the title of the simulation.
*/
function title() {
  push();
  typeSetting();
  fill(255);
  text(`Love, Actually`, width / 2, height / 2);
  pop();

  push();
  fill(255);
  textFont(`Quicksand`);
  textAlign(CENTER, BOTTOM);
  textSize(20);
  text(
    `You can move the circle in the center with the arrow keys and change the hearts you touch to white.
To start, press any key.`,
    width / 2,
    height - 50
  );
  pop();
}

/**
simulation()

function with everything that happens in the simulation part.
*/
function simulation() {
  collisionMeAllHearts();
  coloredHearts();
  allHearts();
  justMe();
}

/**
ending()

The following 9 functions are all the possible endings for this program.
depending on the number of white heart, the quote that appears is different.
*/
function ending1() {
  push();
  typeSetting();
  text(
    `(1/8 hearts)
    “The loneliest moment in someone’s life is when they are
     watching their whole world fall apart, and all they can do is
     stare blankly.”
                                                    ― F. Scott Fitzgerald `,
    width / 2,
    height / 2
  );
  pop();
}
function ending2() {
  push();
  typeSetting();
  text(
    `(2/8 hearts)
    “Remember: the time you feel lonely is the time you most need
    to be by yourself. Life's cruelest irony.”
                                        ― Douglas Coupland, Shampoo Planet`,
    width / 2,
    height / 2
  );
  pop();
}
function ending3() {
  push();
  typeSetting();
  text(
    `(3/8 hearts)
    “It's often just enough to be with someone. I don't need to
  touch them. Not even talk. A feeling passes between you both.
  You're not alone.”
                                                            ― Marilyn Monroe`,
    width / 2,
    height / 2
  );
  pop();
}
function ending4() {
  push();
  typeSetting();
  text(
    `(4/8 hearts)
    “The most valuable gift you can receive is an honest friend.”
                                                        ― Stephen Richards`,
    width / 2,
    height / 2
  );
  pop();
}
function ending5() {
  push();
  typeSetting();
  text(
    `(5/8 hearts)
    “Friendship gives us the strength to turn from lambs into
    lions.”
                                                        ― Stephen Richards`,
    width / 2,
    height / 2
  );
  pop();
}
function ending6() {
  push();
  typeSetting();
  text(
    `(6/8 hearts)
    “...while finding true love was one of the most splendid things
    that could happen to you in life, finding a friend was equally
    splendid.”
                                        ― Félix J. Palma, The Map of the Sky`,
    width / 2,
    height / 2
  );
  pop();
}
function ending7() {
  push();
  typeSetting();
  text(
    `(7/8 hearts)
    “The only way love can last a lifetime is if it's unconditional. The truth
  is this: love is not determined by the one being loved but rather by the
  one choosing to love.”
                                              ― Stephen Kendrick, The Love Dare`,
    width / 2,
    height / 2
  );
  pop();
}
function ending8() {
  push();
  typeSetting();
  text(
    `(8/8 hearts)
    “Nothing you become will disappoint me; I have no preconception that
    I'd like to see you be or do. I have no desire to forsee you, only to
    discover you. You can't disappoint me”
                                                                ― Mary Haskell`,
    width / 2,
    height / 2
  );
  pop();
}
function ending9() {
  push();
  typeSetting();
  text(
    `(0/8 hearts)
    "Forever Alone..."
                          ― Me`,
    width / 2,
    height / 2
  );
  pop();
}

/**
allHearts()

function for all that has to do with the hearts in the program.
*/
function allHearts() {
  moveAllHearts();
  checkOffScreenAllHearts();
  allHeartsCollision();
  displayAllHearts();
}

/**
moveHearts(heart)

function to make a heart move with perlin noise.
 */
function moveHearts(heart) {
  heart.tx += 0.005;
  heart.ty += 0.005;

  let noiseX = noise(heart.tx);
  let noiseY = noise(heart.ty);

  heart.vx = map(noiseX, 0, 1, -heart.speed, heart.speed);
  heart.vy = map(noiseY, 0, 1, -heart.speed, heart.speed);

  heart.x += heart.vx;
  heart.y += heart.vy;
}

/**
moveAllHearts()

function applying moveHearts for all 8 heart images.
 */
function moveAllHearts() {
  moveHearts(hearts.blueHeart);
  moveHearts(hearts.greenHeart);
  moveHearts(hearts.orangeHeart);
  moveHearts(hearts.pinkHeart);
  moveHearts(hearts.purpleHeart);
  moveHearts(hearts.redHeart);
  moveHearts(hearts.whiteHeart);
  moveHearts(hearts.yellowHeart);
}

/**
checkOffScreenHeart(heart)

function to see if "heart" is off screen, and if it is, it will appear on the opposite side of the canvas.
 */
function checkOffScreenHeart(heart) {
  if (heart.x + me.size / 2 < 0) {
    heart.x = width + me.size / 2;
  }
  if (heart.x - me.size / 2 > width) {
    heart.x = 0 - me.size / 2;
  }
  if (heart.y + me.size / 2 < 0) {
    heart.y = height + me.size / 2;
  }
  if (heart.y - me.size / 2 > height) {
    heart.y = 0 - me.size / 2;
  }
}

/**
checkOffScreenAllHearts()

function applying checkOffScreenHeart for all 8 heart images.
 */
function checkOffScreenAllHearts() {
  checkOffScreenHeart(hearts.blueHeart);
  checkOffScreenHeart(hearts.greenHeart);
  checkOffScreenHeart(hearts.orangeHeart);
  checkOffScreenHeart(hearts.pinkHeart);
  checkOffScreenHeart(hearts.purpleHeart);
  checkOffScreenHeart(hearts.redHeart);
  checkOffScreenHeart(hearts.whiteHeart);
  checkOffScreenHeart(hearts.yellowHeart);
}

/**
heartsCollision(heart1, heart2)

function that creates interaction between hearts when they collide together.
*/
function heartsCollision(heart1, heart2) {
  let d = dist(heart1.x, heart1.y, heart2.x, heart2.y);
  if (d < heart1.size / 2 + heart2.size / 2) {
    heart1.image = hearts.blackHeart.image;
  }
}

/**
allHeartsCollision()

function that puts in application heartsCollision()
(interesting to notice that their is a hierarchy in which heart will become black depending on the 2 colliding hearts).
*/
function allHeartsCollision() {
  heartsCollision(hearts.greenHeart, hearts.blueHeart);
  heartsCollision(hearts.orangeHeart, hearts.blueHeart);
  heartsCollision(hearts.pinkHeart, hearts.blueHeart);
  heartsCollision(hearts.purpleHeart, hearts.blueHeart);

  heartsCollision(hearts.greenHeart, hearts.yellowHeart);
  heartsCollision(hearts.orangeHeart, hearts.yellowHeart);
  heartsCollision(hearts.pinkHeart, hearts.yellowHeart);
  heartsCollision(hearts.purpleHeart, hearts.yellowHeart);

  heartsCollision(hearts.greenHeart, hearts.redHeart);
  heartsCollision(hearts.orangeHeart, hearts.redHeart);
  heartsCollision(hearts.pinkHeart, hearts.redHeart);
  heartsCollision(hearts.purpleHeart, hearts.redHeart);

  heartsCollision(hearts.blueHeart, hearts.whiteHeart);
  heartsCollision(hearts.yellowHeart, hearts.whiteHeart);
  heartsCollision(hearts.redHeart, hearts.whiteHeart);
}

/**
displayAllHearts(heart)

function to display "heart."
 */
function displayHeart(heart) {
  image(heart.image, heart.x, heart.y, heart.size, heart.size);
}

/**
displayAllHearts()

function applying displayHeart for all 8 heart images.
 */
function displayAllHearts() {
  displayHeart(hearts.blueHeart);
  displayHeart(hearts.greenHeart);
  displayHeart(hearts.orangeHeart);
  displayHeart(hearts.pinkHeart);
  displayHeart(hearts.purpleHeart);
  displayHeart(hearts.redHeart);
  displayHeart(hearts.whiteHeart);
  displayHeart(hearts.yellowHeart);
}

/**
justMe()

function with all information on "me."
*/
function justMe() {
  moveMe();
  checkOffScreenMe();
  displayMe();
}

/**
moveME()

function to make the interactive element "me" move with the arrow keys of the keyboard.
*/
function moveMe() {
  if (keyIsDown(LEFT_ARROW)) {
    me.x -= me.vx;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    me.x += me.vx;
  }

  if (keyIsDown(UP_ARROW)) {
    me.y -= me.vy;
  }
  if (keyIsDown(DOWN_ARROW)) {
    me.y += me.vy;
  }
}

/**
checkOffScreenMe()

funcion to see if "me" is off screen, and if it is, it will appear on the opposite side of the canvas.
 */
function checkOffScreenMe() {
  if (me.x + me.size / 2 < 0) {
    me.x = width + me.size / 2;
  }
  if (me.x - me.size / 2 > width) {
    me.x = 0 - me.size / 2;
  }
  if (me.y + me.size / 2 < 0) {
    me.y = height + me.size / 2;
  }
  if (me.y - me.size / 2 > height) {
    me.y = 0 - me.size / 2;
  }
}

/**
displayMe()

function to display the interactive element "me."
 */
function displayMe() {
  //Display "me"
  noStroke();
  fill(me.fill.r, me.fill.g, me.fill.b, me.fill.a);
  ellipse(me.x, me.y, me.size);
}

/**
collisionMeHearts(heart)

function that makes "me" interact with the hearts when they collide.
*/
function collisionMeHearts(heart) {
  let d = dist(me.x, me.y, heart.x, heart.y);
  if (d < me.size / 2 + heart.size / 2) {
    heart.image = hearts.whiteHeart.image;
  }
}

/**
collisionMeAllHearts()

function applying collisionMeHearts() to all hearts.
*/
function collisionMeAllHearts() {
  collisionMeHearts(hearts.blueHeart);
  collisionMeHearts(hearts.greenHeart);
  collisionMeHearts(hearts.orangeHeart);
  collisionMeHearts(hearts.pinkHeart);
  collisionMeHearts(hearts.purpleHeart);
  collisionMeHearts(hearts.redHeart);
  collisionMeHearts(hearts.yellowHeart);
}

/**
coloredHearts

function that sees if all the hearts are either white or black.
*/
function coloredHearts() {
  if (
    (hearts.blueHeart.image === hearts.whiteHeart.image ||
      hearts.blueHeart.image === hearts.blackHeart.image) &&
    (hearts.greenHeart.image === hearts.whiteHeart.image ||
      hearts.greenHeart.image === hearts.blackHeart.image) &&
    (hearts.orangeHeart.image === hearts.whiteHeart.image ||
      hearts.orangeHeart.image === hearts.blackHeart.image) &&
    (hearts.pinkHeart.image === hearts.whiteHeart.image ||
      hearts.pinkHeart.image === hearts.blackHeart.image) &&
    (hearts.purpleHeart.image === hearts.whiteHeart.image ||
      hearts.purpleHeart.image === hearts.blackHeart.image) &&
    (hearts.redHeart.image === hearts.whiteHeart.image ||
      hearts.redHeart.image === hearts.blackHeart.image) &&
    (hearts.yellowHeart.image === hearts.whiteHeart.image ||
      hearts.yellowHeart.image === hearts.blackHeart.image)
  ) {
    whiteHeartCount();
  }
}

/**
whiteHeartCount()

function that counts the number of white hearts when all hearts are either white or black.
Depending on the number of white heart, it will choose the appropriate ending.
*/
function whiteHeartCount() {
  let count = 0;
  if (hearts.blueHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.greenHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.orangeHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.pinkHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.purpleHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.redHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.yellowHeart.image === hearts.whiteHeart.image) {
    count++;
  }
  if (hearts.whiteHeart.image === hearts.whiteHeart.image) {
    count++;
  }

  if (count === 1) {
    state = `ending1`;
  }
  if (count === 2) {
    state = `ending2`;
  }
  if (count === 3) {
    state = `ending3`;
  }
  if (count === 4) {
    state = `ending4`;
  }
  if (count === 5) {
    state = `ending5`;
  }
  if (count === 6) {
    state = `ending6`;
  }
  if (count === 7) {
    state = `ending7`;
  }
  if (count === 8) {
    state = `ending8`;
  }
  if (count === 0) {
    state = `ending9`;
  }
}

/**
keyPressed()

function to change the variable state from title to simulation by pressing any key of the keyboard.
*/
function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
  if (
    state === `ending1` ||
    state === `ending2` ||
    state === `ending3` ||
    state === `ending4` ||
    state === `ending5` ||
    state === `ending6` ||
    state === `ending7` ||
    state === `ending8` ||
    state === `ending9`
  ) {
    state = `title`;
  }
}
