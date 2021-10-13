const jumpBtn = document.querySelector('#jump')
const leftMoveBtn = document.querySelector('#leftMove')
const rightMoveBtn = document.querySelector('#rightMove')
const gravity = 0.9;

var r;
var obstacles = []
var groundLevel;
var ground;
var canChangeDirection = false;
var keysPressed = {}

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
      noStroke()
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

  setInterval(() => {
    obstacle = new Obstacle(windowWidth + 200, groundLevel, 50, random(60, 160))
    obstacles.push(obstacle)
  }, random(3000, 5000))
  
  ground = {
    x: 0,
    y: groundLevel,
    w: 5000,
    h: 200,
    draw: () => {
      noStroke()
      fill("#222")
      rect(ground.x, ground.y, ground.w, ground.h)
    }
  }
}

function Obstacle(x, y, w, h) {
  this.x = x
  this.y = y - h
  this.w = w
  this.h = h

  this.draw = () => {
    noStroke()
    fill('#ffffff')
    rect(this.x, this.y, this.w, this.h)
  }
} 

function draw() {
  background("#111")
  
  r.draw()
  r.vy += gravity
  r.y += r.vy
  r.x += r.vx
  
  ground.draw()

  obstacles.forEach((o) => {
    o.draw()
    o.x -= 2
  })
}

function keyPressed() {

  keysPressed[keyCode] = true

  console.log(keysPressed)

  if (keysPressed[32]) {
    r.vy += 25
  } else if (keysPressed[39] && canChangeDirection) {
    r.vx += 5
  } else if (keysPressed[37] && canChangeDirection) {
    r.vx -= 5
  } 
}
  
function keyReleased() {
  delete keysPressed[keyCode]

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