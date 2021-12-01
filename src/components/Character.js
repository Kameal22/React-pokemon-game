import "../styles/Character.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { OwnedPokemonContext } from "../contexts/OwnedPokemon";
import { PokemonContext } from "../contexts/CurrentPokemonContext";

function Character() {
  const [level, levelUp] = useState(1);
  const [exp, expUp] = useState(0);
  const [requiredExp, showRequiredExp] = useState(10);
  const [encounters, addEncounter] = useState(1);

  const { ownedPokemon } = useContext(OwnedPokemonContext);
  const { currentPokemon, changePokemon } = useContext(PokemonContext);

  const handleChange = (event) => {
    changePokemon(event);
  };

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="characterHeading">Character</h2>
      <div className="characterDiv">
        <h3>username here</h3>
        <p>Level : {level}</p>
        <p>Exp : {exp}</p>
        <p>Owned Pokemon : {encounters} of 200</p>
        <p className="aditionalInfo">
          {requiredExp} exp points to reach level 2
        </p>
        <div className="currPokemonDiv">
          <p>Current Pokemon :</p>
          <img src={currentPokemon.img}></img>
        </div>
        <div className="changePokemonDiv">
          <p onClick={() => console.log(ownedPokemon)}>Change pokemon </p>
          <select value={ownedPokemon} onChange={handleChange}>
            {ownedPokemon.map((pokemon) => {
              return (
                <option value={pokemon} key={pokemon}>
                  {pokemon}
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
