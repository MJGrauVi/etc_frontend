import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";
import Menu from "./Menu.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const cerrarMenuMovil = () => setOpen(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full text-lg bg-white">
      <div className="flex items-center justify-between px-16 mx-auto h-22 max-w-7xl">
        <div className="flex items-center gap-1 md:gap-1">
          <Link to="/"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}className="flex items-center gap-2">
            <span className="flex items-center p-1">
              <LogoEtcTail className="etc" />
            </span>
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              Etc Apps
            </span>
          </Link>
        </div>

        <Menu />

        <button
          type="button"
          className="text-gray-700 md:hidden"
          onClick={() => setOpen((abierto) => !abierto)}
          aria-label="Abrir menu"
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

      {open && (
        <Menu
          mobile
          onNavigate={cerrarMenuMovil}
        />
      )}
    </nav>
  );
};

export default Navbar;
