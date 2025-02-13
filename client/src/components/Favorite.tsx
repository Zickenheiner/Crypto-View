import "../styles/Favorite.css";
import { useFavorite } from "../contexts/FavoriteProvider";
import { useToken } from "../contexts/TokenProvider";
import type { FavoriteType } from "../types/types";
import TokenCard from "./TokenCard";

export default function Favorite() {
  const { tokens } = useToken();
  const { favorites } = useFavorite();

  return (
    <div style={{ width: "100%" }}>
      {favorites.length === 0 && (
        <p style={{ width: "100%", textAlign: "center" }}>
          Vous n'avez pas encore de favories
        </p>
      )}
      <div className="favorite-token-container">
        {favorites.map((favorite: FavoriteType) => {
          const token = tokens.find((token) => token.id === favorite.token_id);
          return token ? <TokenCard key={token.id} token={token} /> : null;
        })}
      </div>
    </div>
  );
}
