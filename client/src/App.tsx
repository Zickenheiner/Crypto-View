import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Navbar />
    </>
  );
}

export default App;
