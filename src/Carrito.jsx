import './Carrito.css';
import { useEffect, useState } from 'react';
import api from './services/Api';

function Carrito() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCarritos = async () => {
      try {
        const response = await api.get('/carritos');
        setCarritos(response.data || []);
      } catch (error) {
        console.error('Error al obtener carritos', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerCarritos();
  }, []);

  if (cargando) return <p>Cargando carritos.......</p>;

  return (
    <div className="carritos">
      <h1>Carrito de compras</h1>
      {carritos.length > 0 ? (
        carritos.map((carrito) => (
          <div className="carrito-card" key={carrito.id}>
            <div className="carrito-id">ID Pedido: {carrito.id}</div>
            <div className="carrito-fecha">Usuario: {carrito.id_usuario}</div>
            <div className="carrito-fecha">Estado: {carrito.estado}</div>
            <div className="carrito-fecha">Total: $ {carrito.total}</div>
            <div className="carrito-fecha">
              Fecha: {new Date(carrito.fecha_creacion).toLocaleString()}
            </div>
            <button className="comprar" disabled>Comprar</button>
          </div>
        ))
      ) : (
        <p>No hay carritos disponibles</p>
      )}
    </div>
  );
}

export default Carrito;