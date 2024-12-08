const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Test-Endpunkt
// Endpunkt für Sternzeichen-Daten
app.get("/api/zodiac-signs", (req, res) => {
  const zodiacSigns = [
    { id: 1, name: "Widder", description: "Mutig und energiegeladen" },
    { id: 2, name: "Stier", description: "Zuverlässig und geduldig" },
    { id: 3, name: "Zwillinge", description: "Neugierig und kommunikativ" },
    { id: 4, name: "Krebs", description: "Emotional und fürsorglich" },
    { id: 5, name: "Löwe", description: "Charismatisch und stolz" },
    { id: 6, name: "Jungfrau", description: "Praktisch und analytisch" },
    { id: 7, name: "Waage", description: "Harmonisch und charmant" },
    { id: 8, name: "Skorpion", description: "Intensiv und leidenschaftlich" },
    { id: 9, name: "Schütze", description: "Optimistisch und abenteuerlustig" },
    { id: 10, name: "Steinbock", description: "Diszipliniert und ehrgeizig" },
    { id: 11, name: "Wassermann", description: "Innovativ und unabhängig" },
    { id: 12, name: "Fische", description: "Einfühlsam und kreativ" },
  ];

  res.json(zodiacSigns);
});

const PORT = 3000; // Stelle sicher, dass der Port korrekt definiert ist
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`); // Diese Zeile gibt die Meldung aus
});
