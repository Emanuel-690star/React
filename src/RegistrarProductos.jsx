import "./RegistrarProductos.css";

function RegistrarProductos() {
    return (
        <div className="registro-productos">
        <h3 className="registro-productos__titulo">Registrar Productos</h3>
        <form className="registro-productos__form">
            <label>Titulo:</label>
            <input type="text" name="titulo" />
            <label>Precio:</label>
            <input type="number" name="price" />
            <label>Descripcion:</label>
            <input type="text" name="description" />
            <label>Categoria:</label>
            <input type="text" name="category" />
            <label>Imagen:</label>
            <input type="text" name="imagen" />
            <button type="submit">Registrar</button>
        </form>
        </div>
    );
}

export default RegistrarProductos;