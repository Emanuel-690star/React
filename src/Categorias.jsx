import "./Categorias.css";
import { useEffect, useState } from "react";
import api from "./services/Api";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await api.get("/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setToast("Error al cargar las categorías desde el backend");
        setCategorias([]);
      } finally {
        setCargando(false);
      }
    };

    obtenerCategorias();
  }, []);
  if (cargando) return <p className="loading">Cargando categorías...</p>;

  return (
    <div className="CategoriasDiv">
      {toast && <div className="toast">{toast}</div>}

      <h1 className="titulo-categorias">CATEGORÍAS</h1>

      <div className="categorias-grid">
        {categorias && categorias.length > 0 ? (
          categorias.map((categoria) => (
            <div className="categoria-card" key={categoria.id}>
              <div className="categoria-info">
                <h3>{categoria.nombre}</h3>
                <p className="categoria-descripcion">
                  ID: {categoria.id}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="sin-categorias">No hay categorías disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Categorias;
