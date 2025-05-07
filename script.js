// script.js

let particles = [];
const numParticles = 100; // Adjust number of particles

function setup() {
  // Create the canvas and parent it to our div
  let canvasContainer = select('#particle-background');
  let cnv = createCanvas(canvasContainer.width, canvasContainer.height);
  cnv.parent('particle-background'); // Attach canvas to the div
  cnv.style('display', 'block'); // Recommended for p5 canvas

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  clear(); // Clears the canvas each frame for a clean animation
           // Or use background(R, G, B, Alpha) for a semi-transparent background / trails
  // background(0, 0, 0, 10); // Example: Creates trails

  for (let particle of particles) {
    particle.followMouse();
    particle.update();
    particle.edges();
    particle.show();
  }
}

// Particle class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D(); // Random initial velocity
    this.vel.mult(random(0.5, 1.5)); // Randomize speed slightly
    this.acc = createVector(0, 0);
    this.maxSpeed = 2; // Max speed of particle
    this.size = random(3, 7);
    this.color = color(0, 0, 139, 250); // Light greyish-blue, semi-transparent
  }

  followMouse() {
    let target = createVector(mouseX, mouseY);
    let desired = p5.Vector.sub(target, this.pos); // Vector from particle to mouse
    // desired.setMag(this.maxSpeed); // Move at maxSpeed (can be jittery)

    // Steer towards the mouse
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(0.1); // Limit steering force
    this.acc.add(steer);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); // Apply max speed
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration each frame
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  // Keep particles on screen (wrap around)
  edges() {
    if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
    } else if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    }
    if (this.pos.y > height + this.size) {
      this.pos.y = -this.size;
    } else if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
    }
  }
}

// Make canvas responsive
function windowResized() {
  let canvasContainer = select('#particle-background');
  resizeCanvas(canvasContainer.width, canvasContainer.height);
}