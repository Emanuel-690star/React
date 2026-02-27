import "./Productos.css";
import { useEffect, useState } from "react";
import api from "./services/Api";
import RegistrarProductos from "./RegistrarProductos";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const obtenerProductos = async () => {
      try {
        // 🔥 FILTRAMOS SOLO ROPA (más tipo jerseys)
        const response = await api.get("/products/category/men's clothing");

        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setProductos([]);
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

  if (cargando) return <p className="loading">Cargando tienda Champions...</p>;

  return (
    <div className="ProductosDiv">
      <RegistrarProductos />
      <h1 className="titulo-tienda">TIENDA CHAMPIONS STORE ⚽</h1>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.image} alt={producto.title} />

            <div className="producto-info">
              {/* 🔥 Cambiamos el estilo visual a deportivo */}
              <h3>Jersey Elite Edition</h3>
              <p className="precio">$ {producto.price} MXN</p>
              <button className="btn-comprar">
                Añadir al carrito 🛒
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Productos;