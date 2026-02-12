import "./BannerSuave.css";
import Mapa from "./Mapa";

function BannerSuave(){
  return(
    <div className="banner">

      <h2 className="banner-titulo">
        Encuentra nuestra sede Champions ⚽
      </h2>

      {/* MAPA */}
      <div className="mapa-wrapper">
        <Mapa
          lat={19.4326}
          lng={-99.1332}
          nombre_sucursal="Sede Central"
        />
      </div>

    </div>
  );
}

export default BannerSuave;
