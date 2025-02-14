import { createContext, useContext, useState } from "react";

interface LoginContextType {
  modalLoginIsOpen: boolean;
  setModalLoginIsOpen: (value: boolean) => void;
  modalRegisterIsOpen: boolean;
  setModalRegisterIsOpen: (value: boolean) => void;
  modalDeleteIsOpen: boolean;
  setModalDeleteIsOpen: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextType | null>(null);

export default function LoginProvider({
  children,
}: { children: React.ReactNode }) {
  const [modalLoginIsOpen, setModalLoginIsOpen] = useState(false);
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(true);

  return (
    <LoginContext.Provider
      value={{
        modalLoginIsOpen,
        setModalLoginIsOpen,
        modalRegisterIsOpen,
        setModalRegisterIsOpen,
        modalDeleteIsOpen,
        setModalDeleteIsOpen,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  const context = useContext(LoginContext);

  if (context === null) {
    throw new Error("useLogin must be used within a LoginProvider");
  }

  return context;
};
