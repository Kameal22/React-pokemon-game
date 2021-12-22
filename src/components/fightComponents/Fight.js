import "../../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import PokemonStats from "./PokemonStats";
import { Link } from "react-router-dom";
import { CharacterContext } from "../../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../../contexts/pokemonContexts/CurrentPokemonContext";
import {
  checkAdvantage,
  checkDisadvantage,
  enemyAtt,
  userAtt,
  usePotion,
  userSpecialAtt,
} from "../../utills/FightUtills";
import { OwnedPokemonContext } from "../../contexts/pokemonContexts/OwnedPokemonContext";
import { ItemsListContext } from "../../contexts/itemContexts/ItemsListContext";
import PokemonImgs from "./PokemonImg";

function Fight() {
  const { expUpFunc } = useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);
  const { discoverPokemon } = useContext(OwnedPokemonContext);
  const { itemsList } = useContext(ItemsListContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [encounterStart, setEncounterStart] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);
  const [userTurn, setUserTurn] = useState(false);
  const [advantage, setAdvantage] = useState(false);
  const [disadvantage, setDisadvantage] = useState(false);
  const [userAttack, setUserAttack] = useState(false);
  const [pokeballThrow, setPokeballThrow] = useState(false);
  const [enemyCaught, setEnemyCaught] = useState(false);
  const [potionUsed, setPotionUse] = useState(false);
  const [userMoving, setUserMoving] = useState(false);
  const [win, setWin] = useState(false);
  const [lost, setLoss] = useState(false);

  const expUp = (value) => {
    return expUpFunc(value);
  };

  useEffect(() => {
    showEnemy();
  }, []);

  useEffect(() => {
    checkAdvantage(currentPokemon.type, enemy.type, setAdvantage, advantage);
    checkDisadvantage(
      enemy.type,
      currentPokemon.type,
      setDisadvantage,
      disadvantage
    );
    checkFightEnd();
  }, [enemy, currentPokemon, userMoving]);

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

  const enemyHpAfterAbility = userSpecialAtt(
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
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(true);
        absorbEnemyAttack(currentPokemon, Math.round(userHpAfterAtt));
        resolve();
      }, 1000);
    });
  };

  const startUsersTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyTurn(false);
        setUserAttack(true);
        resolve();
      }, 1000);
    });
  };

  const userBasicAttackTurn = () => {
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
  };

  const stopTheFight = () => {
    return new Promise((resolve, reject) => {
      if (win) {
        reject();
      } else {
        setEnemyTurn(false);
        setUserAttack(true);
        resolve();
      }
    });
  };

  const userAbilityAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserTurn(true);
        setUserMoving(true);
        setEnemy((prevStats) => ({
          ...prevStats,
          health: Math.round(enemyHpAfterAbility),
        }));
        resolve();
      }, 1000);
    });
  };

  const userPokeballUseTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPokeballThrow(true);
        setUserMoving(true);
        resolve();
      }, 1000);
    });
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
    return new Promise((resolve) => {
      setTimeout(() => {
        setPotionUse(true);
        setUserMoving(true);
        resolve();
      }, 1000);
    });
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
    if (currentPokemon.health > 0) {
      setFightStart(true);
      showEnemy();
    } else {
      alert("Heal your Pokemon");
    }
  };

  const startTheFight = () => {
    setEncounterStart(true);
    enemyAttack().then(startUsersTurn);
  };

  const checkFightEnd = () => {
    if (currentPokemon.health <= 0) {
      setLoss(true);
    } else if (enemy.health <= 0) {
      setWin(true);
      expUp(10);
    }
  };

  const basicAttackFunc = () => {
    userBasicAttackTurn()
      .then(stopTheFight)
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const abilityAttackFunc = () => {
    userAbilityAttackTurn()
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const pokeballUseFunc = () => {
    userPokeballUseTurn()
      .then(userCatchPokemonTurn)
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const potionUseFunc = () => {
    userPotionUseTurn()
      .then(healUserTurn)
      .then(nextRound)
      .then(enemyAttack)
      .then(startUsersTurn);
  };

  const flee = () => {
    setFightStart(false);
    setAdvantage(false);
    setDisadvantage(false);
    setEnemyCaught(false);
    setUserAttack(false);
    setUserMoving(false);
    setEncounterStart(false);
    setWin(false);
    setLoss(false);
  };
  return (
    <div className="fightDiv">
      <h2 className="fightHeading">Fight</h2>
      <div className="startedFightDiv">
        <div className="userDiv">
          <PokemonImgs img={currentPokemon.img} />
          <PokemonStats stats={currentPokemon} />
        </div>
        <div className="enemyDiv">
          <PokemonImgs img={enemy.img} />
          <PokemonStats stats={enemy} />
        </div>
      </div>
      {encounterStart ? null : (
        <div className="fightBtnsDiv">
          <button className="startFightBtn" onClick={startTheFight}>
            Fight
          </button>
          <button disabled={enemyTurn} className="fleeBtn" onClick={flee}>
            Flee
          </button>
        </div>
      )}
    </div>
  );
}
export default Fight;