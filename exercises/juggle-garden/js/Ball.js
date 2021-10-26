class Ball {
  constructor(x, y) {
    this.x = x;
    this.originalY = y;
    this.upsideDownY = height - y;
    this.y = this.originalY;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.maxSpeed = 10;
    this.gravityForce = 0.0025;
    this.size = 50;
    this.green = color(100, 255, 100);
    this.red = color(255, 100, 100);
    this.purple = color(230, 100, 230);
    //To have more chance for the ball to be green then red.
    this.chooseColor = [
      this.green,
      this.green,
      this.green,
      this.green,
      this.green,
      this.purple,
      this.purple,
      this.purple,
      this.red,
    ];
    this.color = random(this.chooseColor);
    this.beginTimer = false;
    this.numSec = 60 * 4;
    this.myTimer = this.numSec;
    this.active = true;
  }

  gravity() {
    this.ay += this.gravityForce;
  }

  move() {
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    //Make the ball bounce of the sides of the canvas when they touch.
    if (this.x - this.size / 2 <= 0 || this.x + this.size / 2 >= width) {
      this.vx = -this.vx;
    }

    //Adding the velocity to the x position.
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.size / 2 > height) {
      this.active = false;
    }
  }

  timer() {
    if (this.beginTimer) {
      this.myTimer = this.numSec;
      this.myTimer--;
      if (this.myTimer === 0) {
        this.beginTimer = false;
      }
    }
  }

  //Make the ball bounce when it is on the paddle.
  bounce(paddle) {
    if (
      this.x > paddle.x - paddle.width / 2 &&
      this.x < paddle.x + paddle.width / 2 &&
      this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
      this.y - this.size / 2 < paddle.y + paddle.height / 2
    ) {
      // Bounce
      let dx = this.x - paddle.x;
      this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);

      this.vy = -this.vy;
      this.ay = 0;

      if (this.color === this.purple) {
        paddle.width -= 10;
      }
      if (this.color === this.green) {
        paddle.width += 10;
      }
      if (this.color === this.red) {
        paddle.width -= 50;
      }
    }
  }

  display() {
    push();
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
