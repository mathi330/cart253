/**
Some more shape experiments
Changing the number of points of the shape
*/
class ShapeNotMoving {
  constructor() {
    this.xCenter = width / 2;
    this.yCenter = height / 2;

    this.size = 25;
    this.strokeWeight = 5;
    this.stroke = color(100, 100, 240);

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
  }

  display() {
    push();
    strokeWeight(this.strokeWeight);
    noFill();
    stroke(this.stroke);

    //forming the shape
    beginShape();
    curveVertex(
      this.xCenter + this.xCoordinate[15],
      this.yCenter + this.yCoordinate[15]
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

    // center of the shape
    // ellipse(this.xCenter, this.yCenter, 1);
    endShape();
    pop();
  }
}
