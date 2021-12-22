import "../../styles/PokemonStats.css";
import React, { useContext } from "react";

function PokemonStats(props) {
  return (
    <div className="pokemonStatsDiv">
      <p>{props.stats.name}</p>
      <p>{props.stats.health} Hp</p>
      <p>{props.stats.defense} Def</p>
      <p>{props.stats.attack} Att</p>
      <p>Ability: {props.stats.ability}</p>
    </div>
  );
}
export default PokemonStats;
