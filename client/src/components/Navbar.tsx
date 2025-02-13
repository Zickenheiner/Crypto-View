import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import homeImg from "/images/home.svg";
import profileImg from "/images/profile.svg";
import { useAuth } from "../contexts/AuthProvider";
import { useLogin } from "../contexts/LoginProvider";

export default function Navbar() {
  const { setModalLoginIsOpen } = useLogin();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleHome = () => {
    navigate("/");
  };

  const handleProfile = () => {
    if (!auth) {
      setModalLoginIsOpen(true);
    } else {
      navigate("/profile");
    }
  };

  return (
    <nav>
      <img
        className="navbar-img"
        src={homeImg}
        alt="home"
        onClick={handleHome}
        onKeyDown={handleHome}
      />
      <img
        className="navbar-img"
        src={profileImg}
        alt="profile"
        onClick={handleProfile}
        onKeyDown={handleProfile}
      />
    </nav>
  );
}
