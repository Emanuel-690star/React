import { useState, useEffect } from "react";
import Encabezado from "./Encabezado.jsx";
import Inicio from "./Inicio";
import Productos from "./Productos";
import Contactos from "./Contactos";
import Sucursales from "./Sucursales";
import Acerca from "./Acerca";
import Jugadores from "./Jugadores";
import Carrito from "./Carrito.jsx";
import Usuario from "./UsuariosTabla.jsx";
import Categorias from "./Categorias.jsx";
import Login from "./Login";

function App() {
  const [seccion, setSeccion] = useState("inicio");
  const [token, setToken] = useState("");
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [cartVersion, setCartVersion] = useState(0);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setToken(t);
      try {
        setUsuarioLogeado(JSON.parse(u));
      } catch {}
    }
  }, []);

  const handleLogin = (newToken, user) => {
    setToken(newToken);
    setUsuarioLogeado(user);
    setCartVersion(0);
    setSeccion("inicio");
  };

  const handleLogout = () => {
    setToken("");
    setUsuarioLogeado(null);
    setCartVersion(0);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSeccion("login");
  };

  const actualizarCarrito = () => {
    setCartVersion((versionActual) => versionActual + 1);
  };

  return (
    <>
      <Encabezado onCambiar={setSeccion} usuario={usuarioLogeado} onLogout={handleLogout} />

      {seccion === "inicio" && <Inicio />}
      {seccion === "acerca" && <Acerca />}
      {seccion === "productos" && (
        <Productos usuario={usuarioLogeado} onCarritoActualizado={actualizarCarrito} />
      )}
      {seccion === "contacto" && <Contactos />}
      {seccion === "sucursales" && <Sucursales />}
      {seccion === "Jugadores" && <Jugadores />}
      {seccion === "carrito" && <Carrito usuario={usuarioLogeado} cartVersion={cartVersion} />}
      {seccion === "Usuarios" && <Usuario />}
      {seccion === "categorias" && <Categorias />}
      {seccion === "login" && <Login onLogin={handleLogin} cambiarSeccion={setSeccion} />}
    </>
  );
}

export default App;
