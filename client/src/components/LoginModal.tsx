import { type FormEventHandler, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../contexts/LoginProvider";
import "../styles/LoginModal.css";
import { useNavigate } from "react-router-dom";
import closeImg from "/images/close.svg";

export default function LoginModal() {
  const { setModalLoginIsOpen, setModalRegisterIsOpen } = useLogin();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegister = () => {
    setModalLoginIsOpen(false);
    setModalRegisterIsOpen(true);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value,
            password: (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      if (response.ok) {
        const user = await response.json();

        setAuth(user);
        setModalLoginIsOpen(false);
        navigate("/profile");
      } else {
        setMessage("Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-modal-background">
      <div className="login-modal-container">
        <img
          src={closeImg}
          alt="close"
          id="close-img"
          onClick={() => {
            setModalLoginIsOpen(false);
          }}
          onKeyDown={() => {
            setModalLoginIsOpen(false);
          }}
        />
        <h2 className="login-modal-title">Se connecter</h2>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="login-input-container">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="login-input"
              required
            />
          </div>
          <div className="login-input-container">
            <label htmlFor="password" className="login-label">
              Mot de passe
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="login-input"
              required
            />
          </div>
          {message && <p className="login-error">{message}</p>}
          <button type="submit" className="login-submit">
            Connexion
          </button>
        </form>
        <p className="login-modal-signup-text">
          Vous n’avez pas compte ?{" "}
          <button
            type="button"
            className="login-modal-signup"
            onClick={handleRegister}
          >
            Inscrivez vous
          </button>{" "}
        </p>
      </div>
    </div>
  );
}
