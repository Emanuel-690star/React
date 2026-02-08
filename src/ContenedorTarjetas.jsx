import './ContenedorTarjetas.css';
import moh from './assets/moh.jpg';
import vir from './assets/vir.jpg';
import flo from './assets/flo.jpg';
import szo from './assets/szo.jpg';

function ContenedorTarjetas(){
    return(
        <div className="ContenedorTarjetas">

            <div className="tarjetasWrapper">
                <div className="contenedorHorizontal">
                    <div className="tarjetas">

                        <Tarjeta 
                            img={moh}
                            titulo="Mohamed Salah"
                            texto="Extremo veloz con gran definición"
                        />

                        <Tarjeta 
                            img={vir}
                            titulo="Virgil vandijk"
                            texto="Descripción ejemplo"
                        />

                        <Tarjeta 
                            img={flo}
                            titulo="florian wirtz"
                            texto="Descripción ejemplo"
                        />

                        <Tarjeta 
                            img={szo}
                            titulo="szoboslai"
                            texto="Descripción ejemplo"
                        />

                    </div>
                </div>
            </div>

        </div>
    );
}


function Tarjeta({img, titulo, texto}){
    return(
        <div className="tarjeta">
            <img src={img} alt={titulo} />
            <h3>{titulo}</h3>
            <p>{texto}</p>
        </div>
    );
}

export default ContenedorTarjetas;
