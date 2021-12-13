import "../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { checkElement, enemyAtt, userAtt } from "../utills/FightUtills";

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
  const [roundTwo, setRoundTwo] = useState(false);
  const [endFight, setFightEnd] = useState(false);
  const [winner, setWinner] = useState("");

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

  const userHpAfterAtt = enemyAtt(
    enemy.attack,
    currentPokemon.defense,
    currentPokemon.health
  );

  const enemyHpAfterAtt = userAtt(
    currentPokemon.attack,
    enemy.defense,
    enemy.health
  );

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy(enemy);
  };

  const enemyAttack = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(true);
        resolve();
      }, 1500);
    });
  };

  const startUsersTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(false);
        absorbEnemyAttack(currentPokemon, userHpAfterAtt);
        resolve();
      }, 1000);
    });
  };

  const endUsersTurn = () => {
    if (currentPokemon.health > 0) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setUserTurn(true);
          setEnemy((prevStats) => ({
            ...prevStats,
            health: enemyHpAfterAtt,
          }));
          resolve();
        }, 1500);
      });
    } else {
      setFightEnd(true);
      setTimeout(() => {
        endLostFight(); // in the future change it to a function that handles loss.
      }, 1500);
    }
  };

  const checkForWin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserTurn(false);
        if (currentPokemon.health <= 0 || enemy.health <= 0) {
          setFightEnd(true);
        } else {
          setRoundTwo(true);
        }
        resolve();
      }, 1000);
    });
  };

  const startEncounter = () => {
    setFightStart(true);
    showEnemy();
  };

  const startTheFight = () => {
    enemyAttack().then(startUsersTurn).then(endUsersTurn).then(checkForWin);
    setEncounterStart(true);
  };

  const endLostFight = () => {
    setFightStart(false);
    setEncounterStart(false);
    setAdvantage(false);
    setUserTurn(false);
    setEnemyTurn(false);
    setWinner(enemy.name);
    setFightEnd(true);
  };

  const flee = () => {
    setFightStart(false);
    setEncounterStart(false);
    setAdvantage(false);
    setEnemy("");
    setUserTurn(false);
    setRoundTwo(false);
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
            <img
              style={userTurn ? { transform: "translate(300px, 0)" } : null}
              src={currentPokemon.img}
              alt={currentPokemon.name}
            ></img>
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
            <p style={userTurn ? { color: "red" } : { color: "ivory" }}>
              Hp: {enemy.health}
            </p>
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
          <button disabled={enemyTurn} className="fleeBtn" onClick={flee}>
            Flee
          </button>
          {roundTwo ? (
            <button
              style={roundTwo ? { opacity: 1 } : { opacity: 0 }}
              className="startFightBtn"
              onClick={startTheFight}
            >
              Round Two
            </button>
          ) : (
            <button
              style={encounterStart ? { opacity: 0 } : { opacity: 1 }}
              className="startFightBtn"
              onClick={startTheFight}
            >
              Start the fight
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default Fight;
