const rls = require('readline-sync');

/* Requirements: Part 2
Only go to this step when you have successfully finished part 1.

Now we are going to make the game a little more realistic.

Rewrite the code so that we use letters A-J and numbers 1-10. This will create a 100 unit grid.
If you haven't already, create a function that builds the grid. This function will take a single number argument to build the grid accordingly. (i.e. buildGrid(3) will create a 3x3 grid (9 units), buildGrid(5) will create a 5x5 grid (25 units) buildGrid(10) creates a 10x10 (100 units), etc). 
The computer will now place multiple ships in this format:
One two-unit ship
Two three-unit ships
One four-unit ship
One five-unit ship
Keep in mind that your code cannot place two ships on intersecting paths
Ship placement should be random (horizontally and vertically placed) and not manually placed by you in the code
Ships must be placed within the grid boundaries
The game works as before, except now, all ships must be destroyed to win
*/

// VARIABLES

let board = [];
let shipsPlaced = 0;
let turn = 0;

// FUNCTIONS


class Board {
  constructor(size) {
    for (let i = 0; i < size + 1; i++) {
      board.push([]);
      for (let j = 0; j < size + 1; j++) {
        board[i].push('-');
        board[i][0] = String.fromCharCode(i + 64);
      }
      board[0] = [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      board[0].length = size + 1;
    }
  }
}

function buildBoard(size) {
  new Board(size);
  console.log(board);
}


function placeShips() {
  shipsPlaced = 0;
  while (shipsPlaced < board.length / 2) {
    const shipLength = 1;
    const shipPositions = [];
    while (shipPositions.length < shipLength) {
      const row = Math.floor(Math.random() * board.length);
      const col = Math.floor(Math.random() * board.length);
      if (!shipPositions.some(pos => pos[0] === row && pos[1] === col) && board[row][col] === '-') {
        shipPositions.push([row, col]);
      }
    }
    shipPositions.forEach(pos => board[pos[0]][pos[1]] = 'o');
    shipsPlaced++;
  }
}

function printBoard() {
  console.log('\n');
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(' '));
  }
  console.log('\n');
}



function clearBoard() {
  board = [];
  turn = 0;
}

function handleInput() {
  turn += 1;
  console.log('Turn: ' + turn);
  let userInput = rls.question("Enter a location to strike (ie. 'A2')");
  console.log(userInput[0], userInput[1]);
  const row = userInput[0].toUpperCase().charCodeAt(0) - 64;
  const col = Number.parseInt(userInput[1] + userInput[2]);
  console.log(row, col);
  if (board[row][col] === 'o') {
    shipsPlaced -= 1;
    board[row][col] = 'X';
    console.log(`Hit! You have sunk a battleship. ${shipsPlaced} ship(s) remaining.`);
  } else if (board[row][col] === 'X' || board[row][col] === 'x') {
    console.log("You have already picked this location. Miss!")
  } else if (board[row][col] === '-'){
    board[row][col] = 'x';
    console.log("You have missed!");
  } else {
    console.log('Invalid position');
  };
  printBoard();
  return true;
}


// SCRIPT


rls.keyInPause('Press any key to start the game');
console.log('Size of the board?');
buildBoard(rls.questionInt());
placeShips();
printBoard();
while (handleInput()) {
  if (shipsPlaced === 0) {
    const newGame = rls.keyInYN('You have destroyed all battleships. Would you like to play again? Y/N');
    if (newGame) {
      clearBoard();
      console.log('Size of the board?');
      buildBoard(rls.questionInt());
      placeShips();
      printBoard();
      return;
    } else {
      return false;
    }
  }
}
  