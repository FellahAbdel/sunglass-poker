import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useWindowContext } from './WindowContext';

export const useUserData = () => {
  const [stats, setStats] = useState(null); 
  const { user, fetchStats } = useAuth();
  const { windowType } = useWindowContext(); 

  useEffect(() => {
    const loadUserStats = async () => {
      if (windowType === "stats" && user?._id) {
        try {
          const fetchedStats = await fetchStats();
          setStats(fetchedStats); 
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      }
    };

    loadUserStats();
  }, [windowType, user?._id, fetchStats]);

  return { user, stats };
};