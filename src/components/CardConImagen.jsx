import React from 'react';
import { PiggyBank, BadgeCheck, ShieldCheck, Clock } from "lucide-react";

const ICONOS = {
  ahorro: PiggyBank,
  garantia: BadgeCheck,
  seguridad: ShieldCheck,
  facilidad: Clock,
};

const CardConImagen = ({ titulo, descripcion, icono, imagen }) => {
  const Icon = ICONOS[icono];

  return (
    <article className="relative overflow-hidden text-white transition duration-300 bg-gray-900 border border-gray-200 shadow-sm group min-h-80 md:min-h-96 hover:shadow-xl">
      <img
        src={imagen}
        alt=""
        className="absolute inset-0 object-cover w-full h-full transition duration-500 group-hover:scale-105"
      />
      {/*  Capa oscura */}
      <div className="absolute inset-0 transition duration-300 bg-black/40 group-hover:bg-black/55" />
      {/*  DegRadado */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-left">
        <div className="flex items-center justify-center w-12 h-12 mb-4 text-orange-600 shadow-sm bg-white/90">
          {Icon && <Icon size={30} strokeWidth={2} />}
        </div>

        <h3 className="text-2xl font-semibold text-white">{titulo}</h3>
        <p className="mt-3 text-lg leading-relaxed text-gray-100">
          {descripcion}
        </p>
      </div>
    </article>
  );
};

export default CardConImagen;
