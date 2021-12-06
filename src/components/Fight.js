import "../styles/Fight.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../contexts/playerContexts/CharacterContexts";

function Fight() {
  const { level, levelUpFunc, exp, expUpFunc, requiredExp, encounters } =
    useContext(CharacterContext);

  const levelUp = (level) => {
    return levelUpFunc(level);
  };

  const expUp = (exp) => {
    return expUpFunc(exp);
  };

  return (
    <div className="pokedexDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="fightHeading">Fight</h2>
      <p>TEST</p>
    </div>
  );
}
export default Fight;
