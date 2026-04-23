import "./Login.css";
import logo from "./assets/logo.png";
import { useState } from "react";
import api from "./services/Api";

function Login({ onLogin, cambiarSeccion }) {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Registro state
  const [nombreReg, setNombreReg] = useState("");
  const [direccionReg, setDireccionReg] = useState("");
  const [telefonoReg, setTelefonoReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  
  const [toast, setToast] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const token = response.data.token;
      const userObj = response.data.user || { email };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userObj));

      setToast("Login exitoso");
      if (onLogin) onLogin(token, userObj);

      setEmail("");
      setPassword("");
      setTimeout(() => setToast(""), 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Error en el login";
      setToast(message);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (passwordReg !== passwordConfirm) {
      setToast("Las contraseñas no coinciden");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    if (!nombreReg || !direccionReg || !telefonoReg || !emailReg || !passwordReg) {
      setToast("Completa todos los campos");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    try {
      await api.post("/usuarios", {
        nombre: nombreReg,
        direccion: direccionReg,
        telefono: telefonoReg,
        email: emailReg,
        password: passwordReg,
        rol: "cliente",
        fecha_registro: new Date(),
      });

      setToast("Cuenta creada exitosamente");
      setNombreReg("");
      setDireccionReg("");
      setTelefonoReg("");
      setEmailReg("");
      setPasswordReg("");
      setPasswordConfirm("");

      setTimeout(() => {
        setMostrarRegistro(false);
        setToast("");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Error al registrar usuario";
      setToast(message);
      setTimeout(() => setToast(""), 3000);
    }
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <label htmlFor="nombreReg">Nombre</label>
              <input
                type="text"
                id="nombreReg"
                placeholder="Ingresa tu nombre"
                value={nombreReg}
                onChange={(e) => setNombreReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="direccionReg">Dirección</label>
              <input
                type="text"
                id="direccionReg"
                placeholder="Ingresa tu dirección"
                value={direccionReg}
                onChange={(e) => setDireccionReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefonoReg">Teléfono</label>
              <input
                type="text"
                id="telefonoReg"
                placeholder="Ingresa tu teléfono"
                value={telefonoReg}
                onChange={(e) => setTelefonoReg(e.target.value)}
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
              <label htmlFor="passwordReg">Password</label>
              <input
                type="password"
                id="passwordReg"
                placeholder="Ingresa tu password"
                value={passwordReg}
                onChange={(e) => setPasswordReg(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="passwordConfirm">Confirmar Password</label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="Confirma tu password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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