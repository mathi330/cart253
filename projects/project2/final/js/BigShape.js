/**
This class is to create a big shape containing 16 points.

*/
class BigShape {
  constructor(origin) {
    //middle of the shape
    this.xCenter = random(0, width);
    this.yCenter = random(0, height);

    this.size = random(25, 40);
    this.strokeWeight = random(1, 5);
    this.chooseRed = random(50, 100);
    this.chooseGreen = random(80, 120);
    this.chooseBlue = random(100, 255);
    this.chooseAlpha = random(120, 210);
    this.r = this.chooseRed;
    this.g = this.chooseGreen;
    this.b = this.chooseBlue;
    this.a = this.chooseAlpha;
    // this.stroke = color(this.r, this.g, this.b, this.a);

    //points of the shape
    this.numCoordinates = 16;
    this.xCoordinate = [
      0,
      this.size,
      this.size * 2.5,
      this.size * 3.7,
      this.size * 4,
      this.size * 3.7,
      this.size * 2.5,
      this.size,
      0,
      -this.size,
      -this.size * 2.5,
      -this.size * 3.7,
      -this.size * 4,
      -this.size * 3.7,
      -this.size * 2.5,
      -this.size,
    ];
    this.xDistortedCoordinates = [];
    this.yCoordinate = [
      -this.size * 4,
      -this.size * 3.7,
      -this.size * 2.5,
      -this.size,
      0,
      this.size,
      this.size * 2.5,
      this.size * 3.7,
      this.size * 4,
      this.size * 3.7,
      this.size * 2.5,
      this.size,
      0,
      -this.size,
      -this.size * 2.5,
      -this.size * 3.7,
    ];
    this.yDistortedCoordinates = [];

    //movements
    this.t = -1000 * origin;
    this.speed = 0.002;
    //movement points
    this.t1 = random(0, 1000);
    this.distortionRange = 60;
  }

  move() {
    this.xCenter = map(noise(this.t), 0, 1, -100, width + 100);
    this.yCenter = map(noise(this.t + 100), 0, 1, -100, height + 100);
    this.t += this.speed;
  }

  //puts the info from the xCoordinate and yCoordinate arrays into xDistortedCoordinates and yDistortedCoordinates
  choosePoints() {
    for (let i = 0; i < this.xCoordinate.length; i++) {
      let x = this.xCoordinate[i];
      this.xDistortedCoordinates.push(x);

      let y = this.yCoordinate[i];
      this.yDistortedCoordinates.push(y);
    }
  }

  distort() {
    let a = 0;

    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      a += 100;

      let x = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      a += 100;

      let y = map(
        noise(this.t1 + a),
        0,
        1,
        -this.distortionRange / 2,
        this.distortionRange
      );

      this.xDistortedCoordinates[i] = this.xCoordinate[i] + x;
      this.yDistortedCoordinates[i] = this.yCoordinate[i] + y;
    }
    this.t1 += this.speed;
  }

  colorChange() {
    if (this.r === this.chooseRed) {
      this.r = this.chooseBlue;
      this.g = this.chooseRed;
      this.b = this.chooseGreen;
    } else if (this.r === this.chooseBlue) {
      this.r = this.chooseGreen;
      this.g = this.chooseBlue;
      this.b = this.chooseRed;
    } else if (this.r === this.chooseGreen) {
      this.r = this.chooseRed;
      this.g = this.chooseGreen;
      this.b = this.chooseBlue;
    }
  }

  display() {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.r, this.g, this.b, this.a);

    //forming the shape
    beginShape();
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[15],
      this.yCenter + this.yDistortedCoordinates[15]
    );
    for (let i = 0; i < this.xDistortedCoordinates.length; i++) {
      curveVertex(
        this.xCenter + this.xDistortedCoordinates[i],
        this.yCenter + this.yDistortedCoordinates[i]
      );
    }
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[0],
      this.yCenter + this.yDistortedCoordinates[0]
    );
    curveVertex(
      this.xCenter + this.xDistortedCoordinates[1],
      this.yCenter + this.yDistortedCoordinates[1]
    );

    // center of the shape
    // ellipse(this.xCenter, this.yCenter, 1);
    endShape();
    pop();
  }
}
