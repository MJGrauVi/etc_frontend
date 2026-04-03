import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../public/assets/LogoEtc.svg";
import useContextoSesion from "../hooks/useContextoSesion.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { usuario, cerrarSesion } = useContextoSesion();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo ETC" className="w-auto h-10" />
          </Link>
        </div>

        {/* Menu desktop */}
        <ul className="items-center hidden gap-8 font-medium text-gray-700 md:flex">
          <li className="transition cursor-pointer hover:text-orange-500">
            Soporte
          </li>

          {usuario?.rol === "Administrador" && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/admin/usuarios">Usuarios</Link>
            </li>
          )}

          {/* 👇 Nueva pieza dentro del ul como li */}
          {usuario && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/pieza/nueva">Nueva pieza</Link>
            </li>
          )}
          {/* Mis piezas — desktop */}
          {usuario && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/mis-piezas">Mis piezas</Link>
            </li>
          )}
          {usuario ? (
            <>
              <li className="text-sm text-gray-500">Hola, {usuario.nombre}</li>
              <li>
                <button
                  onClick={cerrarSesion}
                  className="px-5 py-2 font-semibold text-orange-500 transition border border-orange-300 rounded-lg hover:bg-orange-50"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="transition hover:text-orange-500">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <button className="px-5 py-2 font-semibold text-white transition bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600">
                  Prueba gratis
                </button>
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
        <ul className="px-6 pb-4 space-y-4 font-medium text-gray-700 bg-white shadow-inner md:hidden animate-fadeIn">
          <li className="transition cursor-pointer hover:text-orange-500">
            Soporte
          </li>

          {usuario?.rol === "Administrador" && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/admin/usuarios" onClick={() => setOpen(false)}>
                Usuarios
              </Link>
            </li>
          )}

          {/* 👇 Nueva pieza en móvil */}
          {usuario && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/pieza/nueva" onClick={() => setOpen(false)}>
                Nueva pieza
              </Link>
            </li>
          )}
          {/* Mis piezas — móvil */}
          {usuario && (
            <li className="transition cursor-pointer hover:text-orange-500">
              <Link to="/mis-piezas" onClick={() => setOpen(false)}>
                Mis piezas
              </Link>
            </li>
          )}

          {usuario ? (
            <>
              <li className="text-sm text-gray-500">Hola, {usuario.nombre}</li>
              <li>
                <button
                  onClick={() => {
                    cerrarSesion();
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 font-semibold text-orange-500 transition border border-orange-300 rounded-lg hover:bg-orange-50"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="transition hover:text-orange-500"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <button className="w-full px-4 py-2 font-semibold text-white transition bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600">
                  Prueba gratis
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
