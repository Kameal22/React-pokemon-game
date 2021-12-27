import "../../styles/PokemonStats.css";

function PokemonStats(props) {
  let advantageStyle = {
    color: "ivory",
  };

  if (props.advantage !== undefined && props.advantage !== null) {
    if (props.advantage) {
      advantageStyle.color = "green";
    } else {
      advantageStyle.color = "red";
    }
  }

  return (
    <div className="pokemonStatsDiv">
      <p>{props.stats.name}</p>
      <p style={advantageStyle}>{props.stats.type}</p>
      <p>{props.stats.health} Hp</p>
      <p>{props.stats.defense} Def</p>
      <p>{props.stats.attack} Att</p>
      <p>Ability: {props.stats.ability}</p>
    </div>
  );
}
export default PokemonStats;
