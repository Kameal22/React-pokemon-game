import React, { createContext, useState } from "react";

export const PokemonListContext = createContext();

export function PokemonListModifier(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [discoverPokemon, setDiscoveredPokemon] = useState([]);

  const setInitialList = (pokemonList) => {
    setPokemonList(pokemonList);
  };

  return (
    <PokemonListContext.Provider
      value={{
        setInitialList,
        pokemonList,
        discoverPokemon,
        setDiscoveredPokemon,
      }}
    >
      {props.children}
    </PokemonListContext.Provider>
  );
}
