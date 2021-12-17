import "../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import {
  checkElement,
  enemyAtt,
  userAtt,
  usePotion,
} from "../utills/FightUtills";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

//DIASPEAR START BUTTON WHEN FIGHT STARTS

function Fight() {
  // const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
  //   useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);
  const { discoverPokemon } = useContext(OwnedPokemonContext);
  const { itemsList } = useContext(ItemsListContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [userTurn, setUserTurn] = useState(false);
  const [advantage, setAdvantage] = useState(false);
  const [fightEnd, setFightEnd] = useState(false);
  const [winner, setWinner] = useState("");
  const [userAttack, setUserAttack] = useState(false);
  const [userAction, setUserAction] = useState("");
  const [pokeballThrow, setPokeballThrow] = useState(false);
  const [enemyCaught, setEnemyCaught] = useState(false);
  const [potionUsed, setPotionUse] = useState(false);
  const [userMoving, setUserMoving] = useState(false);

  // const levelUp = (level) => {
  //   return levelUpFunc(level);
  // };

  // const expUp = (exp) => {
  //   return expUpFunc(exp);
  // };

  useEffect(() => {
    checkElement(currentPokemon.type, enemy.type, setAdvantage, advantage);
    checkFightEnd();
  }, [enemy, currentPokemon]);

  const discoverNewPokemon = (pokemon) => {
    return discoverPokemon(pokemon);
  };

  const absorbEnemyAttack = (pokemon, health) => {
    return changeStats(pokemon, health);
  };

  const potionHeal = (pokemon, health) => {
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

  const userHpAfterHealing = usePotion(currentPokemon.health, 25);

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy(enemy);
  };

  const enemyAttack = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setEnemyTurn(true);
          absorbEnemyAttack(currentPokemon, Math.round(userHpAfterAtt));
          resolve();
        }, 1000);
      });
    }
  };

  const startUsersTurn = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setEnemyTurn(false);
          setUserAttack(true);
          resolve();
        }, 1000);
      });
    }
  };

  const userBasicAttackTurn = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setUserTurn(true);
          setUserMoving(true);
          setEnemy((prevStats) => ({
            ...prevStats,
            health: Math.round(enemyHpAfterAtt),
          }));
          resolve();
        }, 1000);
      });
    }
  };

  const userAbilityAttackTurn = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setUserTurn(true);
          setUserMoving(true);
          setEnemy((prevStats) => ({
            ...prevStats,
            health: 1000000,
          }));
          resolve();
        }, 1000);
      });
    }
  };

  const userPokeballUseTurn = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setPokeballThrow(true);
          setUserMoving(true);
          resolve();
        }, 1000);
      });
    }
  };

  const userCatchPokemonTurn = () => {
    return new Promise((resolve) => {
      if (Math.random() < 0.4) {
        setTimeout(() => {
          discoverNewPokemon(enemy);
          setEnemyCaught(true);
          setPokeballThrow(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setPokeballThrow(false);
          resolve();
        }, 1000);
      }
    });
  };

  const userPotionUseTurn = () => {
    if (!fightEnd) {
      return new Promise((resolve) => {
        setTimeout(() => {
          setPotionUse(true);
          setUserMoving(true);
          resolve();
        }, 1000);
      });
    }
  };

  const healUserTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        potionHeal(currentPokemon, userHpAfterHealing);
        setPotionUse(false);
        setUserMoving(true);
        resolve();
      }, 1000);
    });
  };

  const nextRound = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserTurn(false);
        setUserAttack(false);
        setUserMoving(false);
        resolve();
      }, 1000);
    });
  };

  const startEncounter = () => {
    setFightStart(true);
    showEnemy();
  };

  const startTheFight = () => {
    if (userAction === "") {
      enemyAttack().then(startUsersTurn);
    } else if (userAction === "basicAttack") {
      userBasicAttackTurn().then(nextRound);
    } else if (userAction === "abilityAttack") {
      userAbilityAttackTurn().then(nextRound);
    } else if (userAction === "pokeballUse") {
      userPokeballUseTurn().then(userCatchPokemonTurn).then(nextRound);
    } else if (userAction === "potionUse") {
      userPotionUseTurn().then(healUserTurn).then(nextRound);
    }
  };

  const checkFightEnd = () => {
    if (currentPokemon.health <= 0) {
      setFightEnd(true);
      setTimeout(() => {
        flee();
        setWinner(enemy.name);
      }, 500);
    } else if (enemy.health <= 0) {
      setFightEnd(true);
      setTimeout(() => {
        flee();
        setWinner(currentPokemon.name);
      }, 500);
    }
  };

  const basicAttackFunc = () => {
    setUserAction("basicAttack");
    userBasicAttackTurn()
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const abilityAttackFunc = () => {
    setUserAction("abilityAttack");
    userAbilityAttackTurn()
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const pokeballUseFunc = () => {
    setUserAction("pokeballUse");
    userPokeballUseTurn()
      .then(userCatchPokemonTurn)
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const potionUseFunc = () => {
    setUserAction("potionUse");
    userPotionUseTurn()
      .then(healUserTurn)
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const flee = () => {
    setFightStart(false);
    setAdvantage(false);
    setEnemyCaught(false);
    setWinner("");
    setUserAction("");
    setUserAttack(false);
    setUserMoving(false);
  };

  if (!fightStart) {
    if (!fightEnd) {
      return (
        <div className="fightDiv">
          <div className="navLinksScd">
            <Link to="/">Home</Link>
          </div>
          <h2 className="fightHeading">Fight</h2>
          <div
            onClick={console.log(itemsList[0])}
            className="fightSelectingDiv"
          >
            <h4 onClick={startEncounter} style={{ cursor: "pointer" }}>
              Encounter
            </h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="fightDiv">
          <div className="navLinksScd">
            <Link to="/">Home</Link>
          </div>
          <div className="fightSelectingDiv">
            <h2>winner is {winner}</h2>
          </div>
        </div>
      );
    }
  } else if (enemyCaught) {
    return (
      <div className="fightDiv">
        <h1>You caught {enemy.name}</h1>
        <button className="fleeBtn" onClick={flee}>
          Go back
        </button>
      </div>
    );
  } else if (!enemyCaught) {
    if (!userMoving) {
      return (
        <div className="fightDiv">
          <h2 className="fightHeading">Fight</h2>
          <div className="startedFightDiv">
            <div className="user">
              {userAttack ? (
                <div>
                  <p className="pokeName">{currentPokemon.name}</p>
                  <img
                    style={
                      userTurn ? { transform: "translate(300px, 0)" } : null
                    }
                    src={currentPokemon.img}
                    alt={currentPokemon.name}
                  ></img>
                  <img
                    style={
                      potionUsed ? { transform: "translate(0, -20px" } : null
                    }
                    src={itemsList[1].img}
                  ></img>
                  <img
                    style={
                      pokeballThrow
                        ? { transform: "translate(300px, 0)" }
                        : null
                    }
                    src={itemsList[0].img}
                  ></img>
                  {potionUsed ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      + 25 hp!
                    </p>
                  ) : (
                    <p className="userMove" onClick={basicAttackFunc}>
                      Basic attack
                    </p>
                  )}
                  <p className="userMove" onClick={abilityAttackFunc}>
                    {currentPokemon.ability}
                  </p>
                  <p className="userMove" onClick={pokeballUseFunc}>
                    Use pokeball
                  </p>
                  <p className="userMove" onClick={potionUseFunc}>
                    Use potion
                  </p>
                </div>
              ) : (
                <div>
                  <p className="pokeName">{currentPokemon.name}</p>
                  <img
                    style={
                      userTurn ? { transform: "translate(300px, 0)" } : null
                    }
                    src={currentPokemon.img}
                    alt={currentPokemon.name}
                  ></img>
                  <p
                    style={advantage ? { color: "green" } : { color: "ivory" }}
                  >
                    Type: {currentPokemon.type}
                  </p>
                  <p style={enemyTurn ? { color: "red" } : { color: "ivory" }}>
                    Hp: {currentPokemon.health}
                  </p>
                  <p>Att: {currentPokemon.attack}</p>
                  <p>Def: {currentPokemon.defense}</p>
                  <p>Ability: {currentPokemon.ability}</p>
                </div>
              )}
            </div>
            <div className="enemy">
              <p className="pokeName">{enemy.name}</p>
              {!enemyCaught ? (
                <img
                  style={
                    enemyTurn ? { transform: "translate(-300px, 0)" } : null
                  }
                  src={enemy.img}
                  alt={enemy.name}
                ></img>
              ) : (
                <h3>You caught {enemy.name}</h3>
              )}

              <div>
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
          </div>
          <div className="fightBtnsDiv">
            <button className="startFightBtn" onClick={startTheFight}>
              Fight
            </button>
            <button disabled={enemyTurn} className="fleeBtn" onClick={flee}>
              Flee
            </button>
          </div>
        </div>
      );
    } else if (userMoving) {
      return (
        <div className="fightDiv">
          <h2 className="fightHeading">Fight</h2>
          <div className="startedFightDiv">
            <div className="user">
              {userAttack ? (
                <div>
                  <p className="pokeName">{currentPokemon.name}</p>
                  <img
                    style={
                      userTurn ? { transform: "translate(300px, 0)" } : null
                    }
                    src={currentPokemon.img}
                    alt={currentPokemon.name}
                  ></img>
                  <img
                    style={
                      potionUsed ? { transform: "translate(0, -20px" } : null
                    }
                    src={itemsList[1].img}
                  ></img>
                  <img
                    style={
                      pokeballThrow
                        ? { transform: "translate(300px, 0)" }
                        : null
                    }
                    src={itemsList[0].img}
                  ></img>
                  {potionUsed ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      + 25 hp!
                    </p>
                  ) : null}
                </div>
              ) : (
                <div>
                  <p className="pokeName">{currentPokemon.name}</p>
                  <img
                    style={
                      userTurn ? { transform: "translate(300px, 0)" } : null
                    }
                    src={currentPokemon.img}
                    alt={currentPokemon.name}
                  ></img>
                  <p
                    style={advantage ? { color: "green" } : { color: "ivory" }}
                  >
                    Type: {currentPokemon.type}
                  </p>
                  <p style={enemyTurn ? { color: "red" } : { color: "ivory" }}>
                    Hp: {currentPokemon.health}
                  </p>
                  <p>Att: {currentPokemon.attack}</p>
                  <p>Def: {currentPokemon.defense}</p>
                  <p>Ability: {currentPokemon.ability}</p>
                </div>
              )}
            </div>
            <div className="enemy">
              <p className="pokeName">{enemy.name}</p>
              {!enemyCaught ? (
                <img
                  style={
                    enemyTurn ? { transform: "translate(-300px, 0)" } : null
                  }
                  src={enemy.img}
                  alt={enemy.name}
                ></img>
              ) : (
                <h3>You caught {enemy.name}</h3>
              )}

              <div>
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
          </div>
          <div className="fightBtnsDiv">
            <button className="startFightBtn" onClick={startTheFight}>
              Fight
            </button>
            <button disabled={enemyTurn} className="fleeBtn" onClick={flee}>
              Flee
            </button>
          </div>
        </div>
      );
    }
  }
}
export default Fight;
