import "../../styles/FightPage.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsListContext } from "../../contexts/itemContexts/ItemsListContext";
import { CharacterContext } from "../../contexts/playerContexts/CharacterContexts";

function FightSummary() {
  const { inGameItems, getItem } = useContext(ItemsListContext);
  const { expUpFunc, canLevelUp } = useContext(CharacterContext);
  const [drop, setDrop] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    lootItemFunc();
  }, []);

  useEffect(() => {
    expUp(10);
  }, []);

  const lootItem = (item) => {
    return getItem(item);
  };

  const lootItemFunc = () => {
    const randInt = Math.floor(Math.random() * inGameItems.length);
    lootItem(inGameItems[randInt]);

    setDrop(inGameItems[randInt].name);
  };

  const expUp = (value) => {
    return expUpFunc(value);
  };

  const proceedToMenu = () => {
    navigate(`/FightPage`, { replace: true });
  };

  return (
    <div className="fightDiv">
      <h2 onClick={() => lootItemFunc()} className="fightHeading">
        Fight summary
      </h2>
      <div className="fightSummaryDiv">
        <h3>You got: {drop}!</h3>
        <h3>Exp up! + 10 xp</h3>
        {canLevelUp ? <h4>Can level up!</h4> : null}
        <button className="summaryBtn" onClick={proceedToMenu}>
          Go back
        </button>
      </div>
    </div>
  );
}
export default FightSummary;
