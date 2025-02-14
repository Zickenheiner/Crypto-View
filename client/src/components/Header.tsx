import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../styles/Header.css";
import logoImg from "/images/logo.svg";
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../contexts/LoginProvider";

export default function Header() {
  const { auth } = useAuth();
  const { setModalLoginIsOpen } = useLogin();
  return (
    <header>
      <div className="header-container">
        <img src={logoImg} alt="" />
        <h1>CryptoView</h1>
      </div>
      {auth ? (
        <ConnectButton label="Wallet" chainStatus="none" />
      ) : (
        <button
          type="button"
          className="button-login"
          onClick={() => {
            setModalLoginIsOpen(true);
          }}
        >
          Login
        </button>
      )}
    </header>
  );
}
