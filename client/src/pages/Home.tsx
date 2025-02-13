import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import TokenCard from "../components/TokenCard";
import { useLogin } from "../contexts/LoginProvider";
import "../styles/Home.css";
import { useToken } from "../contexts/TokenProvider";
import type { TokenType } from "../types/types";

export default function Home() {
  const { modalLoginIsOpen, modalRegisterIsOpen } = useLogin();
  const { tokens, setTokens } = useToken();
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (modalLoginIsOpen || modalRegisterIsOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalLoginIsOpen, modalRegisterIsOpen]);

  useEffect(() => {
    (async () => {
      if (searchValue !== "") {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/tokens/name/${searchValue}`,
          );
          const data = await response.json();
          setTokens(data);
        } catch (error) {
          console.error(error);
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tokens`,
        );
        const data = await response.json();
        setTokens(data);
      }
    })();
  }, [setTokens, searchValue]);

  return (
    <div className={`home-container ${modalLoginIsOpen ? "modal-open" : ""}`}>
      {modalLoginIsOpen && <LoginModal />}
      {modalRegisterIsOpen && <RegisterModal />}
      <input
        type="text"
        placeholder="Rechercher"
        className="home-search-bar"
        onChange={handleChangeSearch}
      />
      <div className="home-tokens-container">
        {tokens.map((token: TokenType) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
}
