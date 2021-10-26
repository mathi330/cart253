//This class is to create a cool interactive background for the title and endings.

class Deco {
  constructor(x, y, chooseColor) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10.5;
    this.gravityForce = random(0.002, 0.003);
    this.size = random(30, 90);
    this.color = random(chooseColor);
  }

  gravity() {
    this.ay += this.gravityForce;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    //Adding the velocity to the x position.
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }

  bounce() {
    if (this.y + this.size / 2 > height) {
      // Bounce
      this.vy = -this.vy;
      this.ay = 0;
    }
  }

  display() {
    push();
    strokeWeight(5);
    stroke(this.color);
    noFill();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
