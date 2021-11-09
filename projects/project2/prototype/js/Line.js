class Line {
  constructor(origin) {
    this.yNoise = 1000 * origin;

    //speed at which the line moves
    this.speed = random(0.000004, 0.000005);
    // dsitance between each point of the line
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
    // this.xWave = map(10, 0, width, 0.5, 5);

    for (let i = 0; i < width; i += this.spaceBetweenPoints) {
      point(i, height * noise(this.yNoise, i / 1000));
      this.yNoise += this.speed;
    }
  }
}
