import "../styles/Character.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";

function Character() {
  const { ownedPokemon } = useContext(OwnedPokemonContext);
  const { currentPokemon, changePokemon } = useContext(CurrentPokemonContext);
  const { level, levelUpFunc, exp, requiredExp, canLevelUp } =
    useContext(CharacterContext);
  const { pokemonList } = useContext(PokemonListContext);

  const handleChange = (event) => {
    const foundPokemon = ownedPokemon.find(
      (pokemon) => pokemon.name === event.target.value
    );
    changePokemon(foundPokemon);
  };

  const levelUp = (value) => {
    return levelUpFunc(1);
  };

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="characterHeading">Character</h2>
      <div className="characterDiv">
        <p>Level : {level}</p>
        <button onClick={levelUp} disabled={!canLevelUp}>
          Level up!
        </button>
        <p>Exp : {exp}</p>
        <p>
          Owned Pokemon : {ownedPokemon.length} of {pokemonList.length}
        </p>
        <p className="aditionalInfo">
          {requiredExp} exp points to reach level {level + 1}
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
