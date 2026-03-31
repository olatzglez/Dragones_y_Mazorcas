export default class BoardGame {
  /**
   * @param {Object} data - Objeto devuelto por ApiService.getGameSimplified()
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.minPlayers = data.minPlayers;
    this.maxPlayers = data.maxPlayers;
    this.rating = data.rating ? parseFloat(data.rating).toFixed(1) : null;
  }

  /**
   * Devuelve el rango de jugadores formateado
   */
  _playersLabel() {
    if (this.minPlayers && this.maxPlayers) {
      return this.minPlayers === this.maxPlayers
        ? `${this.minPlayers} jugadores`
        : `${this.minPlayers} – ${this.maxPlayers} jugadores`;
    }
    return "N/A";
  }

  /**
   * Devuelve la puntuación con estrellas visuales
   */
  _ratingLabel() {
    if (!this.rating) return "Sin puntuación";
    const stars = Math.round(this.rating / 2); // sobre 5 estrellas
    return `${"★".repeat(stars)}${"☆".repeat(5 - stars)} ${this.rating} / 10`;
  }

  /**
   * Trunca la descripción a un número máximo de caracteres
   */
  _truncateDescription(maxChars = 300) {
    if (!this.description) return "Sin descripción disponible.";
    return this.description.length > maxChars
      ? this.description.slice(0, maxChars).trim() + "…"
      : this.description;
  }

  /**
   * Genera y devuelve el elemento HTML del juego
   * @returns {HTMLElement}
   */
  render() {
    const article = document.createElement("article");
    article.classList.add("boardgame-card");
    article.dataset.id = this.id;

    article.innerHTML = `
      <div class="boardgame-card__header">
        <h2 class="boardgame-card__title">${this.name}</h2>
        <span class="boardgame-card__id">ID: ${this.id}</span>
      </div>

      <div class="boardgame-card__meta">
        <span class="boardgame-card__players">🎲 ${this._playersLabel()}</span>
        <span class="boardgame-card__rating">⭐ ${this._ratingLabel()}</span>
      </div>

      <p class="boardgame-card__description">${this._truncateDescription()}</p>

      
        class="boardgame-card__link"
        href="https://boardgamegeek.com/boardgame/${this.id}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en BGG →
      </a>
    `;

    return article;
  }

  /**
   * Inyecta el HTML del juego en un contenedor del DOM
   * @param {HTMLElement} container
   */
  appendTo(container) {
    container.appendChild(this.render());
  }
}