import "../../styles/PokemonImgs.css";

function PokemonImgs(props) {
  let attackingStyle = {
    transform: "translateX(0px)",
  };

  if (props.userAttack) {
    attackingStyle.transform = "translateX(300px)";
  } else if (props.enemyAttack) {
    attackingStyle.transform = "translateX(-300px)";
  } else {
    attackingStyle.transform = null;
  }

  return (
    <div className="pokemonImgDiv">
      <img style={attackingStyle} src={props.img}></img>
    </div>
  );
}
export default PokemonImgs;
