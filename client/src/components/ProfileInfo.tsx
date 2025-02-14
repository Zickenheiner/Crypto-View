import "../styles/ProfileInfo.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useFavorite } from "../contexts/FavoriteProvider";
import { useLogin } from "../contexts/LoginProvider";
import type { User } from "../types/types";
import DeleteAccountModal from "./DeleteAccountModal";
import InputProfileInfo from "./InputProfileInfo";

export default function ProfileInfo() {
  const { auth, setAuth } = useAuth();
  const { refresh } = useFavorite();
  const { modalDeleteIsOpen, setModalDeleteIsOpen } = useLogin();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      if (!auth) {
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth.user_id}`,
        );
        const data = await response.json();
        setUser(data);
        refresh;
      } catch (error) {
        console.error(error);
      }
    })();
  }, [auth, refresh]);

  return (
    <div className="profile-info-container">
      {modalDeleteIsOpen && <DeleteAccountModal />}
      <div>
        <h2 className="profile-info-label">Nom :</h2>
        <InputProfileInfo value={user?.lastname} column="lastname" />
      </div>
      <div>
        <h2 className="profile-info-label">Prénom :</h2>
        <InputProfileInfo value={user?.firstname} column="firstname" />
      </div>
      <div>
        <h2 className="profile-info-label">Email :</h2>
        <InputProfileInfo value={user?.email} column="email" />
      </div>
      <div>
        <h2 className="profile-info-label">Date de naissance :</h2>
        <InputProfileInfo value={user?.birthday} column="birthday" />
      </div>
      <div>
        <h2 className="profile-info-label">Sexe :</h2>
        <InputProfileInfo value={user?.sex} column="sex" />
      </div>
      <button
        type="button"
        className="button-logout"
        onClick={() => setAuth(null)}
      >
        Se deconnecter
      </button>
      <button
        type="button"
        className="button-delete-account"
        onClick={() => setModalDeleteIsOpen(true)}
      >
        Supprimer le compte
      </button>
    </div>
  );
}
