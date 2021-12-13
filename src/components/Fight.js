import "../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { checkElement, enemyAtt } from "../utills/FightUtills";

function Fight() {
  // const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
  //   useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [encounterStart, setEncounterStart] = useState(false);
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

  const absorbEnemyAttack = (pokemon, health) => {
    return changeStats(pokemon, health);
  };

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy(enemy);
  };

  const enemyInitialAttack = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(true);
        resolve();
      }, 1500);
    });
  };

  const hpAfterAtt = enemyAtt(
    enemy.attack,
    currentPokemon.defense,
    currentPokemon.health
  );

  const usersTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(false);
        setUserTurn(true);
        absorbEnemyAttack(currentPokemon, hpAfterAtt);
        resolve();
      }, 1000);
    });
  };

  const startEncounter = () => {
    setFightStart(true);
    showEnemy();
  };

  const startTheFight = () => {
    enemyInitialAttack().then(usersTurn);
    setEncounterStart(true);
  };

  const flee = () => {
    setFightStart(false);
    setEncounterStart(false);
    setAdvantage(false);
    setEnemy("");
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
        <h2 className="fightHeading">Fight</h2>
        <div className="startedFightDiv">
          <div className="user">
            <p className="pokeName">{currentPokemon.name}</p>
            <img src={currentPokemon.img} alt={currentPokemon.name}></img>
            <p style={advantage ? { color: "green" } : { color: "ivory" }}>
              Type: {currentPokemon.type}
            </p>
            <p style={enemyTurn ? { color: "red" } : { color: "ivory" }}>
              Hp: {currentPokemon.health}
            </p>
            <p>Att: {currentPokemon.attack}</p>
            <p>Def: {currentPokemon.defense}</p>
            <p>Ability: {currentPokemon.ability}</p>
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
        <div className="fightBtnsDiv">
          <button className="fleeBtn" onClick={flee}>
            Flee
          </button>
          <button
            style={encounterStart ? { opacity: 0 } : { opacity: 1 }}
            className="startFightBtn"
            onClick={startTheFight}
          >
            Start the fight
          </button>
        </div>
      </div>
    );
  }
}
export default Fight;
