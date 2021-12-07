/**
This is a class to create a big shape (16 points).
The shape moves around the canvas while each point distorts the shape itself
*/
class BigShape extends Shape {
  constructor(origin, sound) {
    // Call the super class constructor
    super(origin, 25, 40, sound, 50, 440);

    this.distortion = [0, 30, 60, 90, 120];

    //points of the shape
    this.numCoordinates = 16; //16 x and 16 y
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

  // display shape
  display() {
    super.display(15); //last point of the shape
  }
}
