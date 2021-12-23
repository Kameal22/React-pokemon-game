import "../../styles/PokemonStats.css";

function PokemonStats(props) {
  return (
    <div className="pokemonStatsDiv">
      <p>{props.stats.name}</p>
      <p style={props.advantage ? { color: "green" } : { color: "white" }}>
        {props.stats.type}
      </p>
      <p>{props.stats.health} Hp</p>
      <p>{props.stats.defense} Def</p>
      <p>{props.stats.attack} Att</p>
      <p>Ability: {props.stats.ability}</p>
    </div>
  );
}
export default PokemonStats;
