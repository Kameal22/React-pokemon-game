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

  if (!props.win && !props.lost && !props.caught) {
    return (
      <div className="pokemonImgDiv">
        <img style={attackingStyle} src={props.img}></img>
      </div>
    );
  } else if (props.win) {
    return (
      <div className="pokemonImgDiv">
        <h2 style={{ color: "green" }}>You win!</h2>
      </div>
    );
  } else if (props.lost) {
    return (
      <div className="pokemonImgDiv">
        <h2 style={{ color: "red" }}>You died</h2>
      </div>
    );
  } else if (props.caught) {
    return (
      <div className="pokemonImgDiv">
        <h2 style={{ color: "green" }}>You got it!</h2>
      </div>
    );
  }
}
export default PokemonImgs;
