import "dotenv/config";
console.log("Token cargado:", process.env.BGG_TOKEN); //
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import xml2js from "xml2js";

const app = express();
app.use(cors());

const BGG_HEADERS = {
  "Authorization": `Bearer ${process.env.BGG_TOKEN}`
};

async function fetchBGG(url) {
  const response = await fetch(url, { headers: BGG_HEADERS });
  const xml = await response.text();
  return xml2js.parseStringPromise(xml, { explicitArray: false });
}

// Endpoint: búsqueda
app.get("/api/bgg/search", async (req, res) => {
  try {
    const { query, type = "boardgame" } = req.query;
    const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=${type}`;
    const json = await fetchBGG(url);
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint: detalle de juego ← FALTABA ESTE
app.get("/api/bgg/thing", async (req, res) => {
  try {
    const { id, stats = 1 } = req.query;
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=${stats}`;
    const json = await fetchBGG(url);
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
```

---

## 🔐 Guarda el token en un `.env`

Crea un archivo `.env` en la raíz del proyecto:
```
BGG_TOKEN=tu-token-aqui