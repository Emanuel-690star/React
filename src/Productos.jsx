import "./Productos.css";
import { useEffect, useState } from "react";
import api from "./services/Api";
import RegistrarProductos from "./RegistrarProductos";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {

    const obtenerProductos = async () => {
      try {

        const response = await api.get("/products/category/men's clothing");

        if (Array.isArray(response.data)) {
          setProductos(response.data);
        }

      } catch (error) {
        console.error("Error al obtener productos:", error);
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
      // Intentar actualizar en la API (aunque FakeStore no lo soporte)
      await api.put(`/products/${productoActualizado.id}`, productoActualizado);

      // Actualizar localmente
      const nuevosProductos = productos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      );

      setProductos(nuevosProductos);

      console.log("Producto actualizado:", productoActualizado);

      setProductoEditar(null);

      // Mostrar toast
      setToast("Producto actualizado correctamente");
      setTimeout(() => setToast(""), 3000);

    } catch (error) {
      console.error("Error al actualizar producto:", error);
      // Aun así actualizar localmente
      const nuevosProductos = productos.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      );

      setProductos(nuevosProductos);
      setProductoEditar(null);
      setToast("Producto actualizado localmente (API no soporta actualización)");
      setTimeout(() => setToast(""), 3000);
    }
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {

    try {
      // Intentar eliminar en la API
      await api.delete(`/products/${id}`);

      // Eliminar localmente
      const nuevos = productos.filter((p) => p.id !== id);
      setProductos(nuevos);

      console.log("Producto eliminado:", id);

      setToast("Producto eliminado correctamente");
      setTimeout(() => setToast(""), 3000);

    } catch (error) {
      console.error("Error al eliminar producto:", error);
      // Eliminar localmente de todos modos
      const nuevos = productos.filter((p) => p.id !== id);
      setProductos(nuevos);
      setToast("Producto eliminado localmente (API no soporta eliminación)");
      setTimeout(() => setToast(""), 3000);
    }
  };

  if (cargando) return <p className="loading">Cargando tienda Champions...</p>;

  return (
    <div className="ProductosDiv">

      {toast && <div className="toast">{toast}</div>}

      <RegistrarProductos
        productoEditar={productoEditar}
        guardarCambios={guardarCambios}
      />

      <h1 className="titulo-tienda">TIENDA CHAMPIONS STORE ⚽</h1>

      <div className="productos-grid">

        {productos.map((producto) => (
          <div className="producto-card" key={producto.id}>

            <img src={producto.image} alt={producto.title} />

            <div className="producto-info">

              <h3>Jersey Elite Edition</h3>

              <p className="precio">$ {producto.price} MXN</p>

              <button className="btn-comprar">
                Añadir al carrito 🛒
              </button>

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

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Productos;