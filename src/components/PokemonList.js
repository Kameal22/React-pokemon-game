import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/PokemonList.css";
import { Link } from "react-router-dom";

const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0";

function PokemonList() {
  const [start, setStart] = useState(false);
  const [pokemonChoice, setPokemonChoice] = useState(false);
  const [chosenPokemon, setChosenPokemon] = useState(false); // Somehow pass chosen pokemon to UserView Component and send user there!!!!!!!!
  const [pokemonList, setPokemonList] = useState({});
  const [userChoice, setUserChoice] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const details = [];

      const response = await axios.get(API_URL);
      const fetchedUrl = response.data.results.map((poke) => poke.url);

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
    setStart(true);
  };

  const chooseStarterPokemon = () => {
    setPokemonChoice(true);
  };

  return (
    <div className="mainDiv">
      {pokemonChoice ? (
        <div className="NavLinks">
          <Link to="/Pokedex">Pokedex</Link>
          <Link to="/Equipment">Equipment</Link>
          <Link to="/Character">Character</Link>
        </div>
      ) : (
        <h1 className="mainHeading">
          {start ? "Choose Your pokemon" : "Press start"}
        </h1>
      )}
      <div className="pokeChoiceDiv">
        {userChoice.map((pokemon) => {
          return (
            <img
              src={pokemon}
              onClick={chooseStarterPokemon}
              className="firstChoiceImgs"
            ></img>
          );
        })}
      </div>
      <button
        style={start ? { opacity: 0 } : { opacity: 1, cursor: "pointer" }}
        onClick={showStarterPokes}
        className="startBtn"
      >
        Start the game
      </button>
    </div>
  );
}
export default PokemonList;
