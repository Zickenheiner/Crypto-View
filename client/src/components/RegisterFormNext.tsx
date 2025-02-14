import { useRef } from "react";
import { useLogin } from "../contexts/LoginProvider";
import { toastError, toastSuccess } from "../services/toast";
import type { UserRegister } from "../types/types";

interface RegisterFormNextProps {
  userInfo: UserRegister;
}

export default function RegisterFormNext({ userInfo }: RegisterFormNextProps) {
  const { setModalLoginIsOpen, setModalRegisterIsOpen } = useLogin();
  const lastnameRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const birthdayRef = useRef<HTMLInputElement>(null);
  const sexRef = useRef<HTMLInputElement>(null);

  const handleNext = async () => {
    if (
      lastnameRef.current &&
      firstnameRef.current &&
      birthdayRef.current &&
      sexRef.current
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userInfo,
              lastname: lastnameRef.current.value,
              firstname: firstnameRef.current.value,
              birthday: birthdayRef.current.value,
              sex: sexRef.current.value,
            }),
          },
        );

        if (response.ok) {
          setModalRegisterIsOpen(false);
          setModalLoginIsOpen(true);
          toastSuccess("Votre compte a bien etait créer");
        } else {
          toastError("Erreur lors de la création de votre compte");
          console.error("User not created");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="register-input-container">
        <label htmlFor="lastname" className="register-label">
          Nom
        </label>
        <input
          ref={lastnameRef}
          type="lastname"
          id="lastname"
          className="register-input"
        />
      </div>
      <div className="register-input-container">
        <label htmlFor="firstname" className="register-label">
          Prénom
        </label>
        <input
          ref={firstnameRef}
          type="firstname"
          id="firstname"
          className="register-input"
        />
      </div>
      <div className="register-input-container">
        <label htmlFor="birthday" className="register-label">
          Date de naissance
        </label>
        <input
          ref={birthdayRef}
          type="birthday"
          id="birthday"
          className="register-input"
        />
      </div>
      <div className="register-input-container">
        <label htmlFor="sex" className="register-label">
          Sexe
        </label>
        <input ref={sexRef} type="sex" id="sex" className="register-input" />
      </div>
      <button type="button" className="register-next" onClick={handleNext}>
        Créer mon compte
      </button>
    </>
  );
}
