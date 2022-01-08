import React, { createContext, useState } from "react";

export const ItemsListContext = createContext();

export function ItemsListModifier(props) {
  const [itemsList, setItemsList] = useState([]);

  const potion = itemsList.find((item) => item.name === "potion");
  const pokeball = itemsList.find((item) => item.name === "poke-ball");
  const antidote = itemsList.find((item) => item.name === "antidote");

  const setInitialList = (itemsList) => {
    setItemsList(itemsList);
  };

  const getItem = (item) => {
    setItemsList((prevArr) => [...prevArr, item]);
    window.localStorage.setItem("ownedItems", JSON.stringify(item));
  };

  const removeItem = (usedItem) => {
    itemsList.splice(
      itemsList.findIndex((item) => item === usedItem),
      1
    );
    setItemsList(itemsList);
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
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
