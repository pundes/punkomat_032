

function Vehicle(x, y) {
  this.position = createVector(x, y);
  var min = 12;
  var max = 100;
  this.r = Math.round(Math.random() * (max - min)) + min;

  this.maxspeed;
  this.maxforce = 0.2;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);


  this.applyForce = function(force) {
    this.acceleration.add(force);
  }


  this.separate = function(vehicles) {
    var desiredseparation = 40;
    var sum = createVector();
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
        if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.maxspeed = 1;
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.display = function(vehicles) {
    var dist;
    var min = 1;
    var max = 100;
    val = Math.round(Math.random() * (max - min)) + min;
    noStroke();
    if(val < 33) {
      fill(10, 10, 10);
    } else if(val > 33 && val < 66) {
      fill(5, 5, 5);
    } else {
      fill(0);
    }
    push();
    translate(this.position.x, this.position.y);
    rect(-3, -3, this.r, this.r);
    pop();

  }

  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }
}
