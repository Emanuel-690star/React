import { useEffect, useState } from "react";

function RegistrarUsuarios({ usuarioEditado, usuarioNuevo }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (usuarioEditado) {
      setUsername(usuarioEditado.username);
      setEmail(usuarioEditado.email);
      setPassword(usuarioEditado.password);
    }
  }, [usuarioEditado]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      username,
      email,
      password,
      name: { firstname: username, lastname: '' },
    };

    usuarioNuevo(nuevoUsuario); // 🔥 aquí usamos la PROP

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="containerForm">
      <h2>{usuarioEditado ? "Editar Usuario" : "Registrar Usuario"}</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
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