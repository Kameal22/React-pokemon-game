import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { OwnedItemsContext } from "../contexts/OwnedItemsContext";

function Equipment() {
  const { ownedItem } = useContext(OwnedItemsContext);

  const setStarterItems = () => {
    const starterItems = [];

    starterItems.push(ownedItem[0][3], ownedItem[0][16], ownedItem[0][17]);

    return starterItems;
  };

  const starters = setStarterItems();

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="equipmentHeading">Your items</h2>
      <div className="itemsDiv">
        {starters.map((item) => {
          return <img className="itemImg" src={item.img} alt={item.name} />;
        })}
      </div>
    </div>
  );
}
export default Equipment;
