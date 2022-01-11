import React, { useState, useContext, useEffect } from "react";
import "../styles/PokemonList.css";
import { Link, useNavigate } from "react-router-dom";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";

function PokemonList() {
  const [death, setDeath] = useState(false);

  const navigate = useNavigate();

  const { currentPokemon } = useContext(CurrentPokemonContext);

  useEffect(() => {
    checkPokemonHealth();
  }, [currentPokemon]);

  const checkPokemonHealth = () => {
    if (currentPokemon.health <= 0) {
      setDeath(true);
    }
  };

  const startOver = () => {
    navigate(`/`, { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="afterChoiceDiv">
      <div className="nav">
        <h1 className="gameName">pokeGame</h1>
        <div className="navLinks">
          <Link to="/Pokedex">Pokedex</Link>
          <Link to="/Equipment">Equipment</Link>
          <Link to="/Character">Character</Link>
          <Link to="/FightPage">Fight</Link>
        </div>
      </div>
      <div className="chosenPokemonMainView">
        <p>{currentPokemon.name}</p>
        <p style={{ color: "red" }}>
          {death ? `${currentPokemon.health} Hp` : null}
        </p>
        <img
          style={
            death ? { filter: "brightness(0)" } : { filter: "brightness(1)" }
          }
          src={currentPokemon.img}
          alt={currentPokemon.name}
        ></img>
      </div>
      <p onClick={startOver} className="startOver">
        Start over
      </p>
    </div>
  );
}
export default PokemonList;
