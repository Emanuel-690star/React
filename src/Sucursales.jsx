import "./Sucursales.css";

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
    mapa: "https://maps.google.com/?q=Santiago+Bernabeu"
  },
  {
    nombre: "CAP Stadium",
    ciudad: "Portugal",
    capacidad: "50,000 espectadores",
    ano: "2003",
    img: cap,
    mapa: "https://maps.google.com/"
  },
  {
    nombre: "Anfield",
    ciudad: "Liverpool, Inglaterra",
    capacidad: "53,394 espectadores",
    ano: "1884",
    img: anfild,
    mapa: "https://maps.google.com/?q=Anfield"
  }
];

function Sucursales(){
  return (
    <div className="suc-container">

      <h1 className="suc-titulo">
        Sedes Champions League
      </h1>

      <div className="suc-grid">

        {lista.map((s, i) => (
          <div className="suc-card" key={i}>

            <img src={s.img} alt={s.nombre}/>

            <div className="suc-info">
              <h2>{s.nombre}</h2>

              <p>📍 {s.ciudad}</p>
              <p>👥 Capacidad: {s.capacidad}</p>
              <p>🏗 Inauguración: {s.ano}</p>

              <a href={s.mapa} target="_blank">
                Ver ubicación
              </a>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Sucursales;
