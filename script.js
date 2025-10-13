function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  let emptySpace = 9;

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) board[i].push("");
  }

  function getBoard() {
    return board;
  }

  function mark(y, x, playerSign) {
    if (board[y][x] == "") {
      board[y][x] = playerSign;
      return 1;
      emptySpace -= 1;
    } else {
      return 0;
    }
  }

  const getEmptySpace = () => {
    return emptySpace;
  };
  //Wil be deleted
  function printBoard() {
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }

  return { getBoard, mark, printBoard, getEmptySpace };
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const board = gameBoard();

  players = [
    { playerName: playerOneName, sign: "X" },
    { playerName: playerTwoName, sign: "O" },
  ];

  activePlayer = players[0];

  const getActivePlayer = () => {
    return activePlayer;
  };

  const changeActivePlayer = () => {
    if (players[0] == activePlayer) {
      activePlayer = players[1];
    } else {
      activePlayer = players[0];
    }
  };

  const checkWin = () => {
    //todo

    boardArr = board.getBoard();

    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        (boardArr[i][0] == boardArr[i][1] &&
          boardArr[i][1] == boardArr[i][2] &&
          boardArr[i][0] != "") ||
        (boardArr[0][i] == boardArr[1][i] &&
          boardArr[1][i] == boardArr[2][i] &&
          boardArr[0][i] != "")
      ) {
        console.log("Win by row or column");
        return 1;
      }
    }
    //check diagonal
    if (
      (boardArr[0][0] == boardArr[1][1] &&
        boardArr[1][1] == boardArr[2][2] &&
        boardArr[0][0] != "") ||
      (boardArr[0][2] == boardArr[1][1] &&
        boardArr[1][1] == boardArr[2][0] &&
        boardArr[1][1] != "")
    ) {
      console.log("Win by diagonal");
      return 1;
    }

    //check tie
    if (board.getEmptySpace == 0) {
      console.log("Tie");
      return 0;
    } else {
      return -1;
    }
  };

  const playRound = (y, x) => {
    succeed = board.mark(y, x, getActivePlayer().sign);
    board.printBoard();

    if (succeed == 1) {
      didWin = checkWin();
      changeActivePlayer();
    } else {
    }
  };

  return { getActivePlayer, playRound, getBoard: board.getBoard };
}

controller = gameController();
