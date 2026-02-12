import "./Productos.css";

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
import trent from "./assets/trent.jpg";
import rice from "./assets/rice.jpg";


const imgs = [
  van, alison, Ryan, dembele, florianw,
  fodem, ekitike, dominic, desire,
  cole, cherki, isak, jeremy, trent, rice, 
];

export default function Productos() {
  return (
    <div className="pinterest-container">
      {imgs.map((img, i) => (
        <div className={`pin-card h${(i % 5) + 1}`} key={i}>
          <img src={img} alt="" />
          <div className="pin-overlay"></div>
        </div>
      ))}
    </div>
  );
}
