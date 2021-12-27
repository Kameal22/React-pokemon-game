import "../../styles/PokemonImgs.css";

function PokemonImgs(props) {
  return (
    <div className="pokemonImgDiv">
      <img
        style={props.enemyAttack ? { transform: "translateX(-300px)" } : null}
        src={props.img}
      ></img>
    </div>
  );
}
export default PokemonImgs;
