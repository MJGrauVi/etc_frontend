import { useState } from "react";
import { Link } from "react-router-dom";

import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { usuario, cerrarSesion } = useContextoSesion();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-16 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-1">
          <Link to="/" className="flex items-center gap-2">
            <LogoEtcTail />
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              Etc Apps
            </span>
          </Link>
        </div>

        {/* Menu desktop */}
        <ul className="items-center hidden h-full gap-8 font-medium text-gray-700 md:flex">
          <li className="flex items-center h-full">
            <a
              href="mailto:etc-apps@proton.me"
              className="flex items-center h-full px-4 transition hover:bg-orange-50"
            >
              Soporte
            </a>
          </li>

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
