import BoardGame from "../js/classes/BoardGame.js";

const app = document.getElementById("app");

const game = new BoardGame({
  id: 13,
  name: "Catan",
  description: "Juego de estrategia...",
  minPlayers: 3,
  maxPlayers: 4,
  rating: 7.8
});

game.appendTo(app);