import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";

function Equipment() {
  const { itemsList, removeItem, potion } = useContext(ItemsListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);

  const potionHeal = (pokemon, health) => {
    return changeStats(pokemon, health);
  };

  const hpAfterHealing = currentPokemon.health + 25;

  const usePotion = (item) => {
    return removeItem(item);
  };

  const usePotionFunc = () => {
    usePotion(potion);
    potionHeal(currentPokemon, hpAfterHealing);
  };

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 onClick={usePotionFunc} className="equipmentHeading">
        Your items
      </h2>
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
