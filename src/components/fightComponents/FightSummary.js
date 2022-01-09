import "../../styles/FightPage.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsListContext } from "../../contexts/itemContexts/ItemsListContext";
import { CharacterContext } from "../../contexts/playerContexts/CharacterContexts";

function FightSummary() {
  const { itemsList, getItem } = useContext(ItemsListContext);
  const { expUpFunc } = useContext(CharacterContext);
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
    const randInt = Math.floor(Math.random() * itemsList.length);
    lootItem(itemsList[randInt]);
  };

  const expUp = (value) => {
    return expUpFunc(value);
  };

  const proceedToMenu = () => {
    navigate(`/FightPage`, { replace: true });
  };

  return (
    <div className="fightDiv">
      <h2 className="fightHeading">Fight summary</h2>
      <div className="fightSelectingDiv">
        <h3>You got: item</h3>
        <h3>Exp up!</h3>
        <button onClick={proceedToMenu}>Go back</button>
      </div>
    </div>
  );
}
export default FightSummary;
