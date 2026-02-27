import './Usuario.css';
import { useEffect, useState } from 'react';
import api from './services/Api';

function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try{
                const response = await api.get('/users');
                setUsuarios(response.data);
            }catch(error){
                console.error('error al obtener usuarios', error);
            }finally{
                setCargando(false);
            }
        };
        obtenerUsuarios();
    },[]);

    if(cargando) return <p>Cargando usuarios.......</p>;

    return (
        <div className="usuarios">
            <h1>Usuarios Registrados</h1>
            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
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
                            <td>{usuario.name.lastname}</td>
                            <td>{usuario.address.street} {usuario.address.number} {usuario.address.city} {usuario.address.zipcode}</td>
                            <td>{usuario.phone}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.username}</td>
                            <td><button className="editar">Editar</button></td>
                            <td><button className="eliminar">Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Usuario;