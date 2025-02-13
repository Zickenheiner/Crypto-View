import { Check } from "lucide-react";
import { useState } from "react";
import editImg from "/images/edit.svg";
import { useAuth } from "../contexts/AuthProvider";
import { useFavorite } from "../contexts/FavoriteProvider";

interface InputProfileInfoProps {
  column: string;
  value: string | undefined;
}

export default function InputProfileInfo({
  column,
  value,
}: InputProfileInfoProps) {
  const { auth } = useAuth();
  const { refresh, setRefresh } = useFavorite();
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState<string | undefined>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const handleEdit = () => {
    setNewValue(value);
    setIsEditing(true);
  };

  const handleValidate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: column, value: newValue }),
        },
      );
      if (response.ok) {
        setRefresh(!refresh);
        setIsEditing(false);
      } else {
        throw Error("Error while updating user info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="profile-info-value-container">
          <input
            type="text"
            className="profile-info-value"
            value={newValue}
            onChange={handleChange}
          />
          <Check className="validate-img" onClick={handleValidate} />
        </div>
      ) : (
        <div className="profile-info-value">
          <p>{value}</p>
          <img
            src={editImg}
            className="profil-info-edit-img"
            alt="edit"
            onClick={handleEdit}
            onKeyDown={handleEdit}
          />
        </div>
      )}
    </>
  );
}
