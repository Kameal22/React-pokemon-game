import axios from "axios";
import React, { useEffect, useContext } from "react";
import { ItemsListContext } from "../contexts/itemContexts/ItemsListContext";

const API_URL_ITEMS = "https://pokeapi.co/api/v2/item/?limit=35&offset=0";

function FetchItem() {
  const { setInitialList, setInitialGameItemsList } =
    useContext(ItemsListContext);

  const sentListToContext = (item) => {
    return setInitialList(item);
  };

  const setStartersListToContext = (item) => {
    return setInitialGameItemsList(item);
  };

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = [];

      const response = await axios.get(API_URL_ITEMS);
      const fetchedUrl = response.data.results.map((item) => item.url);

      axios.all(fetchedUrl.map((url) => axios.get(url))).then(
        axios.spread(function (...res) {
          res.forEach((item) => {
            const itemObject = {
              name: item.data.name,
              img: item.data.sprites.default,
              usage: item.data.effect_entries[0].effect,
            };
            fetchedItems.push(itemObject);
          });
          const actualItems = [
            fetchedItems[3],
            fetchedItems[16],
            fetchedItems[17],
          ];
          sentListToContext(actualItems);
          setStartersListToContext(actualItems);
        })
      );
    }
    fetchItems();
  }, []);

  return <div></div>;
}
export default FetchItem;
