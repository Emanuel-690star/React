import "./Sucursales.css";
import Mapa from "./Mapa";

import santiago from "./assets/santiago.jpg";
import cap from "./assets/cap.jpg";
import anfild from "./assets/anfild.jpg";

const lista = [
  {
    nombre: "Santiago Bernabéu",
    ciudad: "Madrid, España",
    capacidad: "81,044 espectadores",
    ano: "1947",
    img: santiago,
    mapa: "https://maps.google.com/?q=Santiago+Bernabeu",
    lat: 40.4531,
    lng: -3.6883
  },
  {
    nombre: "CAP Stadium",
    ciudad: "Portugal",
    capacidad: "50,000 espectadores",
    ano: "2003",
    img: cap,
    mapa: "https://maps.google.com/?q=Portugal",
    lat: 39.3999,
    lng: -8.2245
  },
  {
    nombre: "Anfield",
    ciudad: "Liverpool, Inglaterra",
    capacidad: "53,394 espectadores",
    ano: "1884",
    img: anfild,
    mapa: "https://maps.google.com/?q=Anfield",
    lat: 53.4308,
    lng: -2.9608
  }
];

function Sucursales(){

  const abrirMapa = (url)=>{
    window.open(url,"_blank");
  };

  return (
    <div className="suc-container">

      <h1 className="suc-titulo">
        Sedes Champions League
      </h1>

      <div className="suc-grid">

        {lista.map((s,i)=>(
          <div
            className="suc-card"
            key={i}
            onClick={()=>abrirMapa(s.mapa)}
          >

            <img src={s.img} alt={s.nombre}/>

            <div className="suc-info">
              <h2>{s.nombre}</h2>
              <p>📍 {s.ciudad}</p>
              <p>👥 {s.capacidad}</p>
              <p>🏗 {s.ano}</p>
            </div>

            {/* 🔥 USANDO TU COMPONENTE MAPA */}
            <div className="mini-mapa">
              <Mapa
                lat={s.lat}
                lng={s.lng}
                nombre_sucursal={s.nombre}
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Sucursales;

