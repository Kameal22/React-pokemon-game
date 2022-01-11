import "../styles/Equipment.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";
import { CurrentPokemonContext } from "../contexts/pokemonContexts/CurrentPokemonContext";
import { OwnedPokemonContext } from "../contexts/pokemonContexts/OwnedPokemonContext";

function Equipment() {
  const { itemsList, removeItem, potion, antidote } =
    useContext(ItemsListContext);
  const { currentPokemon, changeStats } = useContext(CurrentPokemonContext);
  const { ownedPokemonHp } = useContext(OwnedPokemonContext);

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

  const consumeAntidote = (item) => {
    return removeItem(item);
  };

  const getCurrentMaxHp = () => {
    const currentPokeStat = ownedPokemonHp.find(
      (pokemon) => pokemon.name === currentPokemon.name
    );

    return currentPokeStat.health;
  };

  const consumeAntidoteFunc = () => {
    if (itemsList.indexOf(antidote) !== -1) {
      consumeAntidote(antidote);
    }
    if (currentPokemon.health <= 0) {
      potionHeal(currentPokemon, getCurrentMaxHp);
    }
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
              className={item.name}
              src={item.img}
              alt={item.name}
              key={item.name}
            />
          );
        })}
        <p className="numPotions">{potionsAmmount.length}</p>
        <button
          disabled={itemsList.indexOf(potion) === -1}
          className="usePotionBtn"
          onClick={consumePotionFunc}
        >
          use
        </button>
        <p className="numAntidotes">{antidoteAmmount.length}</p>
        <button
          disabled={
            itemsList.indexOf(antidote) === -1 || currentPokemon.health > 0
          }
          className="useAntidoteBtn"
          onClick={consumeAntidoteFunc}
        >
          use
        </button>
        <p className="numPokebals">{pokeballAmmount.length}</p>
      </div>
    </div>
  );
}
export default Equipment;
