import { useNavigate } from "react-router-dom";
import "../styles/DeleteAccountModal.css";
import { useAuth } from "../contexts/AuthProvider";
import { toastSuccess } from "../services/toast";
import { useLogin } from "../contexts/LoginProvider";

export default function DeleteAccountModal() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { setModalDeleteIsOpen } = useLogin();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setModalDeleteIsOpen(false);
        setAuth(null);
        navigate("/");
        toastSuccess("Votre compte a bien été supprimé");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-modal-background">
      <div className="delete-modal-container">
        <h2>Voulez vous vraiment supprimer le compte ?</h2>
        <div className="delete-modal-button-container">
          <button
            type="button"
            className="delete-modal-button"
            onClick={() => setModalDeleteIsOpen(false)}
          >
            Annuler
          </button>
          <button
            type="button"
            className="delete-modal-button delete"
            onClick={handleDeleteAccount}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
