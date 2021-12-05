import "./styles/App.css";
import PokemonList from "./components/PokemonList.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonSelector } from "./contexts/CurrentPokemonContext";
import { OwnPokemon } from "./contexts/OwnedPokemon";
import Pokedex from "./components/Pokedex.js";
import Equipment from "./components/Equipment.js";
import Character from "./components/Character.js";
import Fight from "./components/Fight";
import { OwnItem } from "./contexts/OwnedItemsContext";
import { PokemonListModifier } from "./contexts/PokemonListContext";
import FetchPokemon from "./utills/FetchPokemon";
import FetchItems from "./utills/FetchItems";
import { ItemsListModifier } from "./contexts/ItemsListContext";

function App() {
  return (
    <div className="appDiv">
      <BrowserRouter>
        <PokemonListModifier>
          <ItemsListModifier>
            <PokemonSelector>
              <OwnPokemon>
                <OwnItem>
                  <FetchPokemon />
                  <FetchItems />
                  <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="Pokedex" element={<Pokedex />} />
                    <Route path="Equipment" element={<Equipment />} />
                    <Route path="Character" element={<Character />} />
                    <Route path="Fight" element={<Fight />} />
                    <Route
                      path="*"
                      element={
                        <main style={{ padding: "1rem", color: "white" }}>
                          <p>There's nothing here!</p>
                        </main>
                      }
                    />
                  </Routes>
                </OwnItem>
              </OwnPokemon>
            </PokemonSelector>
          </ItemsListModifier>
        </PokemonListModifier>
      </BrowserRouter>
    </div>
  );
}

export default App;
