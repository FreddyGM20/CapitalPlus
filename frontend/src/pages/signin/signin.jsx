import React, { useState, useEffect } from "react";
import style from "./signin.module.css";
import logo from "../../assets/logoB.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP

const url = "http://localhost:3000/";

const Signin = () => {
  const navigate = useNavigate();
  const [signin, setSignin] = useState("");
  const ObtenerSesion = async () => {
    try {
      const response = await axios.post(
        `${url}login`,
        {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        },
        {
          withCredentials: true, // Importante para enviar las cookies
        }
      );
      setSignin(response.data);

      // Redirigir solo si el registro es exitoso
      if (response.data.status === "success") {
        // Espera 3 segundos antes de redirigir
        // Guardar en localStorage
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al iniciar sesion del usuario", error);
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
        {signin.status && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {signin.status === "success" && (
              <Alert severity="success">{signin.mensaje}</Alert>
            )}
            {signin.status === "error" && (
              <Alert severity="error">{signin.error}</Alert>
            )}
          </Stack>
        )}
        <form>
          <label>Correo electronico:</label>
          <input id="email" type="text" required />
          <label>Contraseña:</label>
          <input id="password" type="password" required />
        </form>
        <button onClick={ObtenerSesion}>Iniciar sesion</button>
      </div>
    </div>
  );
};

export default Signin;
