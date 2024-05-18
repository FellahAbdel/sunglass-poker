import { useState, useEffect } from "react";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import { useUserData } from "../../../Utiles/useUserData";

/**
 * useItems is a custom hook that fetches and organizes items into categories based on ownership.
 * It structures items into 'owned' and 'unowned' for different item categories.
 * 
 * @returns {Object} items - Contains structured data for base avatars, sunglasses, and color avatars.
 */
export const useItems = () => {
  const [items, setItems] = useState({
    baseAvatar: { owned: [], unowned: [] },
    sunglasses: { owned: [], unowned: [] },
    colorAvatar: { owned: [], unowned: [] },
  });
  const { fetchItems } = useAuth();
  const { user } = useUserData();

  useEffect(() => {
    /**
     * Loads items from the backend and organizes them into categories based on user ownership.
     */
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
        // Distribute items into owned and unowned categories
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

        // Distribute items into owned and unowned categories
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
