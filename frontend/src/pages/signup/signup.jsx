import React, { useState, useEffect } from "react";
import style from "./signup.module.css";
import logo from "../../assets/logoB.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP

const url = "http://localhost:3000/";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState("");

  const ObtenerRegistro = async () => {
    try {
      const response = await axios.post(`${url}signup`, {
        nombre: document.getElementById("name").value,
        apellido: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("cPassword").value,
      });
      setSignup(response.data);

      // Redirigir solo si el registro es exitoso
      if (response.data.status === "success") {
        // Espera 3 segundos antes de redirigir
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error("Error al crear el usuario", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.card}>
        <button onClick={() => navigate("/")} className={style.backButton}>
          <ArrowBackIcon />
        </button>
        <h1>CapitalPlus</h1>
        <img src={logo} alt="Logo" />
        {signup.status && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {signup.status === "success" && (
              <Alert severity="success">{signup.mensaje}</Alert>
            )}
            {signup.status === "error" && (
              <Alert severity="error">{signup.error}</Alert>
            )}
          </Stack>
        )}
        <form>
          <div className={style.combined}>
            <label>Nombre:</label>
            <input id="name" type="text" required />
            <label>Apellido:</label>
            <input id="lastname" type="text" required />
          </div>

          <div className={style.combined}>
            <label>Correo electrónico:</label>
            <input id="email" type="text" required />
          </div>

          <div className={style.combined}>
            <label>Contraseña:</label>
            <input id="password" type="password" required />
          </div>
          <div className={style.combined}>
            <label>Repetir contraseña:</label>
            <input id="cPassword" type="password" required />
          </div>
          <button type="button" onClick={ObtenerRegistro}>
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
