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
  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState([]);
  const [fightStart, setFightStart] = useState(false);
  const [playersTurn, setPlayersTurn] = useState(false);

  const levelUp = (level) => {
    return levelUpFunc(level);
  };

  const expUp = (exp) => {
    return expUpFunc(exp);
  };

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);

    const enemy = pokemonList[randInt];
    setEnemy(enemy);
  };

  const start = () => {
    setFightStart(!fightStart);
    showEnemy();
  };

  const flee = () => {
    setFightStart(!fightStart);
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
          <div className="enemy">
            <p>{enemy.name}</p>
            <img src={enemy.img}></img>
          </div>
        </div>
        <button className="fleeBtn" onClick={flee}>
          Flee
        </button>
      </div>
    );
  }
}
export default Fight;
