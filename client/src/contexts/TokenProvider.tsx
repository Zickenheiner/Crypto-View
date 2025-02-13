import { createContext, useContext, useEffect, useState } from "react";
import type { TokenType } from "../types/types";

interface TokenContextType {
  tokens: TokenType[];
  setTokens: (tokens: TokenType[]) => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export default function TokenProvider({
  children,
}: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<TokenType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tokens`,
      );
      const data = await response.json();
      setTokens(data);
    })();
  }, []);

  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
