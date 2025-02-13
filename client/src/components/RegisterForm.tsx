import { useRef, useState } from "react";
import type { UserRegister } from "../types/types";

interface RegisterFormProps {
  setStep: (step: number) => void;
  setUserInfo: (user: UserRegister) => void;
}

export default function RegisterForm({
  setStep,
  setUserInfo,
}: RegisterFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);

  const verifyEmail = async (email: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify-email?email=${email}`,
      );

      if (response.ok) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleNext = async () => {
    if (emailRef.current && passwordRef.current && passwordConfirmRef.current) {
      if (await verifyEmail(emailRef.current.value)) {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          setMessage("Les mots de passe ne correspondent pas");
        } else {
          setUserInfo({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            lastname: null,
            firstname: null,
            birthday: null,
            sex: null,
          });
          setStep(2);
        }
      } else {
        setMessage("Cet email est déjà utilisé");
      }
    }
  };

  return (
    <>
      <div className="register-input-container">
        <label htmlFor="email" className="register-label">
          Email
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          className="register-input"
          required
        />
      </div>
      <div className="register-input-container">
        <label htmlFor="password" className="register-label">
          Mot de passe
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          className="register-input"
          required
        />
      </div>
      <div className="register-input-container">
        <label htmlFor="password" className="register-label">
          Confirmer le mot de passe
        </label>
        <input
          ref={passwordConfirmRef}
          type="password"
          id="password"
          className="register-input"
          required
        />
      </div>
      {message && <p className="register-error">{message}</p>}
      <button type="button" className="register-next" onClick={handleNext}>
        Suivant
      </button>
    </>
  );
}
