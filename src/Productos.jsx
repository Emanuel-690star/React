import "./Productos.css";
import mo from "./assets/moh.jpg";

const productos = [
  { nombre:"Producto 1", precio:"$100", img:mo },
  { nombre:"Producto 2", precio:"$120", img:mo },
  { nombre:"Producto 3", precio:"$90", img:mo },
  { nombre:"Producto 4", precio:"$150", img:mo },
  { nombre:"Producto 5", precio:"$80", img:mo },
  { nombre:"Producto 6", precio:"$70", img:mo },

  { nombre:"Producto 7", precio:"$110", img:mo },
  { nombre:"Producto 8", precio:"$140", img:mo },
  { nombre:"Producto 9", precio:"$95", img:mo },
  { nombre:"Producto 10", precio:"$130", img:mo },
  { nombre:"Producto 11", precio:"$160", img:mo },
  { nombre:"Producto 12", precio:"$75", img:mo },

  { nombre:"Producto 13", precio:"$105", img:mo },
  { nombre:"Producto 14", precio:"$115", img:mo },
  { nombre:"Producto 15", precio:"$98", img:mo },
  { nombre:"Producto 16", precio:"$88", img:mo },
  { nombre:"Producto 17", precio:"$99", img:mo },
  { nombre:"Producto 18", precio:"$109", img:mo },
];

function Productos(){
  return(
    <div className="contenedor-productos">

      <h1 className="titulo">Productos</h1>

      <div className="grid-productos">
        {productos.map((p,i)=>(
          <div className="card" key={i}>

            <div className="img-container">
              <img src={p.img} alt={p.nombre}/>
            </div>

            <h3>{p.nombre}</h3>
            <p className="precio">{p.precio}</p>

            <button>Comprar</button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Productos;///jkhdfsihfusdghfuydsgfdfuigduyfguygfuyfisahfy

