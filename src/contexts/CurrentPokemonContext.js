import React, { createContext, useState } from "react";

export const PokemonContext = createContext();

export function PokemonSelector(props) {
  const [currentPokemon, setCurrentPokemon] = useState("");
  const changePokemon = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  return (
    <PokemonContext.Provider value={{ currentPokemon, changePokemon }}>
      {props.children}
    </PokemonContext.Provider>
  );
}
