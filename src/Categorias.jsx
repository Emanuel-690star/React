import "./Categorias.css";
import { useEffect, useState } from "react";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const apiUrl = import.meta.env.VITE_THEMEALDB_API_KEY;

        console.log("URL de API desde .env:", apiUrl);
        console.log("Todas las variables:", import.meta.env);

        if (!apiUrl || apiUrl.trim() === "") {
          throw new Error("API URL no configurada en .env. Usando URL directa.");
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log("Datos recibidos:", data);

        if (data.categories && Array.isArray(data.categories)) {
          setCategorias(data.categories);
        } else {
          setCategorias([]);
        }

      } catch (error) {
        console.error("Error al obtener categorías:", error);
        // Intentar con URL directa como fallback
        try {
          const urlDirecta = "https://www.themealdb.com/api/json/v1/1/categories.php";
          const response = await fetch(urlDirecta);
          const data = await response.json();
          if (data.categories) {
            setCategorias(data.categories);
          }
        } catch (fallbackError) {
          console.error("Error en fallback:", fallbackError);
          setToast("Error al cargar las categorías");
          setTimeout(() => setToast(""), 3000);
        }
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

      <h1 className="titulo-categorias">CATEGORÍAS DE COMIDAS 🍽️</h1>

      <div className="categorias-grid">
        {categorias && categorias.length > 0 ? (
          categorias.map((categoria) => (
            <div className="categoria-card" key={categoria.idCategory}>
              <img 
                src={categoria.strCategoryThumb} 
                alt={categoria.strCategory} 
                className="categoria-imagen"
              />

              <div className="categoria-info">
                <h3>{categoria.strCategory}</h3>
                <p className="categoria-descripcion">
                  {categoria.strCategoryDescription.substring(0, 100)}...
                </p>

                <button className="btn-ver-mas">
                  Ver más 👉
                </button>
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
