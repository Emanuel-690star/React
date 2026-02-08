import uefa from './assets/uefa.png';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import gmail from './assets/gmail.png';
import tiktok from './assets/tik-tok.png';
import './Encabezado.css';
function Encabezado(){
    return (
        <div className="Encabezado">
            <Logo />
            <Menu />
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


function Menu(){
    return (
        <div className="MenuDiv">
            <ul>
                <li><a href='#'>Inicio</a></li>
                <li><a href='#'>Acerca de</a></li>
                <li><a href='#'>Productos</a></li>
                <li><a href='#'>Contacto</a></li>
                <li><a href='#'>Sucursales</a></li>
            </ul>
        </div>    
    );
}

function Redes(){
    return (
        <div className="RedesDiv">
            <ul>
                <li className="redes"> <a href='#'> <img src={facebook} alt="Facebook" /></a></li> 
                <li className="redes"> <a href='#'> <img src={instagram} alt="Instagram" /></a></li>
                <li className="redes"> <a href='#'> <img src={gmail} alt="Gmail" /></a></li>
                <li className="redes"> <a href='#'> <img src={tiktok} alt="TikTok" /></a></li>
            </ul>
        </div>
    );
}
export default Encabezado