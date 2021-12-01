import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "../styles/PokemonList.css";
import { Link } from "react-router-dom";
import { PokemonContext } from "../contexts/CurrentPokemonContext";
import { OwnedPokemonContext } from "../contexts/OwnedPokemon";

const API_URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0";
const API_URL_ITEMS = "https://pokeapi.co/api/v2/item/?limit=35&offset=0";

function PokemonList() {
  const [start, setStart] = useState(false);
  const [chosenPokemon, setChosenPokemon] = useState({});
  const [pokemonList, setPokemonList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [userChoice, setUserChoice] = useState([]);

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
            };
            fetchedPokemons.push(pokemonObject);
          });
          setPokemonList(fetchedPokemons);
        })
      );
    }
    async function fetchItems() {
      const fetchedItems = [];

      const response = await axios.get(API_URL_ITEMS);
      const fetchedUrl = response.data.results.map((item) => item.url);

      axios.all(fetchedUrl.map((url) => axios.get(url))).then(
        axios.spread(function (...res) {
          res.forEach((item) => {
            const itemObject = {
              name: item.data.name,
              img: item.data.sprites.default,
              usage: item.data.effect_entries[0].effect,
            };
            fetchedItems.push(itemObject);
          });
          setItemsList(fetchedItems);
        })
      );
    }
    fetchPokemons();
    fetchItems();
  }, []);

  const showStarterPokes = () => {
    const starterPokes = [];

    while (starterPokes.length < 3) {
      let randInt = Math.floor(Math.random() * pokemonList.length);
      const starterObject = {
        name: pokemonList[randInt].name,
        img: pokemonList[randInt].img,
      };
      starterPokes.push(starterObject);
    }
    setUserChoice(starterPokes);
    setStart(true);
  };

  const { changePokemon } = useContext(PokemonContext);
  const { discoverPokemon } = useContext(OwnedPokemonContext);

  const changeCurrentPokemon = (pokemon) => {
    return changePokemon(pokemon);
  };

  const discoverNewPokemon = (pokemon) => {
    return discoverPokemon(pokemon);
  };

  const chooseStarterPokemon = (pokemon) => {
    setChosenPokemon(pokemon);
    changeCurrentPokemon(pokemon);
    discoverNewPokemon(pokemon);
    window.localStorage.setItem(
      "userPokemonName",
      JSON.stringify(pokemon.name)
    );
    window.localStorage.setItem("userPokemonImg", JSON.stringify(pokemon.img));
  };

  const startOver = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  if (window.localStorage.length === 0) {
    return (
      <div className="mainDiv">
        <h1 className="mainHeading">
          {start ? "Choose Your pokemon" : "Press start"}
        </h1>
        <div className="pokeChoiceDiv">
          {userChoice.map((pokemon) => {
            return (
              <img
                src={pokemon.img}
                alt={pokemon.name}
                key={pokemon.name}
                onClick={() => chooseStarterPokemon(pokemon)}
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
  } else {
    return (
      <div className="afterChoiceDiv">
        <div className="nav">
          <h1 className="gameName">pokeGame</h1>
          <div className="navLinks">
            <Link
              to="/Pokedex"
              state={{ pokemons: pokemonList, items: itemsList }}
            >
              Pokedex
            </Link>
            <Link to="/Equipment" state={{ items: itemsList }}>
              Equipment
            </Link>
            <Link to="/Character">Character</Link>
            <Link to="/Fight">Fight</Link>
          </div>
        </div>
        <div className="chosenPokemonMainView">
          <p>{window.localStorage.getItem("userPokemonName").slice(1, -1)}</p>
          <img
            src={window.localStorage.getItem("userPokemonImg").slice(1, -1)}
          ></img>
        </div>
        <p onClick={startOver} className="startOver">
          Start over
        </p>
      </div>
    );
  }
}
export default PokemonList;
