import { useEffect, useState } from "react";

interface ZodiacSign {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[]>([]);

  useEffect(() => {
    // Daten vom Backend-Endpunkt abrufen
    fetch("http://localhost:3000/api/zodiac-signs")
      .then((response) => response.json())
      .then((data) => {
        setZodiacSigns(data); // Daten in den State speichern
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  }, []);

  return (
    <div>
      <h1>Yours, Cosmic Guide.</h1>
      <ul>
        {zodiacSigns.map((sign) => (
          <li key={sign.id}>
            <strong>{sign.name}</strong>: {sign.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

