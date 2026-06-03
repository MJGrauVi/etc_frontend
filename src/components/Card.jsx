import {Plus, Store, Share2 } from "lucide-react";

const ICONOS = {
  facil: Plus,
  escaparate: Store,
  redes: Share2,
};

const Card = ({ titulo, descripcion, icono }) => {
  const Icon = ICONOS[icono];

  return (
    <article className="caracteristicas-card">
      <span className="absolute inset-x-0 top-0 h-1 bg-orange-500" />
      <div className="text-orange-600 border border-orange-200 shadow-sm bg-orange-100 icon-circle">
        {Icon && <Icon size={32} strokeWidth={2} />}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">{titulo}</h3>
      <p className="mt-3 text-gray-600">{descripcion}</p>
    </article>
  );
};

export default Card;
