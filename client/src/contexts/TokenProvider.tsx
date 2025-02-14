import { createContext, useContext, useEffect, useState } from "react";
import type { TokenType } from "../types/types";

interface TokenContextType {
  tokens: TokenType[];
  setTokens: (tokens: TokenType[]) => void;
  txModalIsOpen: boolean;
  setTxModalIsOpen: (value: boolean) => void;
  currentToken: TokenType | null;
  setCurrentToken: (value: TokenType | null) => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export default function TokenProvider({
  children,
}: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [txModalIsOpen, setTxModalIsOpen] = useState<boolean>(false);
  const [currentToken, setCurrentToken] = useState<TokenType | null>(null);

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
    <TokenContext.Provider
      value={{
        tokens,
        setTokens,
        txModalIsOpen,
        setTxModalIsOpen,
        currentToken,
        setCurrentToken,
      }}
    >
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
