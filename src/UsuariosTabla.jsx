import './Usuario.css';
import { useEffect, useState } from 'react';
import api from './services/api';
import RegistrarUsuarios from './RegistrarUsuarios';

function Usuario() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditado, setUsuarioEditado] = useState(null);

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
            } else {
                await api.post('/users', usuarioNuevo);
            }

            setUsuarioEditado(null);
            obtenerUsuarios();

        } catch (error) {
            console.error("Error guardando usuario", error);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            obtenerUsuarios();
        } catch (error) {
            console.error("Error eliminando", error);
        }
    };

    return (
        <div className="usuarios">

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
                            <td>{usuario.name.firstname}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.username}</td>

                            <td>
                                <button
                                    onClick={() => setUsuarioEditado(usuario)}
                                >
                                    Editar
                                </button>
                            </td>

                            <td>
                                <button
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