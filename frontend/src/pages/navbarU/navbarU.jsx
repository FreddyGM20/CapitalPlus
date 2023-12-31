import React, { Component } from "react";
import logo from "../../assets/logoB.png";
import style from "./navbarU.module.css";
import { useNavigate } from "react-router-dom";

const NavbarU = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Elimina todas las cookies estableciendo una fecha de caducidad pasada
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirige a la página de inicio
    navigate("/");
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
    </header>
  );
};

export default NavbarU;
