import React, { useState } from "react";
import logo from "../../assets/logoB.png";
import style from "./depositar.module.css";
import NavbarU from "../navbarU/navbarU";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/";

const Depositar = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState("");
  const token = localStorage.getItem("token");

  const ObtenerDeposito = async () => {
    try {
      const response = await axios.post(
        `${url}transacciones/deposito`,
        {
          monto: parseInt(document.getElementById("saldo").value),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar el estado del componente con la información del usuario
      setResponses(response.data);
      // Redirigir solo si el registro es exitoso
      if (response.data.status === "success") {
        // Espera 3 segundos antes de redirigir
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };

  return (
    <div className={style.container}>
      <NavbarU />
      <div className={style.card}>
        <h1>CapitalPlus</h1>
        <img src={logo} alt="Logo" />
        {responses.status && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {responses.status === "success" && (
              <Alert severity="success">{responses.mensaje}</Alert>
            )}
            {responses.status === "error" && (
              <Alert severity="error">{responses.error}</Alert>
            )}
          </Stack>
        )}
        <form action="">
          <div className={style.combined}>
            <label>Valor a depositar:</label>
            <input id="saldo" type="text" required />
          </div>
        </form>
        <button onClick={ObtenerDeposito} type="submit">Depositar</button>
      </div>
    </div>
  );
};

export default Depositar;
