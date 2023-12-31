import React, { useState } from "react";
import logo from "../../assets/logoB.png";
import style from "./navbarU.module.css";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const NavbarU = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Elimina todas las cookies estableciendo una fecha de caducidad pasada
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    // Redirige a la página de inicio
    navigate("/");
  };
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
        <a href="/dashboard">Inicio</a>
        <a href="/withdraw">Retirar</a>
        <a href="/transfer">Transferir</a>
        <a href="/depositar">Depositar</a>
        <button onClick={handleLogout} className={style.btnLogin}>
          Cerrar sesión
        </button>
      </nav>
      <div className={style.navigationM}>
        <button id="menu" onClick={handleMenuClick}>
          <MenuIcon fontSize="large" />
        </button>
        <nav id="nav" className={style.navigationBtns}>
          <div className={style.btns}>
            <a href="/withdraw">Retirar</a>
            <a href="/transfer">Transferir</a>
            <a href="/depositar">Depositar</a>
            <button onClick={handleLogout} className={style.btnLogin}>
              Cerrar sesión
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavbarU;
