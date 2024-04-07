import React, { useEffect, useState, useContext } from 'react';
import  { useAuth }  from '../../../Utiles/AuthProvider.jsx';

export const useAvatars = () => {
  const [avatars, setAvatars] = useState([]);
  const { fetchAvatars } = useAuth();

  useEffect(() => {
    const loadAvatars = async () => {
      const loadedAvatars = await fetchAvatars();
      setAvatars(loadedAvatars);
    };

    loadAvatars();
  }, [fetchAvatars]);

  return avatars;
};