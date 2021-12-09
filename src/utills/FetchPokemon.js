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
              type: pokemon.data.types[0].type.name,
              img: pokemon.data.sprites.front_default,
              health: pokemon.data.stats[0].base_stat,
              attack: pokemon.data.stats[1].base_stat,
              defense: pokemon.data.stats[2].base_stat,
              ability: pokemon.data.abilities[0].ability.name,
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
