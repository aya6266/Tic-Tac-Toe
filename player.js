let player = (() => {
  function NewPlayer(sym, hum, trn) {
    this.symbol = sym;
    this.human = hum;
    this.turn = trn;
  }

  let whosTurn = (player1, player2) =>
    player1.turn === true ? player1 : player2;

  let changeTurn = (player1, player2) => {
    if (player1.turn === true) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player1.turn = true;
      player2.turn = false;
    }
  };

  let winPlayer = (player1, player2) => {
    console.log(whosTurn(player1, player2));
  };
  return { NewPlayer, whosTurn, changeTurn, winPlayer };
})();

export { player };
