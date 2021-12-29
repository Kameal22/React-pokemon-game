import "../../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import PokemonStats from "./PokemonStats";
import { CharacterContext } from "../../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../../contexts/pokemonContexts/CurrentPokemonContext";
import {
  checkAdvantage,
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
  const [encounterStart, setEncounterStart] = useState(false);
  const [enemyAttacking, setEnemyAttacking] = useState(false);
  const [advantage, setAdvantage] = useState(null);
  const [userAttacking, setUserAttacking] = useState(false);
  const [pokeballThrow, setPokeballThrow] = useState(false);
  const [enemyCaught, setEnemyCaught] = useState(false);
  const [potionUse, setPotionUse] = useState(false);
  const [userMoving, setUserMoving] = useState(false);
  const [fightWin, setFightWin] = useState(false);

  const [fightHelperState, setFightHelperState] = useState(false);
  const [scdFightHelperState, setScdFightHelperState] = useState(false);

  const expUp = (value) => {
    return expUpFunc(value);
  };

  useEffect(() => {
    showEnemy();
  }, []);

  useEffect(() => {
    checkAdvantage(currentPokemon.type, enemy.type, setAdvantage, advantage);
  }, [enemy, currentPokemon]);

  useEffect(() => {
    checkEnemyDeath();
  }, [fightHelperState]);

  useEffect(() => {
    checkUserDeath();
  }, [scdFightHelperState]);

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

  const enemyAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setEnemyAttacking(true);
        resolve();
      }, 1000);
    });
  };

  const absorbEnemyAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        absorbEnemyAttack(currentPokemon, Math.round(userHpAfterAtt));
        setEnemyAttacking(false);
        setScdFightHelperState(!scdFightHelperState);
        resolve();
      }, 1000);
    });
  };

  const startUsersTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserMoving(true);
        resolve();
      }, 1000);
    });
  };

  const userBasicAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserAttacking(true);
        resolve();
      }, 1000);
    });
  };

  const absorbUserAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserAttacking(false);
        setEnemy((prevStats) => ({
          ...prevStats,
          health: Math.round(enemyHpAfterAtt),
        }));
        resolve();
      }, 1000);
    });
  };

  const nextRound = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserMoving(false);
        setFightHelperState(!fightHelperState);
        resolve();
      }, 1000);
    });
  };

  const userAbilityAttackTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserAttacking(true);
        setEnemy((prevStats) => ({
          ...prevStats,
          health: Math.round(enemyHpAfterAbility),
        }));
        resolve();
      }, 1000);
    });
  };

  const absorbUserAbilityTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserAttacking(false);
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
        resolve();
      }, 1000);
    });
  };

  const userCatchPokemonTurn = () => {
    return new Promise((resolve) => {
      if (Math.random() < 0.4) {
        setTimeout(() => {
          discoverNewPokemon(enemy);
          // setEnemyCaught(true);
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
        resolve();
      }, 1000);
    });
  };

  const healUserTurn = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        potionHeal(currentPokemon, userHpAfterHealing);
        setPotionUse(false);
        resolve();
      }, 1000);
    });
  };

  const startTheFight = () => {
    setEncounterStart(true);
    enemyTurnFunc();
  };

  const checkUserDeath = () => {
    if (currentPokemon.health < 0) {
      console.log("You died!");
    }
  };

  const checkEnemyDeath = () => {
    if (enemy.health > 0) {
      enemyTurnFunc();
    } else {
      setFightWin(true);
      expUp(10);
    }
  };

  const enemyTurnFunc = () => {
    enemyAttackTurn().then(absorbEnemyAttackTurn).then(startUsersTurn);
  };

  const basicAttackFunc = () => {
    userBasicAttackTurn().then(absorbUserAttackTurn).then(nextRound);
  };

  const abilityAttackFunc = () => {
    userAbilityAttackTurn().then(absorbUserAbilityTurn).then(nextRound);
  };

  const pokeballUseFunc = () => {
    userPokeballUseTurn().then(userCatchPokemonTurn).then(nextRound);
  };

  const potionUseFunc = () => {
    userPotionUseTurn().then(healUserTurn).then(nextRound);
  };

  const flee = () => {
    showEnemy();
    setAdvantage(null);
    setEnemyAttacking(false);
    setUserMoving(false);
    setFightWin(false);
  };

  return (
    <div className="fightDiv">
      <h2 className="fightHeading">Fight</h2>
      <div className="startedFightDiv">
        <div className="userDiv">
          <PokemonImgs img={currentPokemon.img} userAttack={userAttacking} />
          <img
            style={pokeballThrow ? { transform: "translateX(300px)" } : null}
            src={itemsList[0].img}
          ></img>
          <img
            style={potionUse ? { transform: "translateY(-10px)" } : null}
            src={itemsList[1].img}
          ></img>
          <p
            style={
              potionUse
                ? { display: "block", color: "green" }
                : { display: "none" }
            }
          >
            + 25 hp!
          </p>
          <PokemonStats
            stats={currentPokemon}
            advantage={advantage}
            userTurn={userMoving}
            enemyAttack={enemyAttacking}
            basicAttack={basicAttackFunc}
            abilityAttack={abilityAttackFunc}
            potionUse={potionUseFunc}
            pokeballUse={pokeballUseFunc}
          />
        </div>
        <div className="enemyDiv">
          <PokemonImgs
            img={enemy.img}
            enemyAttack={enemyAttacking}
            win={fightWin}
          />
          <PokemonStats
            stats={enemy}
            advantage={advantage !== null ? !advantage : null}
            userAttack={userAttacking}
            win={fightWin}
          />
        </div>
      </div>
      <div className="fightBtnsDiv">
        <button className="startFightBtn" onClick={startTheFight}>
          Fight
        </button>
        <button className="fleeBtn" onClick={flee}>
          Flee
        </button>
      </div>
    </div>
  );
}
export default Fight;
