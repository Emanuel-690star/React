import "./Productos.css";
import { useEffect, useState } from "react";
import api from "./services/Api";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const obtenerProductos = async () => {
      try {
        const response = await api.get("/products"); 
        console.log("DATA API:", response.data); // para debug

        // Aseguramos que sea un array
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setProductos([]); // evita el error .map
        }

      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();

  }, []);

  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className="ProductosDiv">
      <h1>CATÁLOGO PRODUCTOS</h1>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.image} alt={producto.title} />
            <h3>{producto.title}</h3>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Productos;