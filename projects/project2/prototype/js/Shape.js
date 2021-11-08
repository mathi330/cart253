class Shape {
  constructor() {
    //middle of the shape
    this.xCenter = 0;
    this.yCenter = 0;

    this.size = random(10, 40);
    this.strokeWeight = random(1, 7);
    this.stroke = color(random(100, 255), random(100, 255), random(100, 255));

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
    // this.x0 = 0;
    // this.y0 = -this.size * 2;
    // this.x1 = this.size;
    // this.y1 = -this.size;
    // this.x2 = this.size * 2;
    // this.y2 = 0;
    // this.x3 = this.size;
    // this.y3 = this.size;
    // this.x4 = 0;
    // this.y4 = this.size * 2;
    // this.x5 = -this.size;
    // this.y5 = this.size;
    // this.x6 = -this.size * 2;
    // this.y6 = 0;
    // this.x7 = -this.size;
    // this.y7 = -this.size;

    //movements
    this.xoff = 0;
    this.distortionRange = 20;
    this.speed = 0.002;
  }

  move() {
    this.xCenter = map(noise(this.xoff), 0, 1, 0, width);
    this.yCenter = map(noise(this.xoff + 100), 0, 1, 0, height);
    this.xoff += this.speed;
  }

  distort() {
    let a = 100;

    for (let i = 0; i < this.xCoordinate.length; i++) {
      let x = map(
        noise(this.xoff + a),
        0,
        1,
        this.xCoordinate[i] - this.distortionRange,
        this.xCoordinate[i] + this.distortionRange
      );
      a += 100;
      let y = map(
        noise(this.xoff + a),
        0,
        1,
        this.yCoordinate[i] - this.distortionRange,
        this.yCoordinate + this.distortionRange
      );
      a += 100;
    }
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
    // curveVertex(this.xCenter + x7, this.xCenter + y7);
    // curveVertex(this.xCenter + x0, this.xCenter + y0);
    // curveVertex(this.xCenter + x1, this.xCenter + y1);
    // curveVertex(this.xCenter + x2, this.xCenter + y2);
    // curveVertex(this.xCenter + x3, this.xCenter + y3);
    // curveVertex(this.xCenter + x4, this.xCenter + y4);
    // curveVertex(this.xCenter + x5, this.xCenter + y5);
    // curveVertex(this.xCenter + x6, this.xCenter + y6);
    // curveVertex(this.xCenter + x7, this.xCenter + y7);
    // curveVertex(this.xCenter + x0, this.xCenter + y0);
    // curveVertex(this.xCenter + x1, this.xCenter + y1);
    endShape();
    pop();
  }
}
