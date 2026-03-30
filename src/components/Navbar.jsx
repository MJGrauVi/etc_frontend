import { useState } from "react";
import logo from "../public/assets/LogoEtc.svg";

const Navbar = () => {
    //Estado para manejar el menu hamburguesa.
  const [open, setOpen] = useState(false);

return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo ETC" className="w-auto h-10" />
        </div>

        {/* Menu desktop */}
        <ul className="items-center hidden gap-8 font-medium text-gray-700 md:flex">
          <li className="transition cursor-pointer hover:text-brand-primary">
            Soporte
          </li>
          <li className="transition cursor-pointer hover:text-brand-primary">
            Usuarios
          </li>
          <li>
            <button className="px-5 py-2 font-semibold text-white transition bg-orange-500 rounded-lg shadow-sm hover:bg-brand-primaryDark">
              Prueba gratis
            </button>
          </li>
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
          <li className="transition cursor-pointer hover:text-brand-primary">
            Soporte
          </li>
          <li className="transition cursor-pointer hover:text-brand-primary">
            Usuarios
          </li>
          <li>
            <button className="w-full px-4 py-2 font-semibold text-white transition rounded-lg shadow-sm bg-brand-primary hover:bg-brand-primaryDark">
              Prueba gratis
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default Navbar;
