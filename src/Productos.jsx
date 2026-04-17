import "./Productos.css";
import { useEffect, useState } from "react";
import api from "./services/Api";
import RegistrarProductos from "./RegistrarProductos";

function Productos({ usuario }) {

  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {

    const obtenerProductos = async () => {
      try {
        const response = await api.get('/productos');
        setProductos(response.data || []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();

  }, []);

  // EDITAR
  const editarProducto = (producto) => {
    setProductoEditar(producto);
  };

  // GUARDAR CAMBIOS
  const guardarCambios = async (productoActualizado) => {

    try {
      await api.put(`/productos/${productoActualizado.id}`, productoActualizado);

      const nuevosProductos = productos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      );

      setProductos(nuevosProductos);
      setProductoEditar(null);
      setToast('Producto actualizado correctamente');
      setTimeout(() => setToast(''), 3000);

    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setProductoEditar(null);
      setToast('Error al actualizar producto en el backend');
      setTimeout(() => setToast(''), 3000);
    }
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {

    try {
      await api.delete(`/productos/${id}`);
      const nuevos = productos.filter((p) => p.id !== id);
      setProductos(nuevos);
      setToast('Producto eliminado correctamente');
      setTimeout(() => setToast(''), 3000);

    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setToast('Error al eliminar producto en el backend');
      setTimeout(() => setToast(''), 3000);
    }
  };

  if (cargando) return <p className="loading">Cargando tienda Champions...</p>;

  return (
    <div className="ProductosDiv">

      {toast && <div className="toast">{toast}</div>}

      <RegistrarProductos
        usuario={usuario}
        productoEditar={productoEditar}
        guardarCambios={guardarCambios}
      />

      <h1 className="titulo-tienda">TIENDA CHAMPIONS STORE ⚽</h1>

      <div className="productos-grid">

        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>

            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} />
            ) : (
              <div className="producto-placeholder">Sin imagen</div>
            )}

            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p>{producto.direccion}</p>
              <p className="precio">$ {producto.precio} MXN</p>
              <p>Stock: {producto.stock}</p>

              <button className="btn-comprar" disabled>
                Añadir al carrito 🛒
              </button>

              {usuario && (
                <>
                  <button
                    className="btn-editar"
                    onClick={() => editarProducto(producto)}
                  >
                    Editar ✏️
                  </button>

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar 🗑
                  </button>
                </>
              )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Productos;