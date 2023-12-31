import React, { Component } from "react";
import logo from "../../assets/logoB.png";
import style from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className={style.logo}>
        <img src={logo} alt="Logo" />
        <h2>CapitalPlus</h2>
      </div>
      <nav className={style.navigation}>
        <a href="/abaoutus">Acerca de</a>
        <button onClick={() => navigate("/login")} className={style.btnLogin}>
          Iniciar sesion
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
