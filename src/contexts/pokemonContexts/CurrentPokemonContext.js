import React, { createContext, useState } from "react";

export const CurrentPokemonContext = createContext();

export function PokemonSelector(props) {
  const [currentPokemon, setCurrentPokemon] = useState({});

  const changePokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const changeStats = (pokemon, name) => {
    pokemon.name = name;
  };

  return (
    <CurrentPokemonContext.Provider
      value={{ currentPokemon, changePokemon, changeStats }}
    >
      {props.children}
    </CurrentPokemonContext.Provider>
  );
}
