import "./styles/App.css";
import StarterPokemonList from "./components/StarterPokemonList.js";
import MainPage from "./components/MainPage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonSelector } from "./contexts/pokemonContexts/CurrentPokemonContext";
import { OwnPokemon } from "./contexts/pokemonContexts/OwnedPokemonContext";
import Pokedex from "./components/Pokedex.js";
import Equipment from "./components/Equipment.js";
import Character from "./components/Character.js";
import FightPage from "./components/fightComponents/FightPage.js";
import Fight from "./components/fightComponents/Fight";
import { PokemonListModifier } from "./contexts/pokemonContexts/PokemonListContext";
import FetchPokemon from "./utills/FetchPokemon";
import FetchItems from "./utills/FetchItems";
import { ItemsListModifier } from "./contexts/itemContexts/ItemsListContext";
import { CharacterModifier } from "./contexts/playerContexts/CharacterContexts";
import FightSummary from "./components/fightComponents/FightSummary";

function App() {
  return (
    <div className="appDiv">
      <BrowserRouter>
        <CharacterModifier>
          <PokemonListModifier>
            <ItemsListModifier>
              <PokemonSelector>
                <OwnPokemon>
                  <FetchPokemon />
                  <FetchItems />
                  <Routes>
                    <Route path="/" element={<StarterPokemonList />} />
                    <Route path="Pokedex" element={<Pokedex />} />
                    <Route path="Equipment" element={<Equipment />} />
                    <Route path="Character" element={<Character />} />
                    <Route path="FightPage" element={<FightPage />} />
                    <Route path="FightSummary" element={<FightSummary />} />
                    <Route path="MainPage" element={<MainPage />} />
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
                </OwnPokemon>
              </PokemonSelector>
            </ItemsListModifier>
          </PokemonListModifier>
        </CharacterModifier>
      </BrowserRouter>
    </div>
  );
}

export default App;
