import "../styles/Pokedex.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function Pokedex() {
  const location = useLocation();
  const { pokemons } = location.state; //This is how You pass anything between components in Router, so fucking cool and easy.

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
        <Link to="/Equipment">Equipment</Link>
        <Link to="/Character">Character</Link>
        <Link to="/Fight">Fight</Link>
      </div>
      <div className="pokedex">
        <h2 className="pokedexHeading">Your Pokedex</h2>
        <div className="pokedexPokemons">
          {pokemons.map((pokemon) => {
            return <img src={pokemon.img}></img>;
          })}
        </div>
      </div>
    </div>
  );
}
export default Pokedex;
