import "../../styles/PokemonStats.css";
import React, { useContext } from "react";
import { PokemonListContext } from "../contexts/pokemonContexts/PokemonListContext";

function PokemonStats() {
  const { pokemonList } = useContext(PokemonListContext);

  return (
    <div className="pokemonStatsDiv">
      <p style={{ color: "white" }}>HERE YOU WILL SEE STATISTICS</p>
    </div>
  );
}
export default PokemonStats;
