/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    // pushing a new item onto the board array
    // creating a new array from an object
    // array of arrays is the board
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");

  // TODO: add comment for this code
  // creates a table row at the very top and adds an event listener for each column
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // iterates over the x axis (width) and create the table cells in the board game
  // each column in the table has a unique id
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  // creates the game board's height and width
  for (let y = 0; y < HEIGHT; y++) {
    // creates rows that have cells
    const row = document.createElement("tr");
    // iterates over columns and creates cells in the columns
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      // using y and x inside the string
      // we're using string interpolation because it is cleaner
      // unique id based on it's coordinates
      // generating a table or list in JS
      // manipulating items through a click event, then generate a unique id for each item inside the for loop
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // return 0;
  // loop through the rows and if the spot is null, return y
  // find the lowest empty spot in the game board and return y or null if the column is filled

  // board at index i is an array, and use x to index into that array

  for (let i = board.length - 1; i >= 0; i--) {
    if (!board[i][x]) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  // positioning the piece so it occurs correctly
  // effects the vertical position of the element, the pixel number, the table cell
  // top attribute for the piece will be an integer
  piece.style.top = -50 * (y + 2);

  // setting the id
  // fetch the unique table cells
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // alert(msg);
  console.log(msg);
  setTimeout(function () {
    alert(msg);
  }, 650);
  // set timeout so the alert comes a bit later
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // + is the shorthand for converting string from a number "3" => 3

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie (with every method)
  // TODO: check if all cells in board are filled; if so call, call endGame

  // check top row, if it's full, then can be a tie, don't have to check every cell

  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("It's a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2 (with ternary function)
  // check if currPlayer === currPlayer
  // if it's 1, switch to 2
  // : is else, change to 1
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // loop through each cell on the game board and defines a win that is horizontal, vertical, diagnoal(right), or diagonal(left) win for that cell
  // if there is a win in any direction, the function will return true

  // to OPTIMIZE - if the place is not occupied, don't check the combination, first check if the place is occupied

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      // find a winner by cheking each winning possibility as needed
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

let startover = document.getElementById("startover");
startover.addEventListener("click", function () {
  location.reload();
});

makeBoard();
makeHtmlBoard();
