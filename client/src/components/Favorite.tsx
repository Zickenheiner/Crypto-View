import "../styles/Favorite.css";
import { useFavorite } from "../contexts/FavoriteProvider";
import { useToken } from "../contexts/TokenProvider";
import type { FavoriteType } from "../types/types";
import TokenCard from "./TokenCard";

export default function Favorite() {
  const { tokens } = useToken();
  const { favorites } = useFavorite();

  return (
    <div className="favorite-token-container">
      {favorites.map((favorite: FavoriteType) => {
        const token = tokens.find((token) => token.id === favorite.token_id);
        return token ? <TokenCard key={token.id} token={token} /> : null;
      })}
    </div>
  );
}
