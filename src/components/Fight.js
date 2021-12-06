import "../styles/Fight.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";

function Fight() {
  const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
    useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { ownedPokemon } = useContext(OwnedPokemonContext);
  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState([]);
  const [fightStart, setFightStart] = useState(false);

  const levelUp = (level) => {
    return levelUpFunc(level);
  };

  const expUp = (exp) => {
    return expUpFunc(exp);
  };

  const start = () => {
    setFightStart(!fightStart);
    const randInt = Math.floor(Math.random() * pokemonList.length);

    const enemy = ownedPokemon[randInt];
    setEnemy(enemy);
  };

  if (!fightStart) {
    return (
      <div className="fightDiv">
        <div className="navLinksScd">
          <Link to="/">Home</Link>
        </div>
        <h2 className="fightHeading">Fight</h2>
        <div className="fightSelectingDiv">
          <h4 onClick={start} style={{ cursor: "pointer" }}>
            Encounter
          </h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fightDiv">
        <h2 className="fightHeading">Fight</h2>
        <div className="startedFightDiv">
          <div className="user">
            <p>{currentPokemon.name}</p>
            <img src={currentPokemon.img}></img>
          </div>
        </div>
      </div>
    );
  }
}
export default Fight;
