const grid = document.querySelector(".grid");
const startBtn = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let timerId = 0;
let speed = 0.9;

// fill the grid with small squares => they dont have a color
function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

// add snakes color for every square snake currently occupies
currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");

  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  intervalTime = 1000;
  generateApples();

  currentSnake.forEach((index) => squares[index].classList.add("snake"));

  // make the snake move =>
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    // stop snake when hits borders or itself
    (currentSnake[0] + width >= 100 && direction === width) ||
    (currentSnake[0] % width === 9 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  // usual behavior on game start => moves right
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  // snake eats apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * 0.9;
    timerId = setInterval(move, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    // generate a random number
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApples();

function control(e) {
  switch (e.key) {
    case "ArrowLeft":
      direction = -1;
      break;
    case "ArrowUp":
      direction = -width;
      break;
    case "ArrowRight":
      direction = 1;
      break;
    case "ArrowDown":
      direction = width;
      break;
    default:
      return;
  }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
