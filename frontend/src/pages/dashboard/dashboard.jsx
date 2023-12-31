import React, { useState, useEffect } from "react";
import NavbarU from "../navbarU/navbarU";
import style from "./dashboard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "../../assets/logoB.png";
import axios from "axios"; // Importa axios para realizar la solicitud HTTP
import Cookies from 'js-cookie';

import Modal from "@mui/material/Modal";

const url = "http://localhost:3000/";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useState(null)
  const [transacciones, setTransacciones] = useState([])

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionDetails = (transaccion) => {
    setSelectedTransaction(transaccion);
    handleOpen();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const obtenerInformacionUsuario = async () => {
        try {
          const response = await axios.get(`${url}user-info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Actualizar el estado del componente con la información del usuario
          setUser(response.data);
        } catch (error) {
          console.error("Error al obtener la información del usuario", error);
        }
      };
      const obtenerInformacionTrans = async () => {
        try {
          const response = await axios.get(`${url}transacciones`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Actualizar el estado del componente con la información del usuario
          setTransacciones(response.data);
        } catch (error) {
          console.error("Error al obtener la información de las transacciones", error);
        }
      };
      obtenerInformacionTrans();
      obtenerInformacionUsuario();
    } else {
      console.error("Token no encontrado en las cookies");
    }
  }, []); // <-- Dependencia vacía para que se ejecute solo una vez al montar el componente
  const ultimaTransaccion = transacciones.length > 0 ? transacciones[0] : {tipo: "Ninguno", monto:0};
  return (
    <div className={style.container}>
      <NavbarU />
      <div className={style.content}>
        <h1>Hola, {user ? `${user.nombre} ${user.apellido}` : "Usuario"}</h1>
        <div className={style.cardCombined}>
          <div className={style.card}>
            <p>Tu saldo es de: </p>
            <p>{`$ ${user ? `${user.saldo}` : "xxxxx"}`}</p>
          </div>
          <div className={style.card}>
            <p>Ultima transaccion:</p>
            <p>Tipo: {ultimaTransaccion.tipo}</p>
            <p>Monto: ${ultimaTransaccion.monto}</p>
          </div>
        </div>
        <div className={style.contentT}>
          <h1>Ultimos movimientos:</h1>
          <div className={style.cardT}>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha de la Transacción</th>
                  <th>Tipo de Transacción</th>
                  <th>Valor de la Transacción</th>
                </tr>
              </thead>
              <tbody>
              {transacciones.map((transaccion, index) => (
                <tr key={index}>
                  <td>{transaccion.usuarioN}</td>
                  <td>{transaccion.fecha.substring(0, 10)}</td>
                  <td>{transaccion.tipo}</td>
                  <td>
                    <div className={style.details}>
                      <p>${transaccion.monto.toFixed(2)}</p>
                      <button onClick={() => handleTransactionDetails(transaccion)}>
                        <VisibilityIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <img src={logo} alt="Logo" />
          <form action="">
            {selectedTransaction && (
              <>
                <div className={style.combined}>
                  <label>Nombre:</label>
                  <input type="text" value={selectedTransaction.usuarioN} disabled />
                </div>
                <div className={style.combined}>
                  <label>Fecha de transaccion:</label>
                  <input type="text" value={selectedTransaction.fecha.substring(0,10)} disabled />
                </div>
                <div className={style.combined}>
                  <label>Tipo de transaccion</label>
                  <input type="text" value={selectedTransaction.tipo} disabled />
                </div>
                <div className={style.combined}>
                  <label>Valor de al transaccion</label>
                  <input type="text" value={`$${selectedTransaction.monto.toFixed(2)}`} disabled />
                </div>
              </>
            )}
          </form>
          <button onClick={handleClose}>Cerrar detalles</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
