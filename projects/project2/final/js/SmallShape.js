/**
This is a class to create a big shape (8 points).
The shape moves around the canvas while each point distorts the shape itself
(Same as BigShape just in smaller)
*/
class SmallShape extends Shape {
  constructor(origin, sound) {
    // Call the super class constructor
    super(origin, 5, 20, sound, 440, 940);

    this.distortion = [0, 15, 30, 45, 60];

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
  }

  // display shape
  display() {
    super.display(7); //last point of the shape
  }
}
