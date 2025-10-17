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
      emptySpace = emptySpace - 1;
      return 1;
    } else {
      return 0;
    }
  }

  const getEmptySpace = () => {
    return emptySpace;
  };

  const reset = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) board[i].push("");
    }
    emptySpace = 9;
  };

  return { getBoard, mark, getEmptySpace, reset };
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
      return 1;
    }

    //check tie
    if (board.getEmptySpace() == 0) {
      return 0;
    } else {
      return -1;
    }
  };

  const playRound = (y, x) => {
    succeed = board.mark(y, x, getActivePlayer().sign);
    if (succeed == 1) {
      didWin = checkWin();
      if (didWin == 1) {
        return 1;
      } else {
        if (didWin == 0) {
          return 0;
        } else {
          changeActivePlayer();
        }
      }
    } else {
      return -1;
    }
  };

  const restart = () => {
    board.reset();
    activePlayer = players[0];
  };

  return {
    getActivePlayer,
    playRound,
    getBoard: board.getBoard,
    reset: board.reset,
    restart,
  };
}

function screenController() {
  controller = gameController();
  const boardDOM = document.querySelector(".board");
  const resetButton = document.querySelector("button");

  const updateScreen = () => {
    const board = controller.getBoard();

    boardDOM.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      let y = document.createElement("div");
      y.setAttribute("class", "y");
      boardDOM.appendChild(y);
      for (let j = 0; j < 3; j++) {
        let x = document.createElement("div");
        x.setAttribute("class", "x");
        x.setAttribute("data-y", i);

        x.setAttribute("data-x", j);

        if (board[i][j] == "X") {
          x.setAttribute("mark", "X");
        }
        if (board[i][j] == "O") {
          x.setAttribute("mark", "O");
        }
        y.appendChild(x);
      }
    }
  };

  const clickHandler = (e) => {
    let y = e.target.getAttribute("data-y");
    let x = e.target.getAttribute("data-x");
    win = controller.playRound(y, x);
    updateScreen();
    if (win == 1) {
      player = controller.getActivePlayer().playerName;
      setTimeout(() => alert(player + " won!"));
      controller.reset();
    }
    if (win == 0) {
      setTimeout(() => alert("Tie!"));
      controller.reset();
    }
  };

  const resetFunc = (e) => {
    controller.restart();
    updateScreen();
  };

  boardDOM.addEventListener("click", clickHandler);
  resetButton.addEventListener("click", resetFunc);
  updateScreen();
}

screenController();
