import "../../styles/FightPage.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Fight() {
  //Show enemy here, or create a fight context

  return (
    <div className="fightDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="fightHeading">Fight</h2>
      <div className="fightSelectingDiv">
        <h4 className="startEncounter">
          <Link to="/Fight">Start encounter</Link>
        </h4>
      </div>
    </div>
  );
}
export default Fight;
