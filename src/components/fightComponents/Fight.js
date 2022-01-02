import "../../styles/Fight.css";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [fightloss, setFightLoss] = useState(false);

  const [fightHelperState, setFightHelperState] = useState(false);
  const [scdFightHelperState, setScdFightHelperState] = useState(false);

  const navigate = useNavigate();

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
      setUserMoving(false);
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
        setFightHelperState(!fightHelperState);
        resolve();
      }, 1000);
    });
  };

  const userAbilityAttackTurn = () => {
    return new Promise((resolve) => {
      setUserMoving(false);
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
    setUserMoving(false);
    return new Promise((resolve) => {
      setTimeout(() => {
        setPokeballThrow(true);
        resolve();
      }, 1000);
    });
  };

  const userCatchPokemonTurn = () => {
    return new Promise((resolve) => {
      if (Math.random() < 0.5) {
        setTimeout(() => {
          discoverNewPokemon(enemy);
          setEnemyCaught(true);
          setPokeballThrow(false);
          setTimeout(() => {
            navigate(`/FightPage`, { replace: true });
          }, 1500);
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
    setUserMoving(false);
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
      setFightLoss(true);
      setTimeout(() => {
        navigate(`/FightPage`, { replace: true });
      }, 1500);
    }
  };

  const checkEnemyDeath = () => {
    if (enemy.health > 0) {
      enemyTurnFunc();
    } else if (enemy.health <= 0) {
      setFightWin(true);
      expUp(10);
      setTimeout(() => {
        navigate(`/FightPage`, { replace: true });
      }, 1500);
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
    navigate(`/FightPage`, { replace: true });
  };

  return (
    <div className="fightDiv">
      <h2 className="fightHeading">Fight</h2>
      <div className="startedFightDiv">
        <div className="userDiv">
          <PokemonImgs
            img={currentPokemon.img}
            userAttack={userAttacking}
            lost={fightloss}
          />
          <div style={fightloss ? { display: "none" } : { display: "flex" }}>
            <img
              style={pokeballThrow ? { transform: "translateX(300px)" } : null}
              src={itemsList[0].img}
            ></img>
            <img src={itemsList[1].img}></img>
            <p
              style={
                potionUse
                  ? { display: "block", color: "green", fontSize: "0.5em" }
                  : { display: "none" }
              }
            >
              + 25 hp!
            </p>
          </div>
          <PokemonStats
            stats={currentPokemon}
            advantage={advantage}
            userTurn={userMoving}
            enemyAttack={enemyAttacking}
            basicAttack={basicAttackFunc}
            abilityAttack={abilityAttackFunc}
            potionUse={potionUseFunc}
            pokeballUse={pokeballUseFunc}
            lost={fightloss}
            flee={flee}
          />
        </div>
        <div className="enemyDiv">
          <PokemonImgs
            img={enemy.img}
            enemyAttack={enemyAttacking}
            win={fightWin}
            caught={enemyCaught}
          />
          <PokemonStats
            stats={enemy}
            advantage={advantage !== null ? !advantage : null}
            userAttack={userAttacking}
            win={fightWin}
            caught={enemyCaught}
          />
        </div>
      </div>
      <div
        className="fightBtnsDiv"
        style={encounterStart ? { display: "none" } : { display: "flex" }}
      >
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
