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

// script.js
document.addEventListener('DOMContentLoaded', function() {
  const projectGrid = document.querySelector('.project-grid');
  const modal = document.getElementById('projectModal');

  if (projectGrid && modal) {
      const modalFullProjectLink = modal.querySelector('#modalFullProjectLink');
      const closeButton = modal.querySelector('.close-button');
      const modalTitleElement = modal.querySelector('#modalProjectTitle');
      const modalBodyElement = modal.querySelector('#modalProjectBody'); // Get the new body container

      projectItems.forEach(item => {
          item.addEventListener('click', function(event) {
              event.preventDefault();

              const title = this.dataset.title;
              const modalContentTargetId = this.dataset.modalTargetId;
              const hiddenContentElement = document.getElementById(modalContentTargetId);
              const fullProjectPageUrl = this.href; // Get the href from the clicked grid item

              if (modalTitleElement) {
                  modalTitleElement.textContent = title;
              }
              if (hiddenContentElement && modalBodyElement) {
                  modalBodyElement.innerHTML = hiddenContentElement.innerHTML;
              } else if (modalBodyElement) {
                  modalBodyElement.innerHTML = '<p>Details for this project are not available.</p>';
              }

              // Set the modal link
              if (modalFullProjectLink) {
                  modalFullProjectLink.href = fullProjectPageUrl;
                  modalFullProjectLink.style.display = 'block';
              }

              modal.style.display = 'block';
              document.body.style.overflow = 'hidden';
          });
      });

      function closeModal() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
          modalBodyElement.innerHTML = ''; // Clear content when closing
      }

      if (closeButton) {
          closeButton.addEventListener('click', closeModal);
      }
      window.addEventListener('click', function(event) {
          if (event.target === modal) {
              closeModal();
          }
      });
      window.addEventListener('keydown', function(event) {
          if (event.key === 'Escape' && modal.style.display === 'block') {
              closeModal();
          }
      });
  }

  // ... (Your p5.js particle code if it's also in this file and conditionally run) ...
  if (document.getElementById('particle-background')) {
      // p5.js code...
  }
});


    const modalFullProjectLink = modal.querySelector('#modalFullProjectLink'); // <--- ADD THIS LINE

    projectItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            const title = this.dataset.title;
            const modalContentTargetId = this.dataset.modalTargetId;
            const hiddenContentElement = document.getElementById(modalContentTargetId);
            const fullProjectPageUrl = this.href; // <--- ADD THIS LINE - Get the href from the clicked grid item

            // ... (existing code to populate modal title and body) ...
            if (modalTitleElement) { /* ... */ }
            if (hiddenContentElement && modalBodyElement) { /* ... */ } else { /* ... */ }


            // === ADD CODE TO SET HREF AND SHOW THE LINK ===
            if (modalFullProjectLink) {
                modalFullProjectLink.href = fullProjectPageUrl; // Set the link's destination
                modalFullProjectLink.style.display = 'block'; // Make it visible (matches CSS display: block for centering)
            }
            // ==============================================

            modal.style.display = 'block'; // Show the modal
            document.body.style.overflow = 'hidden';
        });
    });

    modal.addEventListener('click', function(e) {
    if (
        e.target === modal ||
        e.target.classList.contains('modal-content')
    ) {
        if (
            modalFullProjectLink &&
            modalFullProjectLink.href &&
            modalFullProjectLink.href !== '#'
        ) {
            window.open(modalFullProjectLink.href, '_blank');
        }
    }
});

    // --- ALSO, HIDE THE LINK AGAIN WHEN THE MODAL CLOSES ---
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalBodyElement.innerHTML = ''; // Clear content

        // Hide the link when modal closes
        if (modalFullProjectLink) {
           modalFullProjectLink.style.display = 'none';
           modalFullProjectLink.href = '#'; // Reset the href (optional)
        }
    }