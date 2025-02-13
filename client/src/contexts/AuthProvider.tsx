import { createContext, useContext, useState } from "react";

interface Auth {
  token: string;
  user_id: number;
}

interface AuthContextType {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
