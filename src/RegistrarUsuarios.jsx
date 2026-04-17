import { useEffect, useState } from "react";

function RegistrarUsuarios({ usuarioEditado, usuarioNuevo }) {

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (usuarioEditado) {
      setNombre(usuarioEditado.nombre || '');
      setDireccion(usuarioEditado.direccion || '');
      setTelefono(usuarioEditado.telefono || '');
      setEmail(usuarioEditado.email || '');
      setPassword(usuarioEditado.password || '');
    }
  }, [usuarioEditado]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre,
      direccion,
      telefono,
      email,
      password,
    };

    usuarioNuevo(nuevoUsuario);

    setNombre('');
    setDireccion('');
    setTelefono('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="containerForm">
      <h2>{usuarioEditado ? "Editar Usuario" : "Registrar Usuario"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {usuarioEditado ? "Actualizar" : "Registrar"}
        </button>

      </form>
    </div>
  );
}

export default RegistrarUsuarios;