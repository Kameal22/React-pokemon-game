import "../styles/Fight.css";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";

const POKE_API = "https://pokeapi.co/api/v2/pokemon/";

function Fight() {
  // const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
  //   useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);

  const [enemy, setEnemy] = useState({});
  const [fightStart, setFightStart] = useState(false);
  const [enemyTurn, setEnemyTurn] = useState(false);

  // const levelUp = (level) => {
  //   return levelUpFunc(level);
  // };

  // const expUp = (exp) => {
  //   return expUpFunc(exp);
  // };

  const start = () => {
    setFightStart(!fightStart);
    showEnemy();
    setEnemyTurn(!enemyTurn);
  };

  const getEnemyStats = async () => {
    let enemyHealth = "";
    let enemyAttack = "";
    let enemyDefense = "";
    let enemyFirstAbility = "";

    const res = await axios.get(`${POKE_API}${enemy.name}`);
    enemyHealth = res.data.stats[0].base_stat;
    enemyAttack = res.data.stats[1].base_stat;
    enemyDefense = res.data.stats[2].base_stat;
    enemyFirstAbility = res.data.abilities[0].ability.name;

    setEnemy((prevState) => ({
      ...prevState,
      health: enemyHealth,
      attack: enemyAttack,
      defense: enemyDefense,
      ability: enemyFirstAbility,
    }));
  };

  const getUserStats = async () => {
    let userHealth = "";
    let userAttack = "";
    let userDefense = "";
    let userFirstAbility = "";

    const res = await axios.get(`${POKE_API}${currentPokemon.name}`);
    userHealth = res.data.stats[0].base_stat;
    userAttack = res.data.stats[1].base_stat;
    userDefense = res.data.stats[2].base_stat;
    userFirstAbility = res.data.abilities[0].ability.name;

    changePokemon((prevState) => ({
      ...prevState,
      health: userHealth,
      attack: userAttack,
      defense: userDefense,
      ability: userFirstAbility,
    }));
  };

  const showEnemy = () => {
    const randInt = Math.floor(Math.random() * pokemonList.length);
    const enemy = pokemonList[randInt];
    setEnemy((prevState) => ({
      ...prevState,
      name: enemy.name,
      img: enemy.img,
    }));
    getEnemyStats();
    getUserStats();
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
            <p className="pokeName">{currentPokemon.name}</p>
            <img src={currentPokemon.img} alt={currentPokemon.name}></img>
            <p>Hp: {currentPokemon.health}</p>
            <p>Att: {currentPokemon.attack}</p>
            <p>Def: {currentPokemon.defense}</p>
            <p>Ability: {currentPokemon.ability}</p>
          </div>
          <div className="enemy">
            <p className="pokeName">{enemy.name}</p>
            <img src={enemy.img} alt={enemy.name}></img>
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
