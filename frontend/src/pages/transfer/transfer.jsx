import React, { useState } from "react";
import logo from "../../assets/logoB.png";
import style from "./transfer.module.css";
import NavbarU from "../navbarU/navbarU";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP
import { useNavigate } from "react-router-dom";

const url = "http://localhost:3000/";


const Transfer= () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState("");
  const token = localStorage.getItem("token");

  const ObtenerTransferencia= async () => {
    try {
      const response = await axios.post(
        `${url}transacciones/transferencia`,
        {
          monto: parseInt(document.getElementById("saldo").value),
          usuarioDestino: document.getElementById("cuenta").value
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
      console.error("Error al hacer el retiro", error);
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
            <label>Numero de cuenta:</label>
            <input id="cuenta" type="text" required />
          </div> 

          <div className={style.combined}>
            <label>Valor de la transaccion:</label>
            <input id="saldo" type="text" required />
          </div>
        </form>

        <button onClick={ObtenerTransferencia} type="submit">Transferir</button>
      </div>
    </div>
  );
};

export default Transfer;
