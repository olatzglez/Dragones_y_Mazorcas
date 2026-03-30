import { parseStringPromise } from "xml2js";

export default class ApiService {
  constructor() {
    this.baseUrl = "https://boardgamegeek.com/xmlapi2";
  }

  /**
   * Método privado para hacer fetch + parse XML
   */
  async _fetchXML(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const xml = await response.text();

      const data = await parseStringPromise(xml, {
        explicitArray: false,
        ignoreAttrs: false,
      });

      return data;
    } catch (error) {
      console.error("BGG API error:", error);
      throw error;
    }
  }

  /**
   * Buscar juegos por nombre
   */
  async searchGames(query) {
    const url = `${this.baseUrl}/search?query=${encodeURIComponent(query)}&type=boardgame`;

    const data = await this._fetchXML(url);

    return data?.items?.item || [];
  }

  /**
   * Obtener juego por ID
   */
  async getGameById(id) {
    const url = `${this.baseUrl}/thing?id=${id}&stats=1`;

    const data = await this._fetchXML(url);

    return data?.items?.item || null;
  }

  /**
   * Búsqueda simplificada (para UI)
   */
  async searchGamesSimplified(query) {
    const results = await this.searchGames(query);

    return results.map((game) => ({
      id: game.$.id,
      name:
        game.name?.find((n) => n.$.type === "primary")?.$.value ||
        "Unknown",
      year: game.yearpublished?.$.value || "N/A",
    }));
  }

  /**
   * 📦 Detalle simplificado de juego
   */
  async getGameSimplified(id) {
    const game = await this.getGameById(id);

    if (!game) return null;

    return {
      id: game.$.id,
      name: game.name?.find((n) => n.$.type === "primary")?.$.value,
      description: game.description,
      minPlayers: game.minplayers?.$.value,
      maxPlayers: game.maxplayers?.$.value,
      rating: game.statistics?.ratings?.average?.$.value,
    };
  }
}