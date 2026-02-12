import "./Acerca.css";
import estadio from "./assets/santiago.jpg"; // puedes cambiar imagen

function Acerca(){
  return (
    <div className="acerca-container">

      <div className="acerca-hero">
        <img src={estadio} alt="Champions"/>
        <div className="acerca-overlay">
          <h1>Sobre la Plataforma</h1>
        </div>
      </div>

      <div className="acerca-texto">
        <p>
          Esta aplicación fue creada como una experiencia digital inspirada
          en la emoción y grandeza de la UEFA Champions League. Su objetivo
          es mostrar contenido interactivo sobre productos, sedes y contacto,
          aplicando tecnologías modernas como React y diseño responsivo.
        </p>

        <p>
          Más que una web, es un proyecto de desarrollo que combina
          creatividad, programación y pasión por el fútbol europeo,
          simulando una plataforma oficial con navegación dinámica.
        </p>
      </div>

      <div className="acerca-grid">

        <div className="acerca-card">
          <h2>Misión</h2>
          <p>
            Desarrollar interfaces modernas que transmitan la emoción
            del deporte y permitan practicar tecnologías frontend
            profesionales.
          </p>
        </div>

        <div className="acerca-card">
          <h2>Visión</h2>
          <p>
            Evolucionar esta plataforma hacia una experiencia completa
            con datos reales, animaciones avanzadas y backend conectado.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Acerca ;
