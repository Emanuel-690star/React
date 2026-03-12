import "./Login.css";
import logo from "./assets/logo.png";
import { useState } from "react";
import api from "./services/Api";

function Login({ onLogin, cambiarSeccion }) {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  
  // Login state
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  
  // Registro state
  const [usuarioReg, setUsuarioReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [contrasenaReg, setContrasenaReg] = useState("");
  const [contrasenaConfirm, setContrasenaConfirm] = useState("");
  
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

  const handleRegistro = (e) => {
    e.preventDefault();

    if (contrasenaReg !== contrasenaConfirm) {
      setToast("Las contraseñas no coinciden");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    if (!usuarioReg || !emailReg || !contrasenaReg) {
      setToast("Completa todos los campos");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    setToast("Cuenta creada exitosamente");
    setUsuarioReg("");
    setEmailReg("");
    setContrasenaReg("");
    setContrasenaConfirm("");
    
    setTimeout(() => {
      setMostrarRegistro(false);
      setToast("");
    }, 1500);
  };

  return (
    <div className="login-container">
      {toast && <div className="toast">{toast}</div>}

      <div className="login-form">
        <div className="logo-section">
          <img src={logo} alt="logo" className="login-logo" />
          <h2>{mostrarRegistro ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
        </div>

        {!mostrarRegistro ? (
          // FORMULARIO DE LOGIN
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
                onClick={() => setMostrarRegistro(true)}
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
        ) : (
          // FORMULARIO DE REGISTRO
          <form onSubmit={handleRegistro}>
            <div className="input-group">
              <label htmlFor="usuarioReg">Usuario</label>
              <input
                type="text"
                id="usuarioReg"
                placeholder="Ingresa tu usuario"
                value={usuarioReg}
                onChange={(e) => setUsuarioReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="emailReg">Email</label>
              <input
                type="email"
                id="emailReg"
                placeholder="Ingresa tu email"
                value={emailReg}
                onChange={(e) => setEmailReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="contrasenaReg">Contraseña</label>
              <input
                type="password"
                id="contrasenaReg"
                placeholder="Ingresa tu contraseña"
                value={contrasenaReg}
                onChange={(e) => setContrasenaReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="contrasenaConfirm">Confirmar Contraseña</label>
              <input
                type="password"
                id="contrasenaConfirm"
                placeholder="Confirma tu contraseña"
                value={contrasenaConfirm}
                onChange={(e) => setContrasenaConfirm(e.target.value)}
              />
            </div>

            <div className="buttons">
              <button type="submit" className="btn-acceder">
                Registrarse
              </button>

              <button
                type="button"
                className="btn-crear"
                onClick={() => setMostrarRegistro(false)}
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;