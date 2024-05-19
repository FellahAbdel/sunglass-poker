import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useWindowContext } from "./WindowContext";

export const useUserData = () => {
  const [stats, setStats] = useState(null);
  const { user, fetchStats } = useAuth();
  const { windowType } = useWindowContext();

  const resolveImagePath = (relativePath) => {
    return `${process.env.PUBLIC_URL}${relativePath}`;
  };

  const loadUserStats = async () => {
    if (windowType === "stats" && user?._id) {
      try {
        const fetchedStats = await fetchStats();
        setStats(fetchedStats);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }
  };

  useEffect(() => {
    loadUserStats();
  }, [windowType, user?._id, fetchStats]);

  useEffect(() => {
    const loadUserStats = async () => {
      if (windowType === "stats" && user?._id) {
        try {
          const fetchedStats = await fetchStats();
          setStats(fetchedStats);
        } catch (error) {
          console.error("Error fetching user stats:", error);
        }
      }
    };

    loadUserStats();
  }, [windowType, user, fetchStats]);

  const resolvedUser = {
    ...user,
    avatar: user?.avatar
      ? resolveImagePath(user.avatar)
      : "default_avatar_path",
  };

  return { user: resolvedUser, stats, loadUserStats };
};
