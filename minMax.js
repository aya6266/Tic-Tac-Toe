import {gameBoard} from "./gameboard.js"

let computor = (() => {

  let currPlayer = 'O'
  let otherPlayer = "X"
  let board
  
  let aiMove = () => {
    board = gameBoard.board
    let res = minMax(board, true)
    return res.index
  }

  let minMax = (board, maxPlayer) => {
    let emptySpace = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") emptySpace.push(`${i}${j}`);
      }
    }
    
    if(evalute(board, otherPlayer)){
      return {score: -10}
    }else if(evalute(board, currPlayer)){
      return{score: 10};
    }else if(emptySpace.length == 0){
      return{score: 0};
    }
    



    let moves = [];
    for(let i = 0; i < emptySpace.length; i++){
      let move = {};
      move.index = emptySpace[i];
      if(maxPlayer == true){
        board[emptySpace[i][0]][emptySpace[i][1]] = currPlayer
        let res = minMax(board, false)
        move.score = res.score
      }
      else{
        board[emptySpace[i][0]][emptySpace[i][1]] = otherPlayer
        let res = minMax(board, true)
        move.score = res.score
      }
    board[emptySpace[i][0]][emptySpace[i][1]] = ""

    moves.push(move);
    
    }

    let bestMove;

    if(maxPlayer == true){
      let bestScore = -Infinity
      for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score
          bestMove = i;
        }
      }
    }
    else {
      var bestScore = Infinity;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
      
  };
  return moves[bestMove];
}

  

  let evalute = (board, player) => {
    let hashRes = {
      row: {
        0: [],
        1: [],
        2: [],
      },
      col: {
        0: [],
        1: [],
        2: [],
      },
      dia: [],
      antiDia: [],
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == player) {
          let stringCord = `${i}${j}`;
          hashRes.row[i].push(stringCord);
          hashRes.col[j].push(stringCord);
          if (stringCord == "00" || stringCord == "11" || stringCord == "22")
            hashRes.dia.push(stringCord);
          if (stringCord == "02" || stringCord == "11" || stringCord == "20")
            hashRes.antiDia.push(stringCord);
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (hashRes.row[i].length == 3 || hashRes.col[i].length == 3) {
        
        return true;
      }
    }
    if (hashRes.dia.length == 3 || hashRes.antiDia.length == 3) {
      

      //console.log({ hashRes, currPlayerSymbol });
      return true;
    }

    return false;
  }


  return {minMax, evalute, currPlayer, otherPlayer, board, aiMove};

})();

export { computor };
