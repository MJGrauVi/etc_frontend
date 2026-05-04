import { useState } from "react";
import { Link } from "react-router-dom";
import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { usuario, cerrarSesion } = useContextoSesion();

  return (
    
    <nav className="fixed top-0 left-0 z-50 w-full text-lg bg-white">
      <div className="flex items-center justify-between px-16 mx-auto h-22 max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex items-center p-1"><LogoEtcTail className="etc" /></span>
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              Etc Apps
            </span>
          </Link>
        </div>

        {/* Menu desktop */}
        <ul className="items-center hidden h-full font-medium text-gray-700 md:flex">
          {usuario?.rol === "Administrador" && (
            <li className="flex items-center h-full">
              <Link
                to="/admin/usuarios"
                className="flex items-center h-full px-4 transition hover:bg-orange-50"
              >
                Usuarios
              </Link>
            </li>
          )}

          {usuario && (
            <li className="flex items-center h-full">
              <Link
                to="/pieza/nueva"
                className="flex items-center h-full px-4 transition hover:bg-orange-50"
              >
                Nueva pieza
              </Link>
            </li>
          )}

          {usuario && (
            <li className="flex items-center h-full">
              <Link
                to="/mis-piezas"
                className="flex items-center h-full px-4 transition hover:bg-orange-50"
              >
                Mis piezas
              </Link>
            </li>
          )}
          {/* perfil */}
          {usuario && (
            <li className="relative h-full">
              <Link
                to="/mi-perfil"
                className="flex items-center h-full px-4 transition group hover:bg-orange-50"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="block w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 13.25c3.1 0 5.5-2.52 5.5-5.75S15.1 1.75 12 1.75 6.5 4.27 6.5 7.5s2.4 5.75 5.5 5.75zm0 2c-4.05 0-7.5 2.48-7.5 5.5v1.5h15v-1.5c0-3.02-3.45-5.5-7.5-5.5z"
                    />
                  </svg>
                </div>
                {/* Tooltip */}
                <span className="absolute px-2 py-1 text-xs text-gray-500 transition-opacity -translate-x-1/2 rounded opacity-0 bg-gray-50 left-1/2 -bottom-8 group-hover:opacity-100 whitespace-nowrap">
                  Perfil
                </span>
              </Link>
            </li>
          )}

          {usuario ? (
            <>
              <li className="flex items-center h-full px-4 text-sm text-gray-500">
                Hola, {usuario.nombre}
              </li>

              <li className="flex items-center h-full">
                <button
                  onClick={cerrarSesion}
                  className="flex items-center h-full px-5 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center h-full">
                <Link
                  to="/login"
                  className="flex items-center h-full px-4 transition hover:bg-orange-50"
                >
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

        {/* Botón hamburguesa móvil */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu móvil */}
      {open && (
        <ul className="px-6 pb-4 space-y-2 font-medium text-gray-700 bg-white shadow-inner md:hidden animate-fadeIn">
          {/* Enlaces normales */}
          <li className="w-full">
            <a
              href="mailto:etc-apps@proton.me"
              onClick={() => setOpen(false)}
              className="block w-full px-4 py-2 transition hover:bg-orange-50"
            >
              Soporte
            </a>
          </li>

          {usuario?.rol === "Administrador" && (
            <li className="w-full">
              <Link
                to="/admin/usuarios"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-2 transition hover:bg-orange-50"
              >
                Usuarios
              </Link>
            </li>
          )}

          {usuario && (
            <li className="w-full">
              <Link
                to="/pieza/nueva"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-2 transition hover:bg-orange-50"
              >
                Nueva pieza
              </Link>
            </li>
          )}

          {usuario && (
            <li className="w-full">
              <Link
                to="/mis-piezas"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-2 transition hover:bg-orange-50"
              >
                Mis piezas
              </Link>
            </li>
          )}

          {/* Si hay usuario */}
          {usuario ? (
            <>
              <li className="px-4 text-sm text-gray-500">
                Hola, {usuario.nombre}
              </li>

              <li className="w-full">
                <button
                  onClick={() => {
                    cerrarSesion();
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2 font-semibold text-center text-white transition bg-orange-500 hover:bg-orange-600"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Iniciar sesión */}
              <li className="w-full">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full px-4 py-2 transition hover:bg-orange-50"
                >
                  Iniciar sesión
                </Link>
              </li>

              {/* Prueba gratis */}
              <li className="w-full">
                <Link
                  to="/login"
                  state={{ mostrarRegistro: true }}
                  onClick={() => setOpen(false)}
                  className="block w-full px-4 py-2 font-semibold text-center text-white transition bg-orange-500 hover:bg-orange-600"
                >
                  Prueba gratis
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
   
  );
};

export default Navbar;
