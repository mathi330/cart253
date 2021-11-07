class Shape {
  constructor() {
    //middle of the shape
    this.xCenter = 0;
    this.yCenter = 0;
    this.size = random(10, 40);

    //points of the shape
    this.x0 = 0;
    this.y0 = -this.size * 2;
    this.x1 = this.size;
    this.y1 = -this.size;
    this.x2 = this.size * 2;
    this.y2 = 0;
    this.x3 = this.size;
    this.y3 = this.size;
    this.x4 = 0;
    this.y4 = this.size * 2;
    this.x5 = -this.size;
    this.y5 = this.size;
    this.x6 = -this.size * 2;
    this.y6 = 0;
    this.x7 = -this.size;
    this.y7 = -this.size;

    //movements
    this.xoff = 0;
    this.distortionRange = 20;
  }

  display() {
    push();

    pop();
  }
}
