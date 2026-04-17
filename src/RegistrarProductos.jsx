import { useState, useEffect } from "react";

function RegistrarProductos({ usuario, productoEditar, guardarCambios }) {

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
    }
  }, [productoEditar]);

  const guardarProducto = (e) => {
    e.preventDefault();

    const productoActualizado = {
      ...productoEditar,
      nombre,
      precio,
      direccion,
      stock,
      imagen,
      id_categoria: idCategoria,
    };

    guardarCambios(productoActualizado);
  };

  return (
    <>
      {usuario && (
        <div className="registro-container">

          <h2 className="titulo-registro">Registro de Productos</h2>

          <form className="tabla-formulario" onSubmit={guardarProducto}>

            <div className="fila">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="fila">
              <label>Precio</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div className="fila">
          <label>Dirección / Descripción</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className="fila">
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
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
          <label>ID Categoría</label>
          <input
            type="number"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
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