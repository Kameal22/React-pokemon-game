import React, { createContext, useState } from "react";

export const OwnedItemsContext = createContext();

export function OwnItem(props) {
  const [ownedItem, setOwnedItem] = useState([]);

  const getItem = (item) => {
    setOwnedItem((prevArr) => [...prevArr, item]);
    window.localStorage.setItem("ownedItems", JSON.stringify(item));
  };

  return (
    <OwnedItemsContext.Provider value={{ ownedItem, getItem }}>
      {props.children}
    </OwnedItemsContext.Provider>
  );
}
