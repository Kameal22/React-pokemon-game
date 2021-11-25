import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/PokemonList.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0";

function PokemonList() {
  const [start, setStart] = useState(false);
  const [pokemonList, setPokemonList] = useState({});
  const [userChoice, setUserChoice] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const fetchedUrls = [];
      const details = [];

      const response = await axios.get(API_URL);
      const fetchedUrl = response.data.results.map((poke) => poke.url);

      fetchedUrls.push(fetchedUrl);

      axios.all(fetchedUrl.map((url) => axios.get(url))).then(
        axios.spread(function (...res) {
          res.forEach((pokemon) => {
            if (!details.includes(pokemon.data.sprites.front_default)) {
              details.push(pokemon.data.sprites.front_default);
            }
          });
          setPokemonList(details);
        })
      );
    }
    fetchPokemons();
  }, []);

  const showStarterPokes = () => {
    const images = [];

    while (images.length < 3) {
      let randInt = Math.floor(Math.random() * pokemonList.length);
      images.push(pokemonList[randInt]);
    }
    setUserChoice(images);
  };

  return (
    <div className="mainDiv">
      <h1 className="mainHeading">Poke game</h1>
      <div className="pokeChoiceDiv">
        {userChoice.map((pokemon) => {
          return <img src={pokemon}></img>;
        })}
      </div>
      {start ? null : (
        <button onClick={showStarterPokes} className="startBtn">
          Start the game
        </button>
      )}
    </div>
  );
}
export default PokemonList;
