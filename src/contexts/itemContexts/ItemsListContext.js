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

  const useItem = (item) => {
    const itemsArr = [...itemsList];
    const index = itemsArr.indexOf(item);
    if (index !== -1) {
      itemsArr.splice(index, 1);
      setItemsList(itemsArr);
    }
  };

  return (
    <ItemsListContext.Provider
      value={{
        setInitialList,
        itemsList,
        getItem,
        useItem,
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
