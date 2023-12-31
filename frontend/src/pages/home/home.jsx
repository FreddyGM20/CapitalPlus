import React from "react";
import Navbar from "../navbar/navbar";
import style from "./home.module.css";
import imgB from "../../assets/bienvenido_al_equipo.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.content}>
        <section>
          <div className={style.contentIzq}>
            <img src={imgB} alt="Bienvenido" />
          </div>
          <div className={style.contentDer}>
            <h1>¡Bienvenido a CapitalPlus!</h1>
            <p>
              Únete a la familia de CapitalPlus y experimenta un mundo de
              posibilidades financieras. ¿Listo para tomar el control de tu
              futuro financiero? Regístrate ahora para acceder a nuestros
              servicios personalizados, asesoramiento experto y herramientas
              innovadoras. Descubre cómo podemos ayudarte a alcanzar tus metas y
              a hacer crecer tu patrimonio. ¡Tu éxito financiero comienza aquí
              en CapitalPlus!
            </p>
            <button onClick={() => navigate("/signup")} className={style.btns}>¡Registrate ya!</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
