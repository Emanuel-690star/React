import { useState } from "react";
import Encabezado from './Encabezado.jsx';
import ContenedorTarjetas from './ContenedorTarjetas';
import Footer from './Footer';
import BannerSuave from './BannerSuave';
import Productos from "./Productos";
import Contactos from "./Contactos";
import Sucursales from "./Sucursales";
import Acerca from "./Acerca";






function App(){

  const [seccion, setSeccion] = useState("inicio");

  return(
    <>
      <Encabezado onCambiar={setSeccion} />

      {/* --------- CONTENIDO DINÁMICO --------- */}

      {seccion === "inicio" && (
        <>
          <ContenedorTarjetas />
          <BannerSuave />
          <Footer />
        </>
      )}

      {seccion === "acerca" && <Acerca />}


      {seccion === "productos" && <Productos />}


      {seccion === "contacto" && <Contactos />}


      {seccion === "sucursales" && <Sucursales />}


    </>
  );
}

export default App;
