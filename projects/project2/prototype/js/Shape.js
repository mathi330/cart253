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
    this.xDistortedCoordinates = [];
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
    this.yDistortedCoordinates = [];

    //movements
    this.xoff = -1000 * origin;
    this.speed = 0.002;
    //movement points
    this.xoff1 = random(0, 1000);
    this.distortionRange = 50;
  }

  move() {
    this.xCenter = map(noise(this.xoff), 0, 1, -100, width + 100);
    this.yCenter = map(noise(this.xoff + 100), 0, 1, -100, height + 100);
    this.xoff += this.speed;
  }

  //puts the info from the xCoordinate and yCoordinate arrays into xDistortedCoordinates and yDistortedCoordinates
  choosePoints() {
    // let a = 0;
    //
    // for (let i = 0; i < this.xCoordinate.length; i++) {
    //   a += 100;
    //   let x = map(
    //     noise(this.xoff1 + a),
    //     0,
    //     1,
    //     this.xCoordinate[i] - this.distortionRange / 2,
    //     this.xCoordinate[i] + this.distortionRange * 2
    //   );
    //   this.xDistortedCoordinates.push(x);
    //   a += 100;
    //   let y = map(
    //     noise(this.xoff1 + a),
    //     0,
    //     1,
    //     this.yCoordinate[i] - this.distortionRange / 2,
    //     this.yCoordinate[i] + this.distortionRange * 2
    //   );
    //   this.yDistortedCoordinates.push(y);
    // }
    // this.xoff1 += this.speed;

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
      let xDist = this.xDistortedCoordinates[i];
      let yDist = this.yDistortedCoordinates[i];

      a += 100;

      let x = map(
        noise(this.xoff1 + a),
        0,
        1,
        -this.distortionRange,
        this.distortionRange
      );

      a += 100;

      let y = map(
        noise(this.xoff1 + a),
        0,
        1,
        -this.distortionRange,
        this.distortionRange
      );

      this.xDistortedCoordinates[i] += x;
      this.yDistortedCoordinates[i] += y;

      // console.log(x, y);
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
      this.xCenter + this.xDistortedCoordinates[7],
      this.yCenter + this.yDistortedCoordinates[7]
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

    //center of the shape
    // ellipse(this.xCenter, this.yCenter, 1);
    endShape();
    pop();
  }
}
