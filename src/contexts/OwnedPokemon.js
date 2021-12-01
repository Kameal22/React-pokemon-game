import React, { createContext, useState } from "react";

export const OwnedPokemonContext = createContext();

export function OwnPokemon(props) {
  const [ownedPokemon, setOwnedPokemon] = useState([]);

  const discoverPokemon = (pokemon) => {
    setOwnedPokemon([pokemon]);
    window.localStorage.setItem("ownedPokemons", JSON.stringify(pokemon));
  };

  return (
    <OwnedPokemonContext.Provider value={{ ownedPokemon, discoverPokemon }}>
      {props.children}
    </OwnedPokemonContext.Provider>
  );
}
