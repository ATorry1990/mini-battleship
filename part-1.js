const rls = require('readline-sync');

/* Requirements: Part 1
When the application loads, print the text, "Press any key to start the game."
When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
The prompt will then say, "Enter a location to strike ie 'A2' "
The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
If there is not a ship at that location the prompt will read, "You have missed!"
If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
If "Y" is selected the game starts over. If "N" then the application ends itself. */

// VARIABLES

let board = [];
let shipsPlaced = 0;
let turn = 0;

// FUNCTIONS


class Board {
  constructor(size) {
    for (let i = 0; i < size; i++) {
      board.push([]);
      for (let j = 0; j < size; j++) {
        board[i].push('-');
      }
    }
  }
}

function buildBoard(size) {
  new Board(size);
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
  const row = userInput[0].toUpperCase().charCodeAt(0) - 65;
  const col = userInput[1] - 1;
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
      return true;
    } else {
      return false;
    }
  }
}
  