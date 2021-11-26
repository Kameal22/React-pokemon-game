import "./styles/App.css";
import PokemonList from "./components/PokemonList.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex.js";
import Equipment from "./components/Equipment.js";
import Character from "./components/Character.js";

function App() {
  return (
    <div className="appDiv">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="Pokedex" element={<Pokedex />} />
          <Route path="Equipment" element={<Equipment />} />
          <Route path="Character" element={<Character />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem", color: "white" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
