import "../styles/Fight.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { checkElement } from "../utills/FightUtills";

function Fight() {
  // const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
  //   useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [advantage, setAdvantage] = useState(false);

  // const levelUp = (level) => {
  //   return levelUpFunc(level);
  // };

  // const expUp = (exp) => {
  //   return expUpFunc(exp);
  // };

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy((prevState) => ({
      ...prevState,
      name: enemy.name,
      type: enemy.type,
      img: enemy.img,
      health: enemy.health,
      defense: enemy.defense,
      attack: enemy.attack,
      ability: enemy.ability,
    }));
  };

  const start = () => {
    setFightStart(!fightStart);
    showEnemy();
    setEnemyTurn(!enemyTurn);
    checkElement(currentPokemon.type, enemy.type, setAdvantage, adv);
  };

  const flee = () => {
    setFightStart(!fightStart);
    setAdvantage(false);
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
            <p className="pokeName">{currentPokemon.name}</p>
            <img src={currentPokemon.img} alt={currentPokemon.name}></img>
            <p>Type: {currentPokemon.type}</p>
            <p>Hp: {currentPokemon.health}</p>
            <p>Att: {currentPokemon.attack}</p>
            <p>Def: {currentPokemon.defense}</p>
            <p>Ability: {currentPokemon.ability}</p>
          </div>
          <div className="enemy">
            <p className="pokeName">{enemy.name}</p>
            <img src={enemy.img} alt={enemy.name}></img>
            <p>Type: {enemy.type}</p>
            <p>Hp: {enemy.health}</p>
            <p>Att: {enemy.attack}</p>
            <p>Def: {enemy.defense}</p>
            <p>Ability: {enemy.ability}</p>
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
