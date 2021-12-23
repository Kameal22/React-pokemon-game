import "../../styles/PokemonImgs.css";

function PokemonImgs(props) {
  return (
    <div className="pokemonImgDiv">
      <img src={props.img}></img>
    </div>
  );
}
export default PokemonImgs;
