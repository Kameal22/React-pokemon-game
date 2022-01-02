import React, { createContext, useState } from "react";

export const ItemsListContext = createContext();

export function ItemsListModifier(props) {
  const [itemsList, setItemsList] = useState([]);

  const potion = itemsList.find((item) => item.name === "potion");
  const pokeball = itemsList.find((item) => item.name === "poke-ball");

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
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
