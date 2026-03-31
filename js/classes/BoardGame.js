class BoardGame extends Game {
  constructor(id, name, players, playtime, image, category) {
    super(id, name, players, playtime, image);
    this.category = category;
  }

  getCategory() {
    return this.category;
  }
}