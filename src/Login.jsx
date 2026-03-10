import "./Login.css";
import logo from "./assets/logo.png";
import { useState } from "react";
import api from "./services/Api";

function Login({ onLogin, cambiarSeccion }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only allow the specific user requested by the project owner
    if (usuario === "Ema" && contrasena === "123654") {
      const token = `ema-token-${Date.now()}`;
      const userObj = { username: "Ema" };

      // persist session
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(userObj));

      setToast("Login exitoso");
      if (onLogin) onLogin(token, userObj);

      setUsuario("");
      setContrasena("");
      setTimeout(() => setToast(""), 1500);
      return;
    }

    // otherwise reject
    setToast("Usuario o contraseña incorrectos");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="login-container">
      {toast && <div className="toast">{toast}</div>}

      <div className="login-form">
        <div className="logo-section">
          <img src={logo} alt="logo" className="login-logo" />
          <h2>Iniciar Sesión</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div className="buttons">
            <button type="submit" className="btn-acceder">
              Acceder
            </button>

            <button
              type="button"
              className="btn-crear"
              onClick={() => cambiarSeccion && cambiarSeccion("Usuarios")}
            >
              Crear Cuenta
            </button>

            <button
              type="button"
              className="btn-recuperar"
              onClick={() => setToast("Funcionalidad no implementada")}
            >
              Recuperar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;