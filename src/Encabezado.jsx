import uefa from './assets/uefa.png';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import gmail from './assets/gmail.png';
import tiktok from './assets/tik-tok.png';
import './Encabezado.css';
import Clima from './Clima';

function Encabezado({ onCambiar, usuario, onLogout }){
    return (
        <div className="Encabezado">
            <Logo />
            <Menu onCambiar={onCambiar} usuario={usuario} onLogout={onLogout} />
            {usuario && <div className="UsuarioLogueado">Hola, {usuario.nombre || usuario.email || usuario.username}</div>}
            <Redes />
        </div>
    );
}

function Logo(){
    return (
        <div className="LogoDiv">
            <img src={uefa} alt="React Logo" />
        </div>
    );
}

function Menu({ onCambiar, usuario, onLogout }){
    return (
        <div className="MenuDiv">
            <ul>
                <li><button onClick={() => onCambiar("inicio")}>Inicio</button></li>
                <li><button onClick={() => onCambiar("acerca")}>Acerca de</button></li>
                <li><button onClick={() => onCambiar("productos")}>Productos</button></li>
                <li><button onClick={() => onCambiar("contacto")}>Contacto</button></li>
                <li><button onClick={() => onCambiar("sucursales")}>Sucursales</button></li>
                <li><button onClick={() => onCambiar("Jugadores")}>Jugadores</button></li>
                {usuario && <li><button onClick={() => onCambiar("categorias")}>Categorías</button></li>}
                {usuario && <li><button onClick={() => onCambiar("carrito")}>Carrito</button></li>}
                {usuario && usuario.rol === 'admin' && <li><button onClick={() => onCambiar("Usuarios")}>Usuarios</button></li>}
                {!usuario && <li><button onClick={() => onCambiar("login")}>Login</button></li>}
                {usuario && <li><button onClick={() => { if (onLogout) onLogout(); }}>Cerrar sesión</button></li>}
            </ul>
            <Clima />
        </div>    
    );
}


function Redes(){
    return (
        <div className="RedesDiv">
            <ul>
                <li className="redes"><a href='#'><img src={facebook} alt="Facebook" /></a></li> 
                <li className="redes"><a href='#'><img src={instagram} alt="Instagram" /></a></li>
                <li className="redes"><a href='#'><img src={gmail} alt="Gmail" /></a></li>
                <li className="redes"><a href='#'><img src={tiktok} alt="TikTok" /></a></li>
            </ul>
        </div>
    );
}

export default Encabezado;
