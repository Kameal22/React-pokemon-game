import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";

function Equipment() {
  const { itemsList, removeItem, potion } = useContext(ItemsListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);

  const potionsAmmount = itemsList.filter((value) => value.name === "potion");
  const pokeballAmmount = itemsList.filter(
    (value) => value.name === "poke-ball"
  );
  const antidoteAmmount = itemsList.filter(
    (value) => value.name === "antidote"
  );

  const potionHeal = (pokemon, health) => {
    return changeStats(pokemon, health);
  };

  const hpAfterHealing = currentPokemon.health + 25;

  const consumePotion = (item) => {
    return removeItem(item);
  };

  const consumePotionFunc = () => {
    if (itemsList.indexOf(potion) !== -1) {
      consumePotion(potion);
    }
    potionHeal(currentPokemon, hpAfterHealing);
  };

  return (
    <div className="equipmentDiv">
      <div className="navLinksScd">
        <Link to="/">Home</Link>
      </div>
      <h2 onClick={() => consumePotionFunc()} className="equipmentHeading">
        Your items
      </h2>
      <div className="itemsDiv">
        {itemsList.map((item) => {
          return (
            <img
              className={item.name}
              src={item.img}
              alt={item.name}
              key={item.name}
            />
          );
        })}
        <p className="numPotions">{potionsAmmount.length}</p>
        <p className="numPokebals">{pokeballAmmount.length}</p>
        <p className="numAntidotes">{antidoteAmmount.length}</p>
      </div>
    </div>
  );
}
export default Equipment;
