import React, { useState } from "react";
import logo from "../../assets/logoB.png";
import style from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    if (open === false) {
      const menu = document.getElementById("nav");
      menu.style.display = "flex";
      setOpen(true);
    }
    if (open === true) {
      const menu = document.getElementById("nav");
      menu.style.display = "none";
      setOpen(false);
    }
  };
  return (
    <header>
      <div className={style.logo}>
        <img src={logo} alt="Logo" />
        <h2>CapitalPlus</h2>
      </div>
      <nav className={style.navigation}>
        <button onClick={() => navigate("/login")} className={style.btnLogin}>
          Iniciar sesion
        </button>
      </nav>
      <div className={style.navigationM}>
        <button id="menu" onClick={handleMenuClick}>
          <MenuIcon fontSize="large" />
        </button>
        <nav id="nav" className={style.navigationBtns}>
          <div className={style.btns}>
            <button
              onClick={() => navigate("/login")}
              className={style.btnLogin}
            >
              Iniciar sesion
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
