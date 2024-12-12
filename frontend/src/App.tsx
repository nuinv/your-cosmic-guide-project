import React from "react";
import "./app.css";
import SignSelection from "./components/SignSelection";

function App() {

  return (
    <div className="app">
      <header className="header">Sternzeichen-Guide</header>
      <div className="container">
        <p className="welcome">
          Willkommen! Bitte wählen Sie Ihr Geburtsdatum, um Ihr Sternzeichen zu
          entdecken:
        </p>

        {/* Dropdowns und Button */}
        <div className="dropdown-container">
          <SignSelection />
        </div>

      </div>
    </div>
  );
}

export default App;
