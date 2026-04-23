import "./Carrito.css";
import { useEffect, useState } from "react";
import api from "./services/Api";

function Carrito({ usuario, cartVersion }) {
  const [carrito, setCarrito] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    cargarCarrito();
  }, [usuario, cartVersion]);

  const cargarCarrito = async () => {
    if (!usuario) {
      setCarrito(null);
      setDetalles([]);
      setCargando(false);
      return;
    }

    setCargando(true);

    try {
      const responseCarritos = await api.get("/carritos");
      const carritoUsuario = responseCarritos.data.find(
        (c) => c.id_usuario === usuario.id && c.estado === "activo"
      );

      if (carritoUsuario) {
        setCarrito(carritoUsuario);
        setDetalles(carritoUsuario.detalles || []);
      } else {
        setCarrito(null);
        setDetalles([]);
      }
    } catch (error) {
      console.error("Error al obtener carrito", error);
      mostrarToast("Error al cargar el carrito: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  const actualizarCantidad = async (detalle, siguienteCantidad) => {
    if (siguienteCantidad < 1) {
      await eliminarDetalle(detalle.id);
      return;
    }

    try {
      await api.put(`/carrito-detalle/${detalle.id}`, {
        precio_unitario: detalle.precio_unitario,
        cantidad: siguienteCantidad,
        id_carrito: detalle.id_carrito,
        id_producto: detalle.id_producto,
      });

      await cargarCarrito();
      mostrarToast("Cantidad actualizada");
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      mostrarToast("No se pudo actualizar la cantidad");
    }
  };

  const eliminarDetalle = async (detalleId) => {
    try {
      await api.delete(`/carrito-detalle/${detalleId}`);
      await cargarCarrito();
      mostrarToast("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      mostrarToast("No se pudo eliminar el producto");
    }
  };

  if (cargando) return <p>Cargando carrito...</p>;

  if (!usuario) return <p>Debes iniciar sesion para ver tu carrito.</p>;

  return (
    <div className="carritos">
      {toast && <div className="toast">{toast}</div>}
      <h1>Mi Carrito de Compras</h1>

      {carrito ? (
        <div className="carrito-card">
          <div className="carrito-id">ID Pedido: {carrito.id}</div>
          <div className="carrito-fecha">Estado: {carrito.estado}</div>
          <div className="carrito-fecha">Total: $ {Number(carrito.total || 0).toFixed(2)}</div>
          <div className="carrito-fecha">
            Fecha: {new Date(carrito.fecha_creacion).toLocaleString()}
          </div>
          <h3>Productos en el carrito ({detalles.length}):</h3>

          {detalles.length > 0 ? (
            <div className="detalle-lista">
              {detalles.map((detalle) => (
                <div key={detalle.id} className="detalle-item">
                  <p><strong>Producto:</strong> {detalle.producto?.nombre || `ID ${detalle.id_producto}`}</p>
                  <p><strong>Descripcion:</strong> {detalle.producto?.direccion || "Sin descripcion"}</p>
                  <p><strong>Precio unitario:</strong> $ {Number(detalle.precio_unitario).toFixed(2)}</p>
                  <p><strong>Subtotal:</strong> $ {(Number(detalle.precio_unitario) * Number(detalle.cantidad)).toFixed(2)}</p>

                  <div className="detalle-acciones">
                    <button onClick={() => actualizarCantidad(detalle, Number(detalle.cantidad) - 1)}>
                      -
                    </button>
                    <span>{detalle.cantidad}</span>
                    <button onClick={() => actualizarCantidad(detalle, Number(detalle.cantidad) + 1)}>
                      +
                    </button>
                    <button
                      className="btn-eliminar-detalle"
                      onClick={() => eliminarDetalle(detalle.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#999" }}>No hay productos en el carrito</p>
          )}

          <button className="comprar" disabled>
            Comprar
          </button>
        </div>
      ) : (
        <p style={{ color: "#999" }}>No tienes un carrito activo. Agrega productos desde la tienda.</p>
      )}
    </div>
  );
}

export default Carrito;
