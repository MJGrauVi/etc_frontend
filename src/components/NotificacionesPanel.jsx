import React, { useEffect, useState } from 'react';

const NotificacionesPanel = () => {
    const [alertas, setAlertas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const token = localStorage.getItem('token'); // Asumiendo que guardas el token aquí

    useEffect(() => {
        // 1. Realizamos la petición
        fetch('http://localhost:8000/api/notificaciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta del servidor');
            return response.json();
        })
        .then(res => {
            // Laravel devuelve las notificaciones dentro de res.data
            setAlertas(res.data);
            setCargando(false);
        })
        .catch(error => {
            console.error("Hubo un problema con la petición fetch:", error);
            setCargando(false);
        });
    }, [token]);

    if (cargando) return <p>Cargando avisos...</p>;

    return (
        <div className="alertas-dropdown">
            <h3>Notificaciones ({alertas.length})</h3>
            <hr />
            {alertas.length === 0 ? (
                <p>No tienes alertas de vencimiento.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {alertas.map((notif) => (
                        <li key={notif.id} className="alerta-card">
                            {/* RECUERDA: Los datos que inventamos están en el campo 'data' */}
                            <strong>{notif.data.titulo_pieza}</strong>
                            <p>{notif.data.mensaje}</p>
                            <small>Fecha: {notif.data.fecha_vencimiento}</small>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificacionesPanel;