import React, { createContext, useState } from "react";

export const ItemsListContext = createContext();

export function ItemsListModifier(props) {
  const [itemsList, setItemsList] = useState([]);

  const setInitialList = (itemsList) => {
    setItemsList(itemsList);
  };

  const getItem = (item) => {
    setItemsList((prevArr) => [...prevArr, item]);
    window.localStorage.setItem("ownedItems", JSON.stringify(item));
  };

  return (
    <ItemsListContext.Provider
      value={{
        setInitialList,
        itemsList,
        getItem,
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
