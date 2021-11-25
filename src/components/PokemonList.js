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
      const fetchedPokemons = {};

      const response = await axios.get(API_URL);
      const fetchedNames = response.data.results.map((poke) => poke.name);
      const fetchedDetails = response.data.results.map((poke) => poke.url);

      fetchedPokemons.names = fetchedNames;
      fetchedPokemons.details = fetchedDetails;

      setPokemonList(fetchedPokemons);
    }
    fetchPokemons();
  }, []);

  const showStarterPokes = () => {
    const tempUsersChoice = [];

    while (tempUsersChoice.length < 3) {
      let randInt = Math.floor(Math.random() * pokemonList.details.length);
      tempUsersChoice.push(pokemonList.details[randInt]);
    }
    const images = [];

    axios.all(tempUsersChoice.map((choice) => axios.get(choice))).then(
      axios.spread(function (...res) {
        res.forEach((poke) => {
          if (!images.includes(poke.data.sprites.front_default)) {
            images.push(poke.data.sprites.front_default);
          }
        });
        setUserChoice(images);
      })
    );
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
        <button className="startBtn" onClick={showStarterPokes}>
          Start the game
        </button>
      )}
    </div>
  );
}
export default PokemonList;
