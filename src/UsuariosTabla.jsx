import './Usuario.css';
import { useEffect, useState } from 'react';
import api from './services/Api';
import RegistrarUsuarios from './RegistrarUsuarios';

function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [toast, setToast] = useState("");

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const response = await api.get('/users');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios", error);
        }
    };

    // 🔥 Aquí recibimos el usuarioNuevo desde el hijo
    const manejarUsuarioNuevo = async (usuarioNuevo) => {
        try {
            if (usuarioEditado) {
                await api.put(`/users/${usuarioEditado.id}`, usuarioNuevo);
                setToast("Usuario actualizado correctamente");
            } else {
                await api.post('/users', usuarioNuevo);
                setToast("Usuario registrado correctamente");
            }
            setUsuarioEditado(null);
            obtenerUsuarios();

        } catch (error) {
            console.error("Error guardando usuario", error);
            // actualizar localmente de todas formas
            if (usuarioEditado) {
                const nuevos = usuarios.map((u) =>
                    u.id === usuarioEditado.id ? { ...u, ...usuarioNuevo } : u
                );
                setUsuarios(nuevos);
                setToast("Usuario actualizado localmente (API falla)");
            } else {
                const fake = { id: Date.now(), ...usuarioNuevo };
                setUsuarios([fake, ...usuarios]);
                setToast("Usuario agregado localmente (API falla)");
            }
            setUsuarioEditado(null);
        } finally {
            setTimeout(() => setToast(""), 3000);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setToast("Usuario eliminado correctamente");
            obtenerUsuarios();
        } catch (error) {
            console.error("Error eliminando", error);
            const nuevos = usuarios.filter((u) => u.id !== id);
            setUsuarios(nuevos);
            setToast("Usuario eliminado localmente (API falla)");
        } finally {
            setTimeout(() => setToast(""), 3000);
        }
    };

    return (
        <div className="usuarios">

            {toast && <div className="toast">{toast}</div>}

            <RegistrarUsuarios
                usuarioEditado={usuarioEditado}
                usuarioNuevo={manejarUsuarioNuevo}
            />

            <h1>Usuarios Registrados</h1>

            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Username</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.name?.firstname || usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.username}</td>

                            <td>
                                <button
                                    className="btn editar"
                                    onClick={() => setUsuarioEditado(usuario)}
                                >
                                    Editar
                                </button>
                            </td>

                            <td>
                                <button
                                    className="btn eliminar"
                                    onClick={() => eliminarUsuario(usuario.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Usuario;