import "dotenv/config";
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
  if (!response.ok) throw new Error(`BGG error: ${response.status}`);
  const xml = await response.text();
  return xml2js.parseStringPromise(xml, { explicitArray: false });
}

// ─── Helpers ───────────────────────────────────────────────

function getValue(field) {
  return field?.$?.value ?? null;
}

function getArray(field) {
  if (!field) return [];
  return Array.isArray(field) ? field : [field];
}

function cleanSearch(json) {
  const items = json?.items?.item;
  if (!items) return [];
  return getArray(items).map(item => ({
    id:   item?.$?.id ?? null,
    name: item?.name?.$?.value ?? null,
    year: getValue(item?.yearpublished),
  }));
}

function cleanThing(json) {
  const item = json?.items?.item;
  if (!item) return null;

  // Nombre principal
  const names = getArray(item.name);
  const primaryName = names.find(n => n?.$?.type === "primary")?.$.value ?? null;

  // Categorías
  const links = getArray(item.link);
  const categories  = links.filter(l => l?.$?.type === "boardgamecategory").map(l => l?.$?.value);
  const mechanics   = links.filter(l => l?.$?.type === "boardgamemechanic").map(l => l?.$?.value);
  const publishers  = links.filter(l => l?.$?.type === "boardgamepublisher").map(l => l?.$?.value);

  // Idioma
  const languages  = links.filter(l => l?.$?.type === "boardgamelanguage").map(l => l?.$?.value);

  // Rankings
  const ratingsNode = item?.statistics?.ratings;
  const ranksRaw    = getArray(ratingsNode?.ranks?.rank);
  const bggRank     = ranksRaw.find(r => r?.$?.name === "boardgame")?.$?.value ?? null;

  return {
    id:          item?.$?.id ?? null,
    name:        primaryName,
    year:        getValue(item.yearpublished),
    minPlayers:  getValue(item.minplayers),
    maxPlayers:  getValue(item.maxplayers),
    minPlaytime: getValue(item.minplaytime),
    maxPlaytime: getValue(item.maxplaytime),
    minAge:      getValue(item.minage),
    image:       item.image ?? null,
    thumbnail:   item.thumbnail ?? null,
    description: item.description ?? null,
    language:    languages.length > 0 ? languages : null,
    rating: {
      average:  ratingsNode?.average?.$?.value ?? null,
      votes:    ratingsNode?.usersrated?.$?.value ?? null,
      weight:   ratingsNode?.averageweight?.$?.value ?? null,
    },
    rank:        bggRank,
    categories,
    mechanics,
    publishers,
  };
}

// ─── Endpoints ─────────────────────────────────────────────

app.get("/api/bgg/search", async (req, res) => {
  try {
    const { query, type = "boardgame" } = req.query;
    const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(query)}&type=${type}`;
    const json = await fetchBGG(url);
    res.json(cleanSearch(json));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/bgg/thing", async (req, res) => {
  try {
    const { id, stats = 1 } = req.query;
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=${stats}`;
    const json = await fetchBGG(url);
    res.json(cleanThing(json));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});