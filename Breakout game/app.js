const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const blockWidh = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
let timerId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurentPosition = ballStart;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidh, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidh, yAxis + blockHeight];
  }
}

//all blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

//draw single blocks
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}
addBlock();

//add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//draw user block
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurentPosition[0] + "px";
  ball.style.bottom = ballCurentPosition[1] + "px";
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - 100) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  ballCurentPosition[0] += xDirection;
  ballCurentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//check for collision
function checkForCollisions() {
  //check for block colisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      (ballCurentPosition[0] > blocks[i].bottomLeft[0] && ballCurentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurentPosition[1] < blocks[i].topLeft[1])
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
      score++
      scoreDisplay.innerHTML = score

      //chekc for win
      if(blocks.length === 0){
        scoreDisplay.innerHTML = "You won the game"
        clearInterval(timerId)
        document.removeEventListener("keydown", moveUser)
      }


    }
  }

  //check for wall collisions
  if (
    ballCurentPosition[0] >= boardWidth - ballDiameter ||
    ballCurentPosition[1] >= boardHeight - ballDiameter ||
    ballCurentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //check for user collisions

  if(
    (ballCurentPosition[0] > currentPosition[0] && ballCurentPosition[0] < currentPosition[0] + blockWidh) &&
    (ballCurentPosition[1] > currentPosition[1] && ballCurentPosition[1] < currentPosition[1] + blockHeight)
  ){
    changeDirection()
  }

  //chaeck for game over
  if (ballCurentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose xD";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }

  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  
}
 