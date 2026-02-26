import { useState } from "react";
import "./Jugadores.css";

// IMPORTS DE TUS IMAGENES
import van from "./assets/van.jpg";
import alison from "./assets/alison.jpg";
import Ryan from "./assets/Ryan.jpg";
import dembele from "./assets/dembele.jpg";
import florianw from "./assets/florianw.jpg";
import fodem from "./assets/fodem.jpg";
import ekitike from "./assets/ekitike.jpg";
import dominic from "./assets/dominic.jpg";
import desire from "./assets/desire.jpg";
import cole from "./assets/cole.jpg";
import cherki from "./assets/cherki.jpg";
import isak from "./assets/isak.jpg";
import jeremy from "./assets/jeremy.jpg";
import maca from "./assets/maca.jpg";
import trent from "./assets/trent.jpg";
import rice from "./assets/rice.jpg";
import liv from "./assets/liv.jpg";


// DATA (puedes editar nombres/equipos)
const jugadores = [
  { nombre:"Van Dijk", equipo:"Liverpool", posicion:"Defensa", img:van },
  { nombre:"Alisson", equipo:"Liverpool", posicion:"Portero", img:alison },
  { nombre:"Ryan", equipo:"Club", posicion:"Medio", img:Ryan },
  { nombre:"Dembele", equipo:"PSG", posicion:"Extremo", img:dembele },
  { nombre:"Florian Wirtz", equipo:"Leverkusen", posicion:"Medio", img:florianw },
  { nombre:"Fodem", equipo:"Man City", posicion:"Medio", img:fodem },
  { nombre:"Ekitike", equipo:"Frankfurt", posicion:"Delantero", img:ekitike },
  { nombre:"Dominic", equipo:"Liverpool", posicion:"Medio", img:dominic },
  { nombre:"Desire Doue", equipo:"Rennes", posicion:"Extremo", img:desire },
  { nombre:"Cole Palmer", equipo:"Chelsea", posicion:"Medio", img:cole },
  { nombre:"Cherki", equipo:"Lyon", posicion:"Medio", img:cherki },
  { nombre:"Isak", equipo:"Newcastle", posicion:"Delantero", img:isak },
  { nombre:"Jeremy", equipo:"Club", posicion:"Defensa", img:jeremy },
  { nombre:"Mac Allister", equipo:"Liverpool", posicion:"Medio", img:maca },
  { nombre:"Trent", equipo:"Liverpool", posicion:"Defensa", img:trent },
  { nombre:"Rice", equipo:"Arsenal", posicion:"Medio", img:rice },
  { nombre:"Liverpool Squad", equipo:"Liverpool", posicion:"Equipo", img:liv },
];

export default function Jugadores(){

  const [busqueda, setBusqueda] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  const filtrados = jugadores.filter(j =>
    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>

      {/* BUSCADOR */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar jugador..."
          onChange={(e)=>setBusqueda(e.target.value)}
        />
      </div>

      {/* GRID PINTEREST */}
      <div className="pinterest-container">

        {filtrados.map((j,i)=>(
          <div
            className="pin-card"
            key={i}
            onClick={()=>setSeleccionado(j)}
          >
            <img src={j.img} />

            {/* OVERLAY INFO */}
            <div className="info-hover">
              <h3>{j.nombre}</h3>
              <p>{j.equipo}</p>
              <span>{j.posicion}</span>
            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {seleccionado && (
        <div className="modal-bg" onClick={()=>setSeleccionado(null)}>
          <div className="modal-card">

            <img src={seleccionado.img}/>

            <h2>{seleccionado.nombre}</h2>
            <p>{seleccionado.equipo}</p>
            <span>{seleccionado.posicion}</span>

          </div>
        </div>
      )}

    </div>
  );
}

