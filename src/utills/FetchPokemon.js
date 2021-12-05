import axios from "axios";
import React, { useEffect, useContext } from "react";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";

const API_URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0";

function FetchPokemon() {
  const { setInitialList } = useContext(PokemonListContext);

  const sentListToContext = (pokemon) => {
    return setInitialList(pokemon);
  };

  useEffect(() => {
    async function fetchPokemons() {
      const fetchedPokemons = [];

      const response = await axios.get(API_URL_POKEMON);
      const fetchedUrl = response.data.results.map((poke) => poke.url);

      axios.all(fetchedUrl.map((url) => axios.get(url))).then(
        axios.spread(function (...res) {
          res.forEach((pokemon) => {
            const pokemonObject = {
              name: pokemon.data.name,
              img: pokemon.data.sprites.front_default,
              discovered: false,
            };
            fetchedPokemons.push(pokemonObject);
          });
          sentListToContext(fetchedPokemons);
        })
      );
    }
    fetchPokemons();
  }, []);

  return <div></div>;
}
export default FetchPokemon;
