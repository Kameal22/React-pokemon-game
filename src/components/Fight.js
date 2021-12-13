import "../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { checkElement } from "../utills/FightUtills";

function Fight() {
  // const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
  //   useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [userTurn, setUserTurn] = useState(false);
  const [advantage, setAdvantage] = useState(false);

  // const levelUp = (level) => {
  //   return levelUpFunc(level);
  // };

  // const expUp = (exp) => {
  //   return expUpFunc(exp);
  // };

  useEffect(() => {
    checkElement(currentPokemon.type, enemy.type, setAdvantage, advantage);
  }, [enemy]);

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy(enemy);
  };

  const enemyMove = () => {
    setTimeout(function () {
      setEnemyTurn(true);
      setTimeout(function () {
        setEnemyTurn(false);
      }, 1000);
    }, 1000);
  };

  const startEncounter = () => {
    setFightStart(!fightStart);
    showEnemy();
    enemyMove();
  };

  const useAbility = () => {
    const test = "asd";
    if (enemyTurn) {
      changeStats(currentPokemon, test);
    }
  };

  const flee = () => {
    setFightStart(!fightStart);
    setAdvantage(false);
    setEnemy("");
    setEnemyTurn(!enemyTurn);
  };

  if (!fightStart) {
    return (
      <div className="fightDiv">
        <div className="navLinksScd">
          <Link to="/">Home</Link>
        </div>
        <h2 className="fightHeading">Fight</h2>
        <div className="fightSelectingDiv">
          <h4 onClick={startEncounter} style={{ cursor: "pointer" }}>
            Encounter
          </h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fightDiv">
        <h2 onClick={() => console.log(enemy)} className="fightHeading">
          Fight
        </h2>
        <div className="startedFightDiv">
          <div className="user">
            <p className="pokeName">{currentPokemon.name}</p>
            <img
              style={userTurn ? { transform: "translate(300px, 0)" } : null}
              src={currentPokemon.img}
              alt={currentPokemon.name}
            ></img>
            <p
              onClick={() => enemyMove()}
              style={advantage ? { color: "green" } : { color: "ivory" }}
            >
              Type: {currentPokemon.type}
            </p>
            <p>Hp: {currentPokemon.health}</p>
            <p>Att: {currentPokemon.attack}</p>
            <p>Def: {currentPokemon.defense}</p>
            <p onClick={useAbility}>Ability: {currentPokemon.ability}</p>
          </div>
          <div className="enemy">
            <p className="pokeName">{enemy.name}</p>
            <img
              style={enemyTurn ? { transform: "translate(-300px, 0)" } : null}
              src={enemy.img}
              alt={enemy.name}
            ></img>
            <p style={advantage ? { color: "red" } : { color: "ivory" }}>
              Type: {enemy.type}
            </p>
            <p>Hp: {enemy.health}</p>
            <p style={advantage ? { color: "red" } : { color: "ivory" }}>
              Att: {advantage ? enemy.attack / 2 : enemy.attack}
            </p>
            <p style={advantage ? { color: "red" } : { color: "ivory" }}>
              Def: {advantage ? enemy.defense / 2 : enemy.defense}
            </p>
            <p>Ability: {enemy.ability}</p>
          </div>
        </div>
        <button disabled={enemyTurn} className="fleeBtn" onClick={flee}>
          Flee
        </button>
      </div>
    );
  }
}
export default Fight;
