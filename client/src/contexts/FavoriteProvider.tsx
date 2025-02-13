import { createContext, useContext, useEffect, useState } from "react";
import type { FavoriteType } from "../types/types";
import { useAuth } from "./AuthProvider";

interface FavoriteContextType {
  favorites: FavoriteType[];
  setFavorites: (favorite: FavoriteType[]) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export default function FavoriteProvider({
  children,
}: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      if (auth === null) {
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites/${auth.user_id}`,
      );
      const data = await response.json();
      setFavorites(data);
      refresh;
    })();
  }, [auth, refresh]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, setFavorites, refresh, setRefresh }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (context === null) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};
