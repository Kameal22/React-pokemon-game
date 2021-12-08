import React, { createContext, useState } from "react";

export const CurrentPokemonContext = createContext();

export function PokemonSelector(props) {
  const [currentPokemon, setCurrentPokemon] = useState({});

  const changePokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  return (
    <CurrentPokemonContext.Provider value={{ currentPokemon, changePokemon }}>
      {props.children}
    </CurrentPokemonContext.Provider>
  );
}
