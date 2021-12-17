import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

function Equipment() {
  const { itemsList } = useContext(ItemsListContext);

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 className="equipmentHeading">Your items</h2>
      <div className="itemsDiv">
        {itemsList.map((item) => {
          return <img className="itemImg" src={item.img} alt={item.name} />;
        })}
      </div>
    </div>
  );
}
export default Equipment;
