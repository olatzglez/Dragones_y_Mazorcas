class ApiService {
  constructor(url) {
    this.url = url;
  }

  async getGames() {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  }
}

export default ApiService;