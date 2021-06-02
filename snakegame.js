const btn = document.getElementById("btn")
const boardBorder = 'black';
const boardBackground = "white";
const snakeCol = 'lightblue';
const snakeBorder = 'darkblue';
const snakeboard = document.getElementById("snakeboard");
const snakeboardCtx = snakeboard.getContext("2d");
let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ];
let score = 0;
let changingDirection = false;
    let foodX;
    let foodY;
    let dx = 10;
    let dy = 0;


    main();
    genFood();

document.addEventListener("keydown", changeDirection);
    
    function main() {

        if (hasGameEnded()) return;

        changingDirection = false;
        setTimeout(function onTick() {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        main();
      }, 100)
    }

     function clearBoard() {
      snakeboardCtx.fillStyle = boardBackground;
      snakeboardCtx.strokestyle = boardBorder;
      snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
      snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

     function drawSnake() {
      snake.forEach(drawSnakePart)
    }

    function drawFood() {
      snakeboardCtx.fillStyle = 'lightgreen';
      snakeboardCtx.strokestyle = 'darkgreen';
      snakeboardCtx.fillRect(foodX, foodY, 10, 10);
      snakeboardCtx.strokeRect(foodX, foodY, 10, 10);
    }
     function drawSnakePart(snakePart) {

snakeboardCtx.fillStyle = snakeCol;
snakeboardCtx.strokestyle = snakeBorder;
snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
for (let i = 4; i < snake.length; i++) {
  if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
}
const hitLeftWall = snake[0].x < 0;
const hitRightWall = snake[0].x > snakeboard.width - 10;
const hitToptWall = snake[0].y < 0;
const hitBottomWall = snake[0].y > snakeboard.height - 10;
return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function randomFood(min, max) {
return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function genFood() {
foodX = randomFood(0, snakeboard.width - 10);
foodY = randomFood(0, snakeboard.height - 10);
snake.forEach(function hasSnakeEatenFood(part) {
  const hasEaten = part.x == foodX && part.y == foodY;
  if (hasEaten) genFood();
});
}

function changeDirection(event) {
const leftKey = 37;
const rightKey = 39;
const upKey = 38;
const downKey = 40;


if (changingDirection) return;
changingDirection = true;
const keyPressed = event.keyCode;
const goingUp = dy === -10;
const goingDown = dy === 10;
const goingRight = dx === 10;
const goingLeft = dx === -10;
if (keyPressed === leftKey && !goingRight) {
  dx = -10;
  dy = 0;
}
if (keyPressed === upKey && !goingDown) {
  dx = 0;
  dy = -10;
}
if (keyPressed === rightKey && !goingLeft) {
  dx = 10;
  dy = 0;
}
if (keyPressed === downKey && !goingUp) {
  dx = 0;
  dy = 10;
}
}

function moveSnake() {
const head = {x: snake[0].x + dx, y: snake[0].y + dy};
snake.unshift(head);
const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
if (hasEatenFood) {
  score += 1;
  document.getElementById('score').innerHTML = score;
  genFood();
} else {
  snake.pop();
}
}

btn.addEventListener("click", e=>{
    e.preventDefault();
    window.location.reload();
})  