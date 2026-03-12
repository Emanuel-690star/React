import { useState, useEffect } from "react";

function RegistrarProductos({ usuario, productoEditar, guardarCambios }) {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {

    if (productoEditar) {
      setNombre(productoEditar.title || "");
      setPrecio(productoEditar.price || "");
      setDescripcion(productoEditar.description || "");
      setCategoria(productoEditar.category || "");
    }

  }, [productoEditar]);

  const guardarProducto = (e) => {

    e.preventDefault();

    const productoActualizado = {
      ...productoEditar,
      title: nombre,
      price: precio,
      description: descripcion,
      category: categoria
    };

    console.log("Producto actualizado:", productoActualizado);

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
              <label>Descripción</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="fila">
              <label>Categoría</label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>

            <button className="btn-guardar">
              Guardar Producto
            </button>

          </form>

        </div>
      )}
    </>
  );
}

export default RegistrarProductos;