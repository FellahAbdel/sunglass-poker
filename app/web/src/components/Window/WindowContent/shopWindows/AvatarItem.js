import { useState, useEffect } from "react";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

export const useItems = () => {
  const [items, setItems] = useState({
    baseAvatar: { owned: [], unowned: [] },
    sunglasses: { owned: [], unowned: [] },
    colorAvatar: { owned: [], unowned: [] },
  });
  const { fetchItems } = useAuth();
  const { user } = useUserData();

  useEffect(() => {
    const loadItems = async () => {
      const loadedItems = await fetchItems();
      if (loadedItems && Array.isArray(loadedItems)) {
        const ownedIds = new Set(
          user?.itemsOwned?.map((item) => item.toString())
        );

        const sortedItems = {
          baseAvatar: { owned: [], unowned: [] },
          sunglasses: { owned: [], unowned: [] },
          colorAvatar: { owned: [], unowned: [] },
        };

        loadedItems.forEach((item) => {
          const isOwned = ownedIds.has(item._id);
          const newItem = { ...item, owned: isOwned };
          const categoryGroup = sortedItems[item.category];
          if (categoryGroup) {
            if (isOwned) {
              categoryGroup.owned.push(newItem);
            } else {
              categoryGroup.unowned.push(newItem);
            }
          }
        });

        // Trier chaque liste par prix
        Object.values(sortedItems).forEach((category) => {
          category.owned.sort((a, b) => a.price - b.price);
          category.unowned.sort((a, b) => a.price - b.price);
        });

        setItems(sortedItems);
      }
    };

    loadItems();
  }, [fetchItems, user?.itemsOwned]);

  return items;
};
