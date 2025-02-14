import { useEffect, useState } from "react";
import Favorite from "../components/Favorite";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import { useAuth } from "../contexts/AuthProvider";

export default function Profile() {
  const [page, setPage] = useState("favorites");
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className="profile-container">
      <div className="profile-nav-button-container">
        <button
          type="button"
          className="profile-nav-button"
          onClick={() => setPage("favorites")}
        >
          Favoris
        </button>
        <button
          type="button"
          className="profile-nav-button"
          onClick={() => setPage("porfile-info")}
        >
          Info profil
        </button>
      </div>
      {page === "favorites" && <Favorite />}
      {page === "porfile-info" && <ProfileInfo />}
    </div>
  );
}
