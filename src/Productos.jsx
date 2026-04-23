import "./Productos.css";
import { useEffect, useState } from "react";
import api from "./services/Api";
import RegistrarProductos from "./RegistrarProductos";

function Productos({ usuario, onCarritoActualizado }) {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(""), 3000);
  };

  const obtenerProductos = async () => {
    try {
      const response = await api.get("/productos");
      setProductos(response.data || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      mostrarToast("No se pudieron cargar los productos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const editarProducto = (producto) => {
    setProductoEditar(producto);
  };

  const crearProducto = async (nuevoProducto) => {
    try {
      const response = await api.post("/productos", nuevoProducto);
      setProductos((actuales) => [...actuales, response.data]);
      mostrarToast("Producto creado correctamente");
    } catch (error) {
      console.error("Error al crear producto:", error);
      mostrarToast("Error al crear producto en el backend");
    }
  };

  const guardarCambios = async (productoActualizado) => {
    try {
      const response = await api.put(`/productos/${productoActualizado.id}`, productoActualizado);
      const productoGuardado = response.data;

      setProductos((actuales) =>
        actuales.map((p) => (p.id === productoGuardado.id ? productoGuardado : p))
      );
      setProductoEditar(null);
      mostrarToast("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      setProductoEditar(null);
      mostrarToast("Error al actualizar producto en el backend");
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await api.delete(`/productos/${id}`);
      setProductos((actuales) => actuales.filter((p) => p.id !== id));
      mostrarToast("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      mostrarToast("Error al eliminar producto en el backend");
    }
  };

  const agregarAlCarrito = async (producto) => {
    if (!usuario) {
      mostrarToast("Debes iniciar sesion para agregar al carrito");
      return;
    }

    try {
      const responseCarritos = await api.get("/carritos");
      let carrito = responseCarritos.data.find(
        (c) => c.id_usuario === usuario.id && c.estado === "activo"
      );

      if (!carrito) {
        const nuevoCarrito = {
          total: 0,
          estado: "activo",
          fecha_creacion: new Date(),
          id_usuario: usuario.id,
        };
        const responseNuevo = await api.post("/carritos", nuevoCarrito);
        carrito = responseNuevo.data;
      }

      const detalle = {
        precio_unitario: parseFloat(producto.precio),
        cantidad: 1,
        id_carrito: parseInt(carrito.id, 10),
        id_producto: parseInt(producto.id, 10),
      };

      await api.post("/carrito-detalle", detalle);

      if (onCarritoActualizado) {
        onCarritoActualizado();
      }

      mostrarToast("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error.response || error);
      mostrarToast("Error: " + (error.response?.data?.message || error.message));
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
        crearProducto={crearProducto}
      />

      <h1 className="titulo-tienda">TIENDA CHAMPIONS STORE</h1>

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

              <button className="btn-comprar" onClick={() => agregarAlCarrito(producto)}>
                Anadir al carrito
              </button>

              {usuario && usuario.rol === "admin" && (
                <>
                  <button className="btn-editar" onClick={() => editarProducto(producto)}>
                    Editar
                  </button>

                  <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
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
