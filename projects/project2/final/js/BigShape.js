/**
This is a class to create a big shape (16 points).
The shape moves around the canvas while each point distorts the shape itself
*/
class BigShape extends Shape {
  constructor(origin, sound) {
    // Call the super class constructor
    super(origin, 25, 40, 60, sound, 0, 440);

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
  }

  display() {
    super.display(15);
  }
}
