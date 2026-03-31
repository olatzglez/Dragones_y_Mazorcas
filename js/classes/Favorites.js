class Favorites {
  constructor() {
    this.games = [];
  }

  add(game) {
    this.games.push(game);
  }

  getAll() {
    return this.games;
  }
}