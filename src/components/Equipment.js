import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

function Equipment() {
  const { itemsList, getItem, removeItem } = useContext(ItemsListContext);

  const lootItem = (item) => {
    return getItem(item);
  };

  const lootItemFunc = () => {
    const randInt = Math.floor(Math.random() * itemsList.length);
    lootItem(itemsList[randInt]);
  };

  const useItem = (item) => {
    return removeItem(item);
  };

  const useItemFunc = (item) => {
    useItem(itemsList[1]);
  };

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="equipmentHeading">Your items</h2>
      <div className="itemsDiv">
        {itemsList.map((item) => {
          return (
            <img
              className="itemImg"
              src={item.img}
              alt={item.name}
              key={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Equipment;
