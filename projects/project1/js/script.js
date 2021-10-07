/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let ground = {
  x: undefined,
  y: undefined,
  sizeX: undefined,
  sizeY: 50,
  fill: {
    r: 200,
    g: 200,
    b: 200,
  },
};

let materials = {
  x: undefined,
  y: undefined,
  sizeX: undefined,
  minSizeX: undefined,
  maxSizeX: undefined,
  sizeY: undefined,
  minSizeY: undefined,
  maxSizeY: undefined,
  isBeingDragged: false,

  fill: {
    r: 250,
    g: 50,
    b: 50,
  },
  stroke: {
    r: 0,
    g: 0,
    b: 0,
    strokeWeight: 3,
  },
};

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(1000, 700);
  rectMode(CENTER);

  setupGround();
  setupMaterial();
}

/**
setupGround()

function to set up the grounds size and coordinates.
*/
function setupGround() {
  //determining the height and lenght of the ground depending on the size of the canvas.
  ground.sizeX = width;
  ground.sizeY = height / 11;
  //placing the ground according to the size of the canvas and size of the ground.
  ground.x = width / 2;
  ground.y = height - ground.sizeY / 2;
}

/**
setupMaterial()

function that sets up size and coordinates for material.
*/
function setupMaterial() {
  //choosing random sizes for the material.
  materials.sizeX = random(width / 15, width / 8);
  materials.sizeY = random(height / 15, height / 11);
  //choosing coordiantes of the material while taking into account the ground and the material's size.
  materials.x = random(0 + materials.sizeX / 2, width - materials.sizeX / 2);
  materials.y = ground.y - ground.sizeY / 2 - materials.sizeY / 2;
  // - materials.stroke.strokeWeight;
}

/**
Description of draw()
*/
function draw() {
  background(0);
  displayGround();

  displayMaterial();
}

/**
displayGround()

function that displays the ground/lower part of the canvas.
*/
function displayGround() {
  push();
  noStroke();
  fill(ground.fill.r, ground.fill.g, ground.fill.b);
  rect(ground.x, ground.y, ground.sizeX, ground.sizeY);
  pop();
}

/**
displayMaterial()

function that displays the material.
*/
function displayMaterial() {
  //fill and stroke (for now I don't have a stroke but I still put it in case I change my mind).
  fill(materials.fill.r, materials.fill.g, materials.fill.b);
  noStroke();
  // strokeWeight(materials.stroke.strokeWeight);
  // stroke(materials.stroke.r, materials.stroke.g, materials.stroke.b);
  rect(materials.x, materials.y, materials.sizeX, materials.sizeY);
}
