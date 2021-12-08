import React, { createContext, useState } from "react";
import axios from "axios";

const POKE_API = "https://pokeapi.co/api/v2/pokemon/";

export const CurrentPokemonContext = createContext();

export function PokemonSelector(props) {
  const [currentPokemon, setCurrentPokemon] = useState({});

  const changePokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  // const getEnemyStats = async () => {
  //   let enemyHealth = "";
  //   let enemyAttack = "";
  //   let enemyDefense = "";

  //   const res = await axios.get(`${POKE_API}${enemy.name}`);
  //   enemyHealth = res.data.stats[0].base_stat;
  //   enemyAttack = res.data.stats[1].base_stat;
  //   enemyDefense = res.data.stats[2].base_stat;

  //   setEnemy((prevState) => ({
  //     ...prevState,
  //     health: enemyHealth,
  //     attack: enemyAttack,
  //     defense: enemyDefense,
  //   }));
  // };

  return (
    <CurrentPokemonContext.Provider value={{ currentPokemon, changePokemon }}>
      {props.children}
    </CurrentPokemonContext.Provider>
  );
}
