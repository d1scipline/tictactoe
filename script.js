function createGameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) board[i].push("");
  }

  function getBoard() {
    return board;
  }

  function mark(y, x, playerSign) {
    board[y][x] = playerSign;
  }

  //Wil be deleted
  function printBoard() {
    console.log(board);
  }

  return { getBoard, mark, printBoard };
}
