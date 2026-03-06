import { useState } from "react";
import axios from "axios";
import "./Contactos.css";

function Contactos(){

  const [enviado, setEnviado] = useState(false);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      setEnviado(true);
      setTimeout(() => {
        setEnviado(false);
        e.target.reset();
      }, 3000);
    } catch (error) {
      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="contacto-container">

      <h1 className="contacto-titulo">
        ¿Dudas o sugerencias?
      </h1>

      <p className="contacto-sub">
        Escríbenos y nuestro equipo te responderá ⚽
      </p>

      <form className="contacto-form" onSubmit={enviarFormulario}>

        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
        />

        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje..."
          rows="5"
          required
        ></textarea>

        <button type="submit">
          Enviar mensaje
        </button>

      </form>

      {enviado && (
        <div className="mensaje-ok">
          ✅ Mensaje enviado correctamente
        </div>
      )}

    </div>
  );
}

export default Contactos;
