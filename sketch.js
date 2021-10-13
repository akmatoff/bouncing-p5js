const jumpBtn = document.querySelector('#jump')
const leftMoveBtn = document.querySelector('#leftMove')
const rightMoveBtn = document.querySelector('#rightMove')
const gravity = 0.9;

var r;
var groundLevel;
var ground;
var canChangeDirection = false;

function setup() {
  createCanvas(windowWidth, windowHeight)
  groundLevel = windowHeight - 200;
  
  r = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    vx: 0,
    vy: 0,
    color: [random(255), random(255), random(255)],
    bounce: 0.7,
    w: 90,
    h: 90,
    draw: () => {
      fill(r.color[0], r.color[1], r.color[2])
      rect(r.x, r.y, r.w, r.h)
      
      if (r.y > groundLevel - r.h) {
        r.y = groundLevel - r.h
        r.vy *= -r.bounce
        canChangeDirection = false;
        r.color =  [random(255), random(255), random(255)]
      } else if (r.y < 0) {
        r.vy *= -r.bounce
      } else {
        canChangeDirection = true;
      }
      
      if (r.x < 0) {
        r.x = windowWidth
      } else if (r.x > windowWidth) {
        r.x = 0
      }

      if (r.vx > 0) {
        r.vx -= 0.2
      } else if (r.vx < 0) {
        r.vx += 0.2
      }
    }
  }
  
  ground = {
    x: 0,
    y: groundLevel,
    w: 5000,
    h: 200,
    draw: () => {
      fill("#222")
      rect(ground.x, ground.y, ground.w, ground.h)
    }
  }
}

function draw() {
  background("#111")
  
  r.draw()
  r.vy += gravity
  r.y += r.vy
  r.x += r.vx
  
  ground.draw()
}

function keyPressed() {
    
  if (keyCode === 32) {
    r.vy += 25
  } else if (keyCode === 39 && canChangeDirection) {
    r.vx += 5
  } else if (keyCode === 37 && canChangeDirection) {
    r.vx -= 5
  }
  
}
  
function keyReleased() {
  r.vx = 0
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

jumpBtn.addEventListener('click', () => {
  r.vy += 25
})

leftMoveBtn.addEventListener('click', () => {
  r.vx -= 3
})

rightMoveBtn.addEventListener('click', () => {
  r.vx += 3
})