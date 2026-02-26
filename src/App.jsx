import { useState } from "react";
import Encabezado from './Encabezado.jsx';
import Inicio from './Inicio'; 
import Productos from "./Productos";
import Contactos from "./Contactos";
import Sucursales from "./Sucursales";
import Acerca from "./Acerca";
import Jugadores from "./Jugadores";

function App(){

  const [seccion, setSeccion] = useState("inicio");

  return(
    <>
      <Encabezado onCambiar={setSeccion} />

      {/* --------- CONTENIDO DINÁMICO --------- */}

      {seccion === "inicio" && <Inicio />}  

      {seccion === "acerca" && <Acerca />}

      {seccion === "productos" && <Productos />}

      {seccion === "contacto" && <Contactos />}

      {seccion === "sucursales" && <Sucursales />}

      {seccion === "Jugadores" && <Jugadores />}

    </>
  );
}

export default App;
