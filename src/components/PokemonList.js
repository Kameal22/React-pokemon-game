import React, { useState, useContext } from "react";
import "../styles/PokemonList.css";
import { Link } from "react-router-dom";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";
import { OwnedItemsContext } from "../contexts/itemContexts/OwnedItemsContext";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

function PokemonList() {
  const [start, setStart] = useState(false);
  const [userChoice, setUserChoice] = useState([]);

  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);
  const { discoverPokemon } = useContext(OwnedPokemonContext);
  const { getItem } = useContext(OwnedItemsContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { itemsList } = useContext(ItemsListContext);

  const showStarterPokes = () => {
    const starterPokes = [];

    while (starterPokes.length < 3) {
      let randInt = Math.floor(Math.random() * pokemonList.length);
      const starterObject = {
        name: pokemonList[randInt].name,
        type: pokemonList[randInt].type,
        img: pokemonList[randInt].img,
        health: pokemonList[randInt].health,
        defense: pokemonList[randInt].defense,
        attack: pokemonList[randInt].attack,
        ability: pokemonList[randInt].ability,
      };
      starterPokes.push(starterObject);
    }
    setUserChoice(starterPokes);
    setStart(true);
  };

  const changeCurrentPokemon = (pokemon) => {
    return changePokemon(pokemon);
  };

  const discoverNewPokemon = (pokemon) => {
    return discoverPokemon(pokemon);
  };

  const addItems = (item) => {
    return getItem(item);
  };

  const chooseStarterPokemon = (pokemon) => {
    changeCurrentPokemon(pokemon);
    discoverNewPokemon(pokemon);
    const currPoke = pokemonList.findIndex(
      (poke) => poke.name === pokemon.name
    );

    pokemonList[currPoke].discovered = true;

    addItems(itemsList);
    window.localStorage.setItem(
      "currentPokemonName",
      JSON.stringify(pokemon.name)
    );
    window.localStorage.setItem(
      "currentPokemonImg",
      JSON.stringify(pokemon.img)
    );
    window.localStorage.setItem("TEST", JSON.stringify(pokemon.discovered));
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
            <Link to="/Pokedex">Pokedex</Link>
            <Link to="/Equipment">Equipment</Link>
            <Link to="/Character">Character</Link>
            <Link to="/Fight">Fight</Link>
          </div>
        </div>
        <div className="chosenPokemonMainView">
          <p>{currentPokemon.name}</p>
          <img src={currentPokemon.img} alt={currentPokemon.name}></img>
        </div>
        <p onClick={startOver} className="startOver">
          Start over
        </p>
      </div>
    );
  }
}
export default PokemonList;
