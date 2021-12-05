import React, { createContext, useState } from "react";

export const ItemsListContext = createContext();

export function ItemsListModifier(props) {
  const [itemsList, setItemsList] = useState([]);
  const [discoverItem, setDiscoveredItem] = useState([]);

  const setInitialItemsList = (itemsList) => {
    setItemsList(itemsList);
  };

  return (
    <ItemsListContext.Provider
      value={{
        setInitialItemsList,
        itemsList,
        discoverItem,
        setDiscoveredItem,
      }}
    >
      {props.children}
    </ItemsListContext.Provider>
  );
}
