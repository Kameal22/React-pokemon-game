import React, { useState, useContext, useEffect } from "react";
import "../styles/PokemonList.css";
import { useNavigate } from "react-router-dom";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

function PokemonList() {
  const [start, setStart] = useState(false);
  const [userChoice, setUserChoice] = useState([]);

  const navigate = useNavigate();

  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);
  const { discoverPokemon, setPokemonMaxHp } = useContext(OwnedPokemonContext);
  const { pokemonList } = useContext(PokemonListContext);
  const { itemsList, setInitialList } = useContext(ItemsListContext);

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
      if (!starterPokes.some((pokes) => pokes.name === starterObject.name)) {
        starterPokes.push(starterObject);
      }
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

  const discoverNewPokemonsMaxHp = (name, health) => {
    return setPokemonMaxHp(name, health);
  };

  const setInitialItems = (item) => {
    return setInitialList(item);
  };

  const chooseStarterPokemon = (pokemon) => {
    changeCurrentPokemon(pokemon);
    discoverNewPokemon(pokemon);
    discoverNewPokemonsMaxHp(pokemon.name, pokemon.health);
    const currPoke = pokemonList.findIndex(
      (poke) => poke.name === pokemon.name
    );

    pokemonList[currPoke].discovered = true;

    setInitialItems(itemsList);

    navigate(`/MainPage`, { replace: true });
  };

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
}
export default PokemonList;
