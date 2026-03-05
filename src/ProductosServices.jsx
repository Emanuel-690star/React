import { useState, useEffect } from "react";

function RegistrarProductos({ productoEditar }) {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {

    if (productoEditar) {
      setNombre(productoEditar.title);
      setPrecio(productoEditar.price);
      setImagen(productoEditar.image);
    }

  }, [productoEditar]);

  const guardarProducto = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio,
      imagen
    };

    console.log("Producto guardado:", nuevoProducto);

    alert("Producto guardado correctamente ⚽");

    setNombre("");
    setPrecio("");
    setImagen("");
  };

  return (
    <div className="formulario-producto">

      <h2>Registrar / Editar Producto</h2>

      <form onSubmit={guardarProducto}>

        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button type="submit">
          Guardar producto
        </button>

      </form>

    </div>
  );
}

export default RegistrarProductos;