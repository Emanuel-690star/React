import { useState, useEffect } from "react";

function RegistrarProductos({ usuario, productoEditar, guardarCambios, crearProducto }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre || "");
      setPrecio(productoEditar.precio || "");
      setDireccion(productoEditar.direccion || "");
      setStock(productoEditar.stock || "");
      setImagen(productoEditar.imagen || "");
      setIdCategoria(productoEditar.id_categoria || "");
      return;
    }

    limpiarFormulario();
  }, [productoEditar]);

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setDireccion("");
    setStock("");
    setImagen("");
    setIdCategoria("");
  };

  const guardarProducto = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      precio,
      direccion,
      stock,
      imagen,
      id_categoria: idCategoria,
    };

    if (productoEditar) {
      await guardarCambios({
        ...productoEditar,
        ...payload,
      });
      return;
    }

    await crearProducto(payload);
    limpiarFormulario();
  };

  return (
    <>
      {usuario && usuario.rol === "admin" && (
        <div className="registro-container">
          <h2 className="titulo-registro">Registro de Productos</h2>

          <form className="tabla-formulario" onSubmit={guardarProducto}>
            <div className="fila">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="fila">
              <label>Precio</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>

            <div className="fila">
              <label>Direccion / Descripcion</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <div className="fila">
              <label>Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className="fila">
              <label>Imagen URL</label>
              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>

            <div className="fila">
              <label>ID Categoria</label>
              <input
                type="number"
                min="1"
                value={idCategoria}
                onChange={(e) => setIdCategoria(e.target.value)}
                required
              />
            </div>

            <button className="btn-guardar" type="submit">
              {productoEditar ? "Actualizar" : "Guardar Producto"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default RegistrarProductos;
