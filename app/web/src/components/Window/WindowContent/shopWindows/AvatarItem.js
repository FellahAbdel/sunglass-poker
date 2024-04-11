import { useState, useEffect } from "react";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";

export const useItems = () => {
  const [items, setItems] = useState({
    avatars: [],
    sunglasses: [],
    color: [],
  });
  const { fetchItems } = useAuth();

  useEffect(() => {
    const loadItems = async () => {
      const loadedItems = await fetchItems();
      if (loadedItems && Array.isArray(loadedItems)) {
        const sortedItems = {
          avatars: loadedItems.filter((item) => item.category === "baseAvatar"),
          sunglasses: loadedItems.filter(
            (item) => item.category === "sunglasses"
          ),
          color: loadedItems.filter((item) => item.category === "colorAvatar"),
          // Autres filtrages ici
        };
        setItems(sortedItems);
      } else {
        console.error(
          "Les items chargés ne sont pas un tableau ou sont undefined"
        );
      }
    };

    loadItems();
  }, [fetchItems]);

  return items;
};
