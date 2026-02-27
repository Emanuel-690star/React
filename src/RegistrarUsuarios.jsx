import "./RegistrarUsuarios.css";
import { useState } from "react";

function RegistrarUsuarios() {

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    correo: "",
    username: ""
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(usuario);
  };

  return (
    <div className="registro-usuarios">
      <h2>Registrar Usuario</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={usuario.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={usuario.apellidos}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={usuario.direccion}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={usuario.telefono}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={usuario.correo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={usuario.username}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Usuario</button>

      </form>
    </div>
  );
}

export default RegistrarUsuarios;