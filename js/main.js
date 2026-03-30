import ApiService from "./ApiService.js";

const api = new ApiService();

async function init() {
  const games = await api.searchGamesSimplified("catan");

  console.log("Juegos:", games);

  if (games.length > 0) {
    const details = await api.getGameSimplified(games[0].id);
    console.log("Detalle:", details);
  }
}

init();