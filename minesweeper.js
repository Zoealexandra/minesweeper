document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/*var board = {
  cells: [
    { row: 0, col: 0, isMine: true, hidden: true},
    { row: 0, col: 1, isMine: false, hidden: true},
    { row: 0, col: 2, isMine: false, hidden: true},
    { row: 1, col: 0, isMine: false, hidden: true},
    { row: 1, col: 1, isMine: false, hidden: true},
    { row: 1, col: 2, isMine: false, hidden: true},
    { row: 2, col: 0, isMine: true, hidden: true},
    { row: 2, col: 1, isMine: false, hidden: true},
    { row: 2, col: 2, isMine: false, hidden: true}
  ]
}*/


var board = {cells: []}
var height = 4
var width = 4
var numMines = 4
generateBoard()
placeMine()

/*//function to randomise size of board
var boardSize = getRandomArbitrary(2, 6)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}*/

//function to generate board
function generateBoard() {
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: false,
        hidden: true
      })
    }  
  }
}

//function to place mines
function placeMine () {
var placed = 0;

  do
    {
      var k = Math.floor(Math.random() * height * width);    // Select a random cell
        if (board.cells[k].isMine != true) // Make sure the cell doesn't already have a mine.
          {
          board.cells[k].isMine = true;    // Set the mine
          placed++;                        // and increase the count
          }        
    } 
    while (placed < numMines);
  }



  /*        Board.prototype.plantMines = function () {
            var minesPlanted = 0;

            while (minesPlanted < this.mineCount) {
                var index = this.getRandomNumber(this.dimension * this.dimension);

                if (!this.fields[index].isMine) {
                    this.fields[index].isMine = true;
                    minesPlanted++;
                }
            }
        }; */


function startGame () {
  // Don't remove this function call: it makes the game work!
for (var i = 0; i < board.cells.length; i++) {
  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  } 

  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
    for (var i = 0; i < board.cells.length; i++) {
      if (board.cells[i].isMine && !board.cells[i].isMarked) { 
          return;
      } else if (!board.cells[i].isMine && board.cells[i].hidden) {
        return;
      }
    }
    lib.displayMessage('Winner!')
}
      // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!) 
    //   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;

  for (var j = 0; j < surroundingCells.length; j++) {
    if (surroundingCells[j].isMine) {
      count += 1;
    }
  }

  return count;
}

function reset() {
  location.reload();
}
