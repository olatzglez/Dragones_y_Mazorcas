import BoardGame from "./BoardGame.js";

export default class Favorites {
  constructor() {
    this.storageKey = "bgg_favorites";
    this.games      = this._loadFromStorage();
  }

  // ── Métodos principales ────────────────────────────

  // Añade un juego a favoritos (si no está ya)
  add(game) {
    if (this.isFavorite(game.id)) return false;
    this.games.push(game);
    this._saveToStorage();
    return true;
  }

  // Elimina un juego de favoritos por su id
  remove(id) {
    const before = this.games.length;
    this.games   = this.games.filter(g => g.id !== id);
    if (this.games.length < before) {
      this._saveToStorage();
      return true;
    }
    return false;
  }

  // Devuelve todos los juegos favoritos
  getAll() {
    return this.games;
  }

  // Comprueba si un juego ya está en favoritos
  isFavorite(id) {
    return this.games.some(g => g.id === id);
  }

  // Devuelve el número de favoritos
  count() {
    return this.games.length;
  }

  // Vacía todos los favoritos
  clear() {
    this.games = [];
    this._saveToStorage();
  }

  // ── localStorage ──────────────────────────────────

  // Guarda los favoritos en localStorage
  _saveToStorage() {
    const data = this.games.map(g => g.toJSON());
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Carga los favoritos desde localStorage
  _loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return data.map(item => BoardGame.fromJSON(item));
    } catch {
      return [];
    }
  }
}