class Line {
  constructor(origin) {
    this.myNoise = 1000 * origin;

    //speed at which the line moves
    this.speed = random(0.000004, 0.000005);
    // distance between each point of the line
    this.spaceBetweenPoints = random(1, 10);

    this.stroke = {
      r: random(150, 200),
      g: random(10, 80),
      b: random(80, 200),
      a: random(200, 255),
    };
    this.strokeWeight = 1.5;
  }

  makeLine() {
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.a);
    strokeWeight(this.strokeWeight);

    //Create the points of the line
    for (let i = 0; i < width; i += this.spaceBetweenPoints) {
      point(i, height * noise(this.myNoise, i / 1000));
      this.myNoise += this.speed;
    }
  }
}

/**
Inspiration and original code from John Connolly (teacher in Cegep)
https://editor.p5js.org/Mat412/sketches/ZvfGtIyX6
*/
