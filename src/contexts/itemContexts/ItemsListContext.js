import React, { createContext, useState } from "react";

export const ItemsListContext = createContext();

export function ItemsListModifier(props) {
  const [itemsList, setItemsList] = useState([]);

  const potion = itemsList.find((item) => item.name === "potion");
  const pokeball = itemsList.find((item) => item.name === "poke-ball");
  const antidote = itemsList.find((item) => item.name === "antidote");

  const potionsArray = itemsList.filter((value) => value.name === "potion");
  const pokeballArray = itemsList.filter((value) => value.name === "poke-ball");
  const antidoteArray = itemsList.filter((value) => value.name === "antidote");

  const setInitialList = (itemsList) => {
    setItemsList(itemsList);
  };

  const getItem = (item) => {
    setItemsList((prevArr) => [...prevArr, item]);
    window.localStorage.setItem("ownedItems", JSON.stringify(item));
  };

  const removeItem = (usedItem) => {
    let filteredArray = itemsList.filter((item) => item !== usedItem);
    setItemsList(filteredArray);
  };

  return (
    <ItemsListContext.Provider
      value={{
        setInitialList,
        itemsList,
        getItem,
        removeItem,
        potion,
        pokeball,
        antidote,
        potionsArray,
        pokeballArray,
        antidoteArray,
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
