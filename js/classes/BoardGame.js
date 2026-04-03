import Game from "./Game.js";

export default class BoardGame extends Game {
  constructor({
    id,
    name,
    year,
    minPlayers,
    maxPlayers,
    minPlaytime,
    maxPlaytime,
    image,
    thumbnail,
    description,
    minAge,
    categories,
    mechanics,
    publishers,
    language,
    rating,
    rank,
  }) {
    // Llamamos al constructor de Game con las propiedades base
    super(
      id,
      name,
      { min: minPlayers, max: maxPlayers },
      { min: minPlaytime, max: maxPlaytime },
      image
    );

    // Propiedades específicas de BoardGame
    this.year        = year;
    this.thumbnail   = thumbnail;
    this.description = description;
    this.minAge      = minAge;
    this.categories  = categories  ?? [];
    this.mechanics   = mechanics   ?? [];
    this.publishers  = publishers  ?? [];
    this.language    = language    ?? [];
    this.rating      = rating      ?? { average: null, votes: null, weight: null };
    this.rank        = rank        ?? null;
  }

  // ── Métodos ────────────────────────────────────────

  // Devuelve la puntuación media formateada
  getRating() {
    return this.rating.average
      ? parseFloat(this.rating.average).toFixed(1)
      : "Sin puntuación";
  }

  // Devuelve el número de votos formateado
  getVotes() {
    return this.rating.votes
      ? Number(this.rating.votes).toLocaleString()
      : "0";
  }

  // Devuelve la complejidad formateada
  getWeight() {
    return this.rating.weight
      ? `${parseFloat(this.rating.weight).toFixed(2)} / 5`
      : "—";
  }

  // Devuelve el rango de jugadores formateado
  getPlayers() {
    return this.players.max
      ? `${this.players.min}–${this.players.max}`
      : this.players.min ?? "—";
  }

  // Devuelve la duración formateada
  getPlaytime() {
    return this.playtime.max
      ? `${this.playtime.min}–${this.playtime.max} min`
      : this.playtime.min ? `${this.playtime.min} min` : "—";
  }

  // Devuelve la edad mínima formateada
  getMinAge() {
    return this.minAge ? `+${this.minAge} años` : "—";
  }

  // Devuelve el ranking formateado
  getRank() {
    return this.rank ? `#${this.rank}` : "—";
  }

  // Devuelve la descripción limpia y recortada
  getDescription(maxLength = 500) {
    const clean = (this.description ?? "Sin descripción.")
      .replace(/&amp;/g, "&")
      .replace(/&mdash;/g, "—")
      .replace(/&#10;/g, " ")
      .trim();

    return clean.length > maxLength
      ? clean.substring(0, maxLength) + "..."
      : clean;
  }

  // Convierte el objeto a un formato plano para guardarlo en localStorage
  toJSON() {
    return {
      id:          this.id,
      name:        this.name,
      year:        this.year,
      minPlayers:  this.players.min,
      maxPlayers:  this.players.max,
      minPlaytime: this.playtime.min,
      maxPlaytime: this.playtime.max,
      image:       this.image,
      thumbnail:   this.thumbnail,
      description: this.description,
      minAge:      this.minAge,
      categories:  this.categories,
      mechanics:   this.mechanics,
      publishers:  this.publishers,
      language:    this.language,
      rating:      this.rating,
      rank:        this.rank,
    };
  }

  // Reconstruye un BoardGame desde un objeto plano (localStorage)
  static fromJSON(data) {
    return new BoardGame(data);
  }
}