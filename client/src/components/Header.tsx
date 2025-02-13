import "../styles/Header.css";
import logoImg from "/images/logo.svg";

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="" />
      <h1>CryptoView</h1>
    </header>
  );
}
