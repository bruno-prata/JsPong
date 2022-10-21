//ball variables
let xBall = 300;
let yBall = 200;
let radius = 10;

//ball velocity
let velocityXBall = 4;
let velocityYBall = 4;

//canvas size
let width = 600;
let height = 400;

//sounds
let pad;
let plusPoint;

//paddle variables
let widthPaddle = 10;
let heightPaddle = 60;
let xPaddle = 2;
let yPaddle = height/2 - heightPaddle/2;

//opponent paddle variables
let xOpPaddle = width - widthPaddle - 2;
let yOpPaddle = height/2 - heightPaddle/2;
let velocityOpPaddle = velocityYBall * 0.70;

//Score
let myPoints = 0;
let opPoints = 0;

let hit = false;

function preload() {
  pad = loadSound("/sounds/pad.mp3");
  plusPoint = loadSound("/sounds/point.mp3");
}

function setup() {
  createCanvas(width, height);
}

function draw() {
  background(0);
  createBall();
  createPaddle(xPaddle, yPaddle);
  createPaddle(xOpPaddle, yOpPaddle);
  movementBall();
  borderCollisionBall();
  paddleMovement();
  collidePaddle(xPaddle, yPaddle);
  collidePaddle(xOpPaddle, yOpPaddle);
  movementOpPaddle ();
  score();
  addPoint()

}

function createBall (){
  circle(xBall, yBall, (2*radius));
  
}

function createPaddle (x, y) {
  rect(x, y, widthPaddle, heightPaddle);
  
}

function movementBall(){
    xBall += velocityXBall;
    yBall += velocityYBall;
  
}

function borderCollisionBall(){
  if ( xBall + radius > width || xBall - radius < 0 ){
    velocityXBall *= -1;
  }
  
  if ( yBall + radius > height || yBall - radius < 0 ){
    velocityYBall *= -1;
  }

}

function paddleMovement() {
  if(keyIsDown(UP_ARROW)){ 
    if (yPaddle > 5){
          yPaddle -= 10;
    }
  }
  if(keyIsDown(DOWN_ARROW)){
    if (yPaddle < height - heightPaddle){
          yPaddle += 10;
    }
  }
}

function collidePaddle(x, y) {
hit = collideRectCircle(x, y, widthPaddle, heightPaddle, xBall, yBall, radius);
    if (hit) {
        //pad.play();
        velocityXBall *= -1;

}
}

function movementOpPaddle () {
  if (velocityXBall > 0){
    if (yBall > heightPaddle/2 && yBall < height - heightPaddle/2){
      if (yOpPaddle + heightPaddle/2 < yBall){
      yOpPaddle += velocityOpPaddle;
      }
      if (yOpPaddle + heightPaddle/2 > yBall){
      yOpPaddle -= velocityOpPaddle;
      }
    }
  }
}

function score() {
  stroke (255);
  textSize(16);
  textAlign (CENTER);
    fill(color(255, 140, 0));
  rect(250, 15, 40, 20);
    fill(color(255, 140, 0));
  rect(350, 15, 40, 20);
    fill(255);
  text(myPoints, 270, 30);
  text(opPoints, 370, 30);
}

function addPoint() {
  if (xBall > 590) {
        myPoints += 1;
        //plusPoint.play();
        xBall = 300;
        yBall = 200;
    }
    if (xBall < 10) {
        opPoints += 1;
        //plusPoint.play();
        xBall = 300;
        yBall = 200;
    }
}