class Game {
  constructor(id, name, players, playtime, image) {
    this.id = id;
    this.name = name;
    this.players = players;
    this.playtime = playtime;
    this.image = image;
  }

  getInfo() {
    return `${this.name} - ${this.players} jugadores`;
  }
}