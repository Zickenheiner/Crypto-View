import { useAuth } from "../contexts/AuthProvider";
import { useFavorite } from "../contexts/FavoriteProvider";
import "../styles/TokenCard.css";
import { Heart } from "lucide-react";
import type { TokenType } from "../types/types";

interface TokenCardProps {
  token: TokenType;
}

export default function TokenCard({ token }: TokenCardProps) {
  const { favorites, refresh, setRefresh } = useFavorite();
  const { auth } = useAuth();
  const isFavorite = () => {
    return favorites.some((favorite) => favorite.token_id === token.id);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite()) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: auth?.user_id,
              tokenId: token.id,
            }),
          },
        );
        if (!response.ok) {
          throw new Error("Error deleting favorite");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: auth?.user_id,
              tokenId: token.id,
            }),
          },
        );
        if (!response.ok) {
          throw new Error("Error adding favorite");
        }
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="token-card-container">
      <img src={token.image} alt="" className="token-card-token-img" />
      <div className="token-card-info-container">
        <p className="token-card-info-name">{token.name}</p>
        <p className="token-card-info-price">{token.price.toFixed(2)}$</p>
      </div>
      <p
        className={`token-card-info-percente ${token.percent_price < 0 ? "negatif" : "positif"}`}
      >
        {token.percent_price < 0 ? "" : "+"}
        {token.percent_price.toFixed(2)}%
      </p>
      {auth && (
        <Heart
          className="token-card-favorite-img"
          stroke={isFavorite() ? "#ffd332" : "#545454"}
          fill={isFavorite() ? "#ffdc5f" : "none"}
          onClick={toggleFavorite}
        />
      )}
    </div>
  );
}
