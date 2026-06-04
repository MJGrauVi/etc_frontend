# ETC - Frontend

Aplicación SPA desarrollada con React, Vite y Tailwind CSS para consumir la API de ETC.

El backend está en un repositorio independiente:

```text
https://github.com/MJGrauVi/etc
```

## Requisitos

- Git.
- Node.js.
- npm.
- Backend arrancado y accesible.

## Puesta en marcha en local

1. Clonar el repositorio:

```bash
git clone https://github.com/MJGrauVi/etc_frontend.git
cd etc_frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear el archivo de entorno:

```bash
cp .env.example .env
```

4. Configurar la URL de la API local:

```env
VITE_API_URL=http://localhost:8095/api
```

5. Arrancar el servidor de desarrollo:

```bash
npm run dev
```

6. Abrir la URL que indique Vite, normalmente:

```text
http://localhost:5173
```

Si el puerto `5173` esta ocupado, Vite puede usar otro puerto, por ejemplo `5174`. En ese caso, el backend debe permitir ese origen en `config/cors.php`.

## Conexión con el backend

El frontend no tiene las credenciales de Gemini, ni Facebook. Solo consume la API Laravel mediante:

```env
VITE_API_URL=http://localhost:8095/api
```

En Codespaces debe apuntar a la URL pública del backend:

```env
VITE_API_URL=https://tu-codespace-8095.app.github.dev/api
```

## Scripts disponibles

Arrancar en desarrollo:

```bash
npm run dev
```

Generar versión de producción:


## Despliegue/Demo en gitHub Codespaces

Codespaces se usa como entorno remoto de demostración para la presentación.

1. Abrir el repositorio frontend en Codespaces.

2. Crear o revisar `.env`:

```env
VITE_API_URL=https://tu-codespace-8095.app.github.dev/api
```

3. Arrancar Vite permitiendo acceso externo:

```bash
npm run dev -- --host 0.0.0.0
```

5. Hacer público el puerto del frontend, normalmente `5173`.
6. Abrir la URL pública del puerto `5173`.

Ejemplo:

```text
https://tu-codespace-5173.app.github.dev
```

## Flujo de uso básico

1. Iniciar sesión con un usuario de prueba.
2. Acceder a `Mis piezas`.
3. Crear o editar una pieza.
4. Subir una imagen.
5. Crear una publicación manual o generarla con IA.
6. Revisar título, contenido y hashtags.
7. Cambiar el estado a `Lista para publicar`.
8. Guardar los cambios.
9. Publicar en Facebook si el backend tiene configuradas las credenciales.

## Credenciales De Prueba


```text
Administrador: admin@admin.com
Administrador ETC: etc-apps@proton.me
Usuario: titufas@gmail.com
Usuario: usuatio@usuario.com
Contrasena: ******
```

## Notas

- La sesión se gestiona con token Bearer devuelto por el backend.
- La comunicación HTTP se centraliza en la capa de servicios y hooks.
- `useDatos` gestiona llamadas, estado de carga y errores.
- Las imágenes se cargan desde el backend mediante las URLs que devuelve la API.
- Para que las imágenes funcionen en Codespaces, el backend debe tener `APP_URL` configurado con la URL pública HTTPS del puerto `8095`.
