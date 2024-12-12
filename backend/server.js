const express = require("express");
const cors = require("cors");

const zodiacSigns = [
  { id: 1, name: "Widder", description: "Mutig und energiegeladen", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { id: 2, name: "Stier", description: "Zuverlässig und geduldig", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { id: 3, name: "Zwillinge", description: "Neugierig und kommunikativ", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  { id: 4, name: "Krebs", description: "Emotional und fürsorglich", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  { id: 5, name: "Löwe", description: "Charismatisch und stolz", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { id: 6, name: "Jungfrau", description: "Praktisch und analytisch", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { id: 7, name: "Waage", description: "Harmonisch und charmant", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  { id: 8, name: "Skorpion", description: "Intensiv und leidenschaftlich", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  { id: 9, name: "Schütze", description: "Optimistisch und abenteuerlustig", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
  { id: 10, name: "Steinbock", description: "Diszipliniert und ehrgeizig", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  { id: 11, name: "Wassermann", description: "Innovativ und unabhängig", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  { id: 12, name: "Fische", description: "Einfühlsam und kreativ", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
];

const app = express();
app.use(cors());

// Logging-Middleware, um Anfragen zu protokollieren
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/api/:id", (req, res) => { 
  const id = req.params.id; 
  res.send("hallo")
});

// Endpunkt für Sternzeichen-Daten
app.get("/api/zodiac-signs", (req, res) => {
  res.json(zodiacSigns);
});

// Endpunkt für einen bestimmten Sternzeichen-Bereich
app.get("/api/zodiac-sign/:date", (req, res) => {
  const dateInput = new Date(req.params.date);

  if (isNaN(dateInput)) {
    return res.status(400).json({ error: "Ungültiges Datum." });
  }

  const month = dateInput.getUTCMonth() + 1; // Monat von 0-11 auf 1-12 anpassen
  const day = dateInput.getUTCDate();

  let zodiac = "Unbekannt";

  for (const sign of zodiacSigns) {
    const { start, end } = sign;

    if (
      (month === start.month && day >= start.day) ||
      (month === end.month && day <= end.day) ||
      (start.month > end.month && // Sonderfall Steinbock (Monatswechsel Dezember -> Januar)
        ((month === start.month && day >= start.day) ||
         (month === end.month && day <= end.day)))
    ) {
      zodiac = sign;
      break;
    }
  }

  if (zodiac === "Unbekannt") {
    return res.status(404).json({ error: "Kein Sternzeichen gefunden." });
  }

  res.json(zodiac);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
