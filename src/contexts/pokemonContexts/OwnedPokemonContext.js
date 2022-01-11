import React, { createContext, useState } from "react";

export const OwnedPokemonContext = createContext();

export function OwnPokemon(props) {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [ownedPokemonHp, setOwnedPokemonHp] = useState([]);

  const discoverPokemon = (pokemon) => {
    pokemon.discovered = true;
    setOwnedPokemon((prevArr) => [...prevArr, pokemon]);
  };

  const setPokemonMaxHp = (name, health) => {
    setOwnedPokemonHp((prevArr) => [...prevArr, { name, health }]);
  };

  return (
    <OwnedPokemonContext.Provider
      value={{ ownedPokemon, ownedPokemonHp, discoverPokemon, setPokemonMaxHp }}
    >
      {props.children}
    </OwnedPokemonContext.Provider>
  );
}
