import { Link } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

const enlaceDesktop =
  "flex items-center h-full px-4 transition hover:bg-orange-50";
const enlaceMobile =
  "block w-full px-4 py-2 transition hover:bg-orange-50";

const Menu = ({ mobile = false, onNavigate = () => {} }) => {

  const { usuario, cerrarSesion } = useContextoSesion();
  const textoPiezas = usuario?.rol === "Administrador" ? "Piezas" : "Mis piezas";
  
  if (mobile) {
    return (
      <ul className="px-6 pb-4 space-y-2 font-medium text-gray-700 bg-white shadow-inner md:hidden animate-fadeIn">
        <li className="w-full">
          <a
            href="mailto:etc-apps@proton.me"
            onClick={onNavigate}
            className={enlaceMobile}
          >
            Soporte
          </a>
        </li>

        {usuario?.rol === "Administrador" && (
          <li className="w-full">
            <Link to="/admin/usuarios" onClick={onNavigate} className={enlaceMobile}>
              Usuarios
            </Link>
          </li>
        )}

        {usuario && (
          <>
            <li className="w-full">
              <Link to="/pieza/nueva" onClick={onNavigate} className={enlaceMobile}>
                Nueva pieza
              </Link>
            </li>
            <li className="w-full">
              <Link to="/mis-piezas" onClick={onNavigate} className={enlaceMobile}>
                {textoPiezas}
              </Link>
            </li>
            <li className="w-full">
              <Link to="/publicaciones" onClick={onNavigate} className={enlaceMobile}>
                Publicaciones
              </Link>
            </li>
            <li className="w-full">
              <Link to="/mi-perfil" onClick={onNavigate} className={enlaceMobile}>
                Perfil
              </Link>
            </li>
            <li className="px-4 text-sm text-gray-500">
              {usuario.nombre}
            </li>
            <li className="w-full">
              <button
                type="button"
                onClick={() => {
                  cerrarSesion();
                  onNavigate();
                }}
                className="block w-full px-4 py-2 font-semibold text-center text-white transition bg-orange-500 hover:bg-orange-600"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )}

        {!usuario && (
          <>
            <li className="w-full">
              <Link to="/login" onClick={onNavigate} className={enlaceMobile}>
                Iniciar sesión
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/login"
                state={{ mostrarRegistro: true }}
                onClick={onNavigate}
                className="block w-full px-4 py-2 font-semibold text-center text-white transition bg-orange-500 hover:bg-orange-600"
              >
                Prueba gratis
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  }

  return (
    <ul className="items-center hidden h-full font-medium text-gray-700 md:flex">
      {usuario?.rol === "Administrador" && (
        <li className="flex items-center h-full">
          <Link to="/admin/usuarios" className={enlaceDesktop}>
            Usuarios
          </Link>
        </li>
      )}

      {usuario && (
        <>
          <li className="flex items-center h-full">
            <Link to="/pieza/nueva" className={enlaceDesktop}>
              Nueva pieza
            </Link>
          </li>
          <li className="flex items-center h-full">
            <Link to="/mis-piezas" className={enlaceDesktop}>
              {textoPiezas}
            </Link>
          </li>
          <li className="flex items-center h-full">
            <Link to="/publicaciones" className={enlaceDesktop}>
              Publicaciones
            </Link>
          </li>
          <li className="relative h-full">
            <Link
              to="/mi-perfil"
              aria-label="Ir a mi perfil"
              className="flex items-center h-full px-4 transition group hover:bg-orange-50"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="block w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 13.25c3.1 0 5.5-2.52 5.5-5.75S15.1 1.75 12 1.75 6.5 4.27 6.5 7.5s2.4 5.75 5.5 5.75zm0 2c-4.05 0-7.5 2.48-7.5 5.5v1.5h15v-1.5c0-3.02-3.45-5.5-7.5-5.5z"
                  />
                </svg>
              </div>
              <span className="absolute z-50 px-2 py-1 text-xs text-gray-600 transition-opacity -translate-x-1/2 rounded shadow-sm opacity-0 pointer-events-none bg-gray-50 left-1/2 top-full group-hover:opacity-100 whitespace-nowrap">
                Perfil
              </span>
            </Link>
          </li>
          <li className="flex items-center h-full px-4 text-sm text-gray-500">
            {usuario.nombre}
          </li>
          <li className="flex items-center h-full">
            <button
              type="button"
              onClick={cerrarSesion}
              className="flex items-center h-full px-5 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
            >
              Cerrar sesión
            </button>
          </li>
        </>
      )}

      {!usuario && (
        <>
          <li className="flex items-center h-full">
            <Link to="/login" className={enlaceDesktop}>
              Iniciar sesión
            </Link>
          </li>
          <li className="flex items-center h-full">
            <Link
              to="/login"
              state={{ mostrarRegistro: true }}
              className="flex items-center h-full px-5 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
            >
              Prueba gratis
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Menu;
