import { gameBoard } from "./gameboard.js";
import { player } from "./player.js";
import { computor } from "./minMax.js";

let main = (() => {
  let player1 = new player.NewPlayer("X", true, true);
  let player2 = new player.NewPlayer("O", false, false);

  let letGo = document.querySelector("#let-btn");
  letGo.addEventListener("click", aiOrHuman);

  function aiOrHuman() {
    let aiRadio = document.querySelector("#AI");
    player2.human = aiRadio.checked ? false : true;
    let uiContainer = document.querySelector(".ui-container");
    uiContainer.classList.add("ui-container-off");
  }

  //renders the board
  gameBoard.render();
  gameBoard.updateScore();

  //Create players

  //reset button pressed
  let resBtn = document.querySelector("button");
  resBtn.addEventListener("click", () => {
    gameBoard.resetPressed();
    player1.turn = true;
    player2.turn = false;
    let uiContainer = document.querySelector(".ui-container");
    uiContainer.classList.remove("ui-container-off");
  });

  //Selected square of the board
  let tile = document.querySelectorAll(".square");
  tile.forEach((squ) => {
    squ.addEventListener("click", () => {
      let currPlayer = player.whosTurn(player1, player2);

      if (gameBoard.updateBoard(currPlayer, squ) == false) {
        return;
      }
      let gameOver = gameBoard.checkWinnner(currPlayer, squ);

      let res;
      if (gameOver === true) {
        res = "winner";
        gameBoard.displayWinner(res, currPlayer);
        gameBoard.score(currPlayer);
        gameBoard.updateScore();
        setTimeout(() => {
          gameBoard.makeNewBoard();
        }, 500);

        if (player2.human == true) {
          player1.turn = false;
          player2.turn = true;
        }
      } else if (gameOver === "draw") {
        res = "draw";
        gameBoard.displayWinner(res, currPlayer);
        setTimeout(() => {
          gameBoard.makeNewBoard();
        }, 500);

        if (player2.human == true) {
          player1.turn = false;
          player2.turn = true;
        }
        return;
      }
      //check if against an comp
      if (player2.human == false) {
        let aiSqu = computor.aiMove();
        gameBoard.updateBoard(player2, aiSqu);
        let aiOver = gameBoard.checkWinnner(player2, aiSqu);
        if (aiOver === true) {
          res = "winner";
          gameBoard.displayWinner(res, player2);

          gameBoard.score(player2);
          gameBoard.updateScore();
          setTimeout(() => {
            gameBoard.makeNewBoard();
          }, 500);
        } else if (gameOver === "draw") {
          res = "draw";
          gameBoard.displayWinner(res, currPlayer);
          setTimeout(() => {
            gameBoard.makeNewBoard();
          }, 500);
        }
      } else {
        player.changeTurn(player1, player2);
      }
    });
  });

  return {
    player1,
    player2,
  };
})();
