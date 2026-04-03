const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
const { XMLParser } = require("fast-xml-parser");

const app = express();
const PORT = 3001;

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));

const BGG_BASE = "https://boardgamegeek.com/xmlapi2";

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Referer": "https://boardgamegeek.com/",
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

// GET /api/bgg/search?query=catan
app.get("/api/bgg/search", async (req, res) => {
  const { query, type = "boardgame" } = req.query;
  if (!query) return res.status(400).json({ error: "query param required" });

  try {
    const response = await fetch(
      `${BGG_BASE}/search?query=${encodeURIComponent(query)}&type=${type}`,
      { headers: HEADERS }
    );

    if (!response.ok) return res.status(response.status).json({ error: `BGG error: ${response.status}` });

    const xml = await response.text();
    const json = parser.parse(xml);
    const items = json?.items?.item ?? [];
    const results = (Array.isArray(items) ? items : [items]).map((item) => ({
      id: item["@_id"],
      name: Array.isArray(item.name)
        ? item.name.find((n) => n["@_type"] === "primary")?.["@_value"]
        : item.name?.["@_value"],
      year: item.yearpublished?.["@_value"] ?? "N/A",
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bgg/thing?id=174430
app.get("/api/bgg/thing", async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "id param required" });

  try {
    const response = await fetch(
      `${BGG_BASE}/thing?id=${id}&stats=1`,
      { headers: HEADERS }
    );

    if (!response.ok) return res.status(response.status).json({ error: `BGG error: ${response.status}` });

    const xml = await response.text();
    const json = parser.parse(xml);
    const item = json?.items?.item;

    const name = Array.isArray(item?.name)
      ? item.name.find((n) => n["@_type"] === "primary")?.["@_value"]
      : item?.name?.["@_value"];

    res.json({
      id: item?.["@_id"],
      name,
      description: item?.description || "",
      minPlayers: item?.minplayers?.["@_value"],
      maxPlayers: item?.maxplayers?.["@_value"],
      rating: item?.statistics?.ratings?.average?.["@_value"] ?? null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor BGG JSON corriendo en http://localhost:${PORT}`);
});