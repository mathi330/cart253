class Shape {
  constructor(origin) {
    //middle of the shape
    this.xCenter = random(0, width);
    this.yCenter = random(0, height);

    this.size = random(2, 30);
    this.strokeWeight = random(1, 5);
    this.stroke = color(
      random(50, 100),
      random(80, 120),
      random(100, 255),
      random(120, 210)
    );

    //points of the shape
    this.numCoordinates = 8; //8 x and 8 y
    this.xCoordinate = [
      0,
      this.size,
      this.size * 2,
      this.size,
      0,
      -this.size,
      -this.size * 2,
      -this.size,
    ];
    // this.xDistortedCoordinates = [];
    this.yCoordinate = [
      -this.size * 2,
      -this.size,
      0,
      this.size,
      this.size * 2,
      this.size,
      0,
      -this.size,
    ];
    // this.yDistortedCoordinates = [];

    //movements
    this.xoff = -1000 * origin;
    this.xoff1 = 0;
    this.distortionRange = 50;
    this.speed = 0.002;
  }

  move() {
    this.xCenter = map(noise(this.xoff), 0, 1, -100, width + 100);
    this.yCenter = map(noise(this.xoff + 100), 0, 1, -100, height + 100);
    this.xoff += this.speed;
  }

  //Not working...
  distort() {
    let a = 0;

    for (let i = 0; i < this.xCoordinate.length; i++) {
      a += 100;
      let x = map(
        noise(this.xoff1),
        0,
        1,
        this.xCoordinate[i] - this.distortionRange,
        this.xCoordinate[i] + this.distortionRange
      );
      // this.xDistortedCoordinates.push(x);
      a += 100;
      let y = map(
        noise(this.xoff1 + a),
        0,
        1,
        this.yCoordinate[i] - this.distortionRange,
        this.yCoordinate + this.distortionRange
      );
      // this.yDistortedCoordinates.push(y);
    }
    this.xoff1 += this.speed;
  }

  display() {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.stroke);

    //forming the shape
    beginShape();
    curveVertex(
      this.xCenter + this.xCoordinate[7],
      this.yCenter + this.yCoordinate[7]
    );
    for (let i = 0; i < this.xCoordinate.length; i++) {
      curveVertex(
        this.xCenter + this.xCoordinate[i],
        this.yCenter + this.yCoordinate[i]
      );
    }
    curveVertex(
      this.xCenter + this.xCoordinate[0],
      this.yCenter + this.yCoordinate[0]
    );
    curveVertex(
      this.xCenter + this.xCoordinate[1],
      this.yCenter + this.yCoordinate[1]
    );

    //center of the shape
    // ellipse(this.xCenter, this.yCenter, 1);
    endShape();
    pop();
  }
}
