import './Carrito.css';
import { useEffect, useState } from 'react';
import api from './services/Api';

function Carrito() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState({});

  useEffect(() => {
    const obtenerCarritos = async () => {
      try {
        const response = await api.get('/carts');
        setCarritos(response.data);
        const ids = Array.from(new Set(response.data.flatMap(c => c.products.map(p => p.productId))));
        const prods = {};
        for (let id of ids) {
          const res = await api.get(`/products/${id}`);
          prods[id] = res.data;
        }
        setProductos(prods);
      } catch (error) {
        console.error('error al obtener carritos', error);
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
      {carritos.map((carrito) => (
        <div className="carrito-card" key={carrito.id}>
          <div className="carrito-id">ID Pedido: {carrito.id}</div>
          <div className="carrito-fecha">{carrito.date}</div>
          <div className="carrito-productos-titulo">Productos</div>
          <ul>
            {carrito.products.map((prod, idx) => (
              <li key={idx}>
                Producto #{prod.productId} — Cantidad: {prod.quantity}
              </li>
            ))}
          </ul>
          <button className="comprar" disabled>Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default Carrito;