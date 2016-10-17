// A pattern based on the book Nature of Code from aniel Shiffman
// http://natureofcode.com/

var vehicles = [];

var noise;
var filter, filterFreq, filterWidth;

function setup() {

  createCanvas(windowWidth,windowHeight);
  for (var i = 0; i < 280; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  //Sound
  filter = new p5.LowPass();
  noise = new p5.Noise();
  noise.disconnect();
  filter.process(noise);
  noise.start();
  noise.amp(1);
}

function draw() {
  background(0);

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].separate(vehicles);
    vehicles[i].update();
    vehicles[i].borders();
    vehicles[i].display(vehicles);
  }

  //Sound
  filterFreq = 350;
  filterWidth = 67.5;
  filter.set(filterFreq, filterWidth);
}
