import "./Sucursales.css";
import Clima from "./Clima"; // 👈 IMPORTANTE

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
    lat: 40.4531,
    lng: -3.6883,
    mapa: "https://maps.google.com/?q=Santiago+Bernabeu"
  },
  {
    nombre: "CAP Stadium",
    ciudad: "Portugal",
    capacidad: "50,000 espectadores",
    ano: "2003",
    img: cap,
    lat: 38.7223,
    lng: -9.1393,
    mapa: "https://maps.google.com/?q=Portugal"
  },
  {
    nombre: "Anfield",
    ciudad: "Liverpool, Inglaterra",
    capacidad: "53,394 espectadores",
    ano: "1884",
    img: anfild,
    lat: 53.4308,
    lng: -2.9608,
    mapa: "https://maps.google.com/?q=Anfield"
  }
];

function Sucursales(){
  return (
    <div className="suc-container">

      <h1 className="suc-titulo">
        Sedes Champions League 🏆
      </h1>

      <div className="suc-grid">

        {lista.map((s, i) => (
          <div className="suc-card" key={i}>

            <img src={s.img} alt={s.nombre} className="suc-img"/>

            <div className="suc-info">
              <h2>{s.nombre}</h2>

              <p>📍 {s.ciudad}</p>
              <p>👥 {s.capacidad}</p>
              <p>🏗 {s.ano}</p>

              {/* 🔥 CLIMA DENTRO DE LA CARD */}
              <Clima lat={s.lat} lng={s.lng} />

              <a href={s.mapa} target="_blank" rel="noreferrer">
                Ver ubicación 📍
              </a>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Sucursales;