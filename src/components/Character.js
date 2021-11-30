import "../styles/Character.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Character() {
  const [level, levelUp] = useState(1);
  const [exp, expUp] = useState(0);
  const [requiredExp, showRequiredExp] = useState(10);
  const [encounters, addEncounter] = useState(1);
  const [currPokemon, setCurrPokemon] = useState("");

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
        <p>Encountered Pokemon : {encounters} of 200</p>
        <p className="aditionalInfo">
          {requiredExp} exp points to reach level 2
        </p>
        <p>Current Pokemon : </p>
      </div>
    </div>
  );
}
export default Character;
