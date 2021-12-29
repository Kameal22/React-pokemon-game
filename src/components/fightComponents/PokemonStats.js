import "../../styles/PokemonStats.css";

function PokemonStats(props) {
  let advantageStyle = {
    color: "ivory",
  };

  let advantageDefense = props.stats.defense;

  if (props.advantage !== undefined && props.advantage !== null) {
    if (!props.advantage) {
      advantageDefense = advantageDefense - 25;
    }
  }

  if (props.advantage !== undefined && props.advantage !== null) {
    if (props.advantage) {
      advantageStyle.color = "green";
    } else {
      advantageStyle.color = "red";
    }
  }

  let attackingStyle = {
    color: "ivory",
  };

  if (props.userAttack) {
    attackingStyle.color = "red";
  } else if (props.enemyAttack) {
    attackingStyle.color = "red";
  } else {
    attackingStyle.color = "ivory";
  }

  const basicAttack = () => {
    props.basicAttack();
  };

  const abilityAttack = () => {
    props.abilityAttack();
  };

  const potionUse = () => {
    props.potionUse();
  };

  const pokeballUse = () => {
    props.pokeballUse();
  };

  if (!props.win) {
    if (props.userTurn) {
      return (
        <div className="pokemonStatsDiv">
          <p onClick={basicAttack}>Normal attack</p>
          <p onClick={abilityAttack}>{props.stats.ability}</p>
          <p onClick={potionUse}>Use potion</p>
          <p onClick={pokeballUse}>Use pokeball</p>
        </div>
      );
    } else {
      return (
        <div className="pokemonStatsDiv">
          <p>{props.stats.name}</p>
          <p style={advantageStyle}>{props.stats.type}</p>
          <p style={attackingStyle}>{props.stats.health} Hp</p>
          <p style={advantageStyle}>{advantageDefense} Def</p>
          <p>{props.stats.attack} Att</p>
          <p>Ability: {props.stats.ability}</p>
        </div>
      );
    }
  } else {
    return null;
  }
}
export default PokemonStats;
