import "../../styles/PokemonImgs.css";
import React, { useContext } from "react";

function PokemonImgs(props) {
  return (
    <div className="pokemonImgDiv">
      <img src={props.img}></img>
    </div>
  );
}
export default PokemonImgs;
