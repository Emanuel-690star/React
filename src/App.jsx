import { useState } from "react";
import Encabezado from './Encabezado.jsx';
import ContenedorTarjetas from './ContenedorTarjetas';
import Footer from './Footer';
import BannerSuave from './BannerSuave';
import Productos from "./Productos";
import Contactos from "./Contactos";



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

      {seccion === "acerca" && <h1>Acerca de nosotros (vacío por ahora)</h1>}

      {seccion === "productos" && <Productos />}


      {seccion === "contacto" && <Contactos />}


      {seccion === "sucursales" && <h1>Sucursales (vacío)</h1>}

    </>
  );
}

export default App;
