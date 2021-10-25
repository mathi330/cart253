/**
Age of Aquariums
Mathilde Davan

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let candies = [];
let numCandies = 10;

let candySize = 50;

let candyColor = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [102, 255, 255],
  [255, 0, 102],
  [204, 153, 255],
  [153, 255, 204],
  [255, 255, 0],
  [255, 128, 128],
  [102, 204, 255],
  [255, 128, 0],
  [255],
];

function setup() {
  createCanvas(600, 400);
  noCursor();
}

for (let i = 0; i < numCandies; i++) {
  // Create a candy
  let candy = createCandy(
    random(0 + candySize / 2, width - candySize / 2),
    random(0 + candySize / 2, height - candySize / 2)
  );
  // Add the candy to our array
  candies.push(candy);
}

// createcandy(x,y)
// Creates a new JavaScript Object describing a candy and returns it
function createCandy(x, y) {
  let candy = {
    x: x,
    y: y,
    size: candySize,
    vx: 0,
    vy: 0,
    speed: 1,
    fill: color(random(candyColor)),
  };
  return candy;
}

function draw() {
  background(0, 100);

  for (let i = 0; i < candies.length; i++) {
    moveCandy(candies[i]);
    displayCandy(candies[i]);
  }

  background(0);
  noFill();
  stroke(255, 255, 0);
  // fill(255);
  // noStroke();
  beginShape();
  vertex(mouseX, mouseY);
  vertex(mouseX, mouseY + 16);
  vertex(mouseX + 4, mouseY + 12);
  vertex(mouseX + 6, mouseY + 18);
  vertex(mouseX + 7, mouseY + 17);
  vertex(mouseX + 5, mouseY + 11);
  vertex(mouseX + 10, mouseY + 11);
  vertex(mouseX, mouseY);
  endShape();
}

// movecandy(candy)
// Chooses whether the provided candy changes direction and moves it
function moveCandy(candy) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    candy.vx = random(-candy.speed, candy.speed);
    candy.vy = random(-candy.speed, candy.speed);
  }

  // Move the candy
  candy.x = candy.x + candy.vx;
  candy.y = candy.y + candy.vy;

  // Constrain the candy to the canvas
  candy.x = constrain(candy.x, 0 + candy.size / 2, width - candy.size / 2);
  candy.y = constrain(candy.y, 0 + candy.size / 2, height - candy.size / 2);
}

// displaycandy(candy)
// Displays the provided candy on the canvas
function displayCandy(candy) {
  push();
  noFill();
  strokeWeight(4);
  stroke(candy.fill, 200);
  // fill(candy.fill);
  // noStroke();
  ellipse(candy.x, candy.y, candy.size);
  pop();
}

function mouseIsInsideCandy(candy) {
  let d = dist(mouseX, mouseY, candy.x, candy.y);
  if (d < candy.size / 2) {
    return true;
  } else {
    false;
  }
}

/**
Add the candy to our array at the mouse position
*/
function mousePressed() {
  for (let i = 0; i < candies.length; i++) {
    if (mouseIsInsideCandy(candies[i])) {
      candies.splice(i, 1);
    }
  }
  // let candy = createCandy(mouseX, mouseY);
  // candies.push(candy);
}
