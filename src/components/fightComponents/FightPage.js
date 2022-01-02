import "../../styles/FightPage.css";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { CurrentPokemonContext } from "../../contexts/pokemonContexts/CurrentPokemonContext";

function Fight() {
  const [death, setDeath] = useState(false);
  const { currentPokemon } = useContext(CurrentPokemonContext);

  useEffect(() => {
    checkPokemonHealth();
  }, [currentPokemon]);

  const checkPokemonHealth = () => {
    if (currentPokemon.health <= 0) {
      setDeath(true);
    }
  };

  return (
    <div className="fightDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="fightHeading">Fight</h2>
      <div className="fightSelectingDiv">
        {death ? (
          <h4>heal your Pokemon</h4>
        ) : (
          <h4 className="startEncounter">
            <Link className="startEncounter" to="/Fight">
              Start encounter
            </Link>
          </h4>
        )}
      </div>
    </div>
  );
}
export default Fight;
