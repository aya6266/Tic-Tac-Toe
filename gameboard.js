let gameBoard = (() => {
  //array of the board
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let XTotal = 0;
  let OTotal = 0;

  let score = (winner) => {
    winner.symbol == "X" ? XTotal++ : OTotal++;
  };

  let updateScore = () => {
    let xContainer = document.querySelector("#X-total");
    let oContainer = document.querySelector("#O-total");

    xContainer.innerText = `X: ${XTotal} points`;
    oContainer.innerText = `O: ${OTotal} points`;
  };

  let makeNewBoard = (res = true) => {
    let fillSqur = document.querySelectorAll(".square");
    fillSqur.forEach((val) => (val.innerText = ""));

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }

    drawCount.clear();
    if ((res = true)) setTimeout(() => removeRes(), 1500);
  };

  //sets of the locations of the X and O coordinates
  let drawCount = new Set();

  let render = () => {
    let gameBoardContainer = document.querySelector(".board-container");
    let row = 0;
    let col = 0;
    let tracker = 1;
    for (let i = 0; i < 9; i++) {
      let square = document.createElement("div");
      square.innerText = board[row][col];
      square.className = `square ${row.toString() + col.toString()}`;
      gameBoardContainer.appendChild(square);
      col++;
      if (tracker % 3 === 0) {
        row++;
        col = 0;
      }
      tracker++;
    }
  };

  // let updateBoard = (player, board) => {};
  let updateBoard = (player, squ) => {
    if (typeof squ !== "object") {
      let squares = document.querySelectorAll(".square");
      squares.forEach((squae) => {
        if (squae.classList[1] == squ) {
          squ = squae;
        }
      });
    }
    let row = squ.classList[1][0];
    let col = squ.classList[1][1];

    //Update board array and div
    if (board[row][col] == "") {
      board[row][col] = player.symbol;
      // squ.className = `square ${row + col} hover`;
      // setTimeout(() => {squ.className = `square ${row + col} active`}, 200);
      // setTimeout(() => {
      //   squ.className = `square ${row + col}`
      //   squ.innerText = player.symbol
      // }, 200);
      squ.innerText = player.symbol;
    } else {
      return false;
    }
  };

  //checks if game is complete
  let checkWinnner = (currPlayer, squ) => {
    if (typeof squ !== "object") {
      let squares = document.querySelectorAll(".square");
      squares.forEach((squae) => {
        if (squae.classList[1] == squ) {
          squ = squae;
        }
      });
    }
    //console.log(squ.classList);
    let row = squ.classList[1][0];
    let col = squ.classList[1][1];
    let coord = `${row.toString()}${col.toString()}`;

    //Add to set
    drawCount.add(coord);

    //totals
    let colTotal = 0;
    let rowTotal = 0;
    let diaTotal = 0;
    let antiDiaTotal = 0;

    //check colmuns
    for (let i = 0; i < 3; i++) {
      board[row][i] === currPlayer.symbol ? colTotal++ : null;
    }

    //check rows
    for (let i = 0; i < 3; i++) {
      board[i][col] === currPlayer.symbol ? rowTotal++ : null;
    }

    //check diagnols
    if (
      board[0][0] === currPlayer.symbol &&
      board[1][1] === currPlayer.symbol &&
      board[2][2] === currPlayer.symbol
    ) {
      diaTotal = 3;
    }

    //check antidiagnols
    if (
      board[2][0] === currPlayer.symbol &&
      board[1][1] === currPlayer.symbol &&
      board[0][2] === currPlayer.symbol
    ) {
      antiDiaTotal = 3;
    }

    let highest = Math.max(colTotal, rowTotal, diaTotal, antiDiaTotal);

    if (highest == 3) return true;

    if (drawCount.size == 9) return "draw";

    return false;
  };

  //renders results
  let displayWinner = (res, currPlayer) => {
    let resContainer = document.querySelector(".results-container");
    let result = document.createElement("div");
    result.className = "res";
    if (res === "draw") {
      result.innerText = "draw";
    } else {
      result.innerText = `${currPlayer.symbol} is the Winner!!`;
    }
    resContainer.appendChild(result);
  };

  let removeRes = () => {
    let res = document.querySelector(".res");
    res.remove();
  };

  let resetPressed = () => {
    makeNewBoard(false);
    OTotal = 0;
    XTotal = 0;
    updateScore();
  };

  return {
    render,
    updateBoard,
    checkWinnner,
    displayWinner,
    board,
    drawCount,
    makeNewBoard,
    removeRes,
    score,
    updateScore,
    resetPressed,
  };
})();

export { gameBoard };
