import "../styles/Character.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { OwnedPokemonContext } from "../contexts/OwnedPokemon";
import { PokemonContext } from "../contexts/CurrentPokemonContext";

function Character() {
  const [level] = useState(1);
  const [exp] = useState(0);
  const [requiredExp] = useState(10);
  const [encounters] = useState(1);

  const { ownedPokemon } = useContext(OwnedPokemonContext);
  const { currentPokemon, changePokemon } = useContext(PokemonContext);

  const handleChange = (event) => {
    const foundPokemon = ownedPokemon.find(
      (pokemon) => pokemon.name === event.target.value
    );
    changePokemon(foundPokemon);
  };

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="characterHeading">Character</h2>
      <div className="characterDiv">
        <h3 onClick={() => console.log(ownedPokemon)}>username here</h3>
        <p>Level : {level}</p>
        <p>Exp : {exp}</p>
        <p>Owned Pokemon : {encounters} of 200</p>
        <p className="aditionalInfo">
          {requiredExp} exp points to reach level 2
        </p>
        <div className="currPokemonDiv">
          <p>Current Pokemon :</p>
          <img src={currentPokemon.img} alt={currentPokemon.name}></img>
        </div>
        <div className="changePokemonDiv">
          <p>Change pokemon </p>
          <select name="changePoke" onChange={handleChange}>
            {ownedPokemon.map((pokemon) => {
              return (
                <option value={pokemon.name} key={pokemon.name}>
                  {pokemon.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
export default Character;
