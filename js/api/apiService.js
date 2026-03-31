export default class ApiService {
  constructor() {
    this.apiBase = "http://localhost:3001/api/bgg";
  }

  async _fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  }

  async searchGamesSimplified(query) {
    return this._fetchJSON(`${this.apiBase}/search?query=${encodeURIComponent(query)}&type=boardgame`);
  }

  async getGameSimplified(id) {
    return this._fetchJSON(`${this.apiBase}/thing?id=${id}`);
  }
}