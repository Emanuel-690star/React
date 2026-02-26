import "./Inicio.css";
import ContenedorTarjetas from "./ContenedorTarjetas";
import BannerSuave from "./BannerSuave";
import Footer from "./Footer";

function Inicio() {
  return (
    <div className="inicio-container">
      <ContenedorTarjetas />
      <BannerSuave />
      <Footer />
    </div>
  );
}

export default Inicio;