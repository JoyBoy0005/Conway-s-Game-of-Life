function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let currentFrameRate = 10; // Default frame rate

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2)); // Initialize grid with random states
    }
  }

  frameRate(currentFrameRate); // Set initial frame rate
}

function draw() {
  background(0);

  // Draw the current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] === 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  // Calculate the next state of the grid
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      // Apply Conway's Game of Life rules
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1; // Reproduction
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0; // Underpopulation or overpopulation
      } else {
        next[i][j] = state; // Stasis
      }
    }
  }

  grid = next; // Update grid for next generation
}

// Function to count live neighbors
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the current cell

      let col = (x + i + cols) % cols; // Wrap around horizontally
      let row = (y + j + rows) % rows; // Wrap around vertically
      sum += grid[col][row];
    }
  }
  return sum;
}

// Function to update frame rate dynamically
function updateFrameRate(value) {
  currentFrameRate = parseInt(value); // Parse value from the range input
  frameRate(currentFrameRate); // Apply the new frame rate
  document.getElementById("fps-value").innerText = value; // Update display
}

