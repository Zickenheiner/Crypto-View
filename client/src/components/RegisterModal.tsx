import { useState } from "react";
import { useLogin } from "../contexts/LoginProvider";
import "../styles/RegisterModal.css";
import closeImg from "/images/close.svg";
import type { UserRegister } from "../types/types";
import RegisterForm from "./RegisterForm";
import RegisterFormNext from "./RegisterFormNext";

export default function RegisterModal() {
  const { setModalRegisterIsOpen, setModalLoginIsOpen } = useLogin();
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserRegister>({
    email: null,
    password: null,
    lastname: null,
    firstname: null,
    birthday: null,
    sex: null,
  });

  const hancleLogin = () => {
    setModalRegisterIsOpen(false);
    setModalLoginIsOpen(true);
  };
  return (
    <div className="register-modal-background">
      <div className="register-modal-container">
        <img
          src={closeImg}
          alt="close"
          id="close-img"
          onClick={() => {
            setModalRegisterIsOpen(false);
          }}
          onKeyDown={() => {
            setModalRegisterIsOpen(false);
          }}
        />
        <h2 className="register-modal-title">Créer son compte</h2>
        <div id="register-form">
          {step === 1 ? (
            <RegisterForm setStep={setStep} setUserInfo={setUserInfo} />
          ) : (
            <RegisterFormNext userInfo={userInfo} />
          )}
        </div>
        <p className="register-modal-signup-text">
          Vous avez déja un compte ?{" "}
          <button
            type="button"
            className="register-modal-signup"
            onClick={hancleLogin}
          >
            Connectez vous
          </button>{" "}
        </p>
      </div>
    </div>
  );
}
