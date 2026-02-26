import "./Inicio.css";
import BannerSuave from "./BannerSuave";
import { useNavigate } from "react-router-dom";

function Inicio() {

  const navigate = useNavigate();

  return (
    <div className="inicio-container">

      {/* BANNER CON MAPA */}
      <BannerSuave />

      {/* SECCIÓN HERO */}
      <section className="inicio-hero">
        <h1 className="inicio-titulo">
          Bienvenido a la Experiencia Champions League ⚽
        </h1>

        <p className="inicio-descripcion">
          Descubre jugadores estrella, sedes históricas y contenido
          exclusivo del mundo del fútbol en una app inspirada en la Champions.
        </p>

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="inicio-botones">
          <button onClick={() => navigate("/jugadores")}>
            Ver Jugadores
          </button>

          <button onClick={() => navigate("/sucursales")}>
            Ver Sucursales
          </button>

          <button onClick={() => navigate("/productos")}>
            Ver Productos
          </button>
        </div>
      </section>

      {/* SECCIÓN DESTACADA */}
      <section className="inicio-destacado">
        <h2>Explora el universo del fútbol europeo</h2>
        <p>
          Navega por nuestra galería tipo Pinterest de jugadores,
          consulta ubicaciones de sedes oficiales y vive la experiencia
          Champions en una sola plataforma.
        </p>
      </section>

    </div>
  );
}

export default Inicio;