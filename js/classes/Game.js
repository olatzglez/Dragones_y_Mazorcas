export default class Game {
  constructor(id, name, players, playtime, image) {
    this.id       = id;
    this.name     = name;
    this.players  = players;  // { min, max }
    this.playtime = playtime; // { min, max }
    this.image    = image;
  }

  // Devuelve un resumen básico del juego
  getInfo() {
    const players  = this.players.max
      ? `${this.players.min}–${this.players.max}`
      : this.players.min ?? "—";

    const playtime = this.playtime.max
      ? `${this.playtime.min}–${this.playtime.max} min`
      : this.playtime.min ? `${this.playtime.min} min` : "—";

    return `${this.name} | ${players} jugadores | ${playtime}`;
  }
}