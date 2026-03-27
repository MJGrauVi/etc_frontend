import React, { useState } from 'react';

const GeneradorPublicacion = ({ piezaId, onContenidoGenerado }) => {
    const [loading, setLoading] = useState(false);
    const [estilo, setEstilo] = useState('profesional');

    const manejarGenerarIA = async () => {
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost/api/publicaciones/generar-ia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    // Si usas Sanctum/Breeze, añade el token aquí:
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    pieza_id: piezaId,
                    estilo: estilo
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Pasamos el texto generado al componente padre (el formulario)
                onContenidoGenerado(data.contenido);
            } else {
                alert("Error de la IA: " + (data.error || "Algo salió mal"));
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded shadow-sm bg-light">
            <label className="form-label">Estilo de la publicación:</label>
            <select 
                className="form-select mb-3" 
                value={estilo} 
                onChange={(e) => setEstilo(e.target.value)}
                disabled={loading}
            >
                <option value="profesional">Profesional</option>
                <option value="creativo">Creativo / Artístico</option>
                <option value="minimalista">Minimalista</option>
                <option value="divertido">Divertido con Emojis</option>
            </select>

            <button 
                onClick={manejarGenerarIA} 
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Analizando pieza con IA...
                    </>
                ) : (
                    "✨ Generar descripción con IA"
                )}
            </button>
            
            {loading && (
                <p className="text-muted small mt-2 text-center">
                    Esto puede tardar unos 30 segundos. Estamos procesando la imagen localmente.
                </p>
            )}
        </div>
    );
};

export default GeneradorPublicacion;