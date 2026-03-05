import { useState, useEffect } from "react";
import Encabezado from './Encabezado.jsx';
import Inicio from './Inicio'; 
import Productos from "./Productos";
import Contactos from "./Contactos";
import Sucursales from "./Sucursales";
import Acerca from "./Acerca";
import Jugadores from "./Jugadores";
import Carrito from "./Carrito.jsx";
import Usuario from "./UsuariosTabla.jsx";
import Login from "./Login";

function App(){

  const [seccion, setSeccion] = useState("inicio");
  const [token, setToken] = useState("");
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);

  // restaurar sesión desde localStorage
  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('usuario');
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
    setSeccion("inicio");
  };

  const handleLogout = () => {
    setToken("");
    setUsuarioLogeado(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setSeccion('login');
  };

  return(
    <>
      <Encabezado onCambiar={setSeccion} usuario={usuarioLogeado} />

      {/* --------- CONTENIDO DINÁMICO --------- */}

      {seccion === "inicio" && <Inicio />}  

      {seccion === "acerca" && <Acerca />}

      {seccion === "productos" && <Productos />}

      {seccion === "contacto" && <Contactos />}

      {seccion === "sucursales" && <Sucursales />}

      {seccion === "Jugadores" && <Jugadores />}

      {seccion === "carrito" && <Carrito />}

      {seccion === "Usuarios" && <Usuario />}

      {seccion === "login" && <Login onLogin={handleLogin} cambiarSeccion={setSeccion} />}

    </>
  );
}

export default App;
