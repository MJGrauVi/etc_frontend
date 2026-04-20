import { PiggyBank, BadgeCheck, ShieldCheck, Clock, Plus, Store, Share2 } from "lucide-react";

const ICONOS = {
  ahorro:     (size) => <PiggyBank   size={size} strokeWidth={2} />,
  garantia:   (size) => <BadgeCheck  size={size} strokeWidth={2} />,
  seguridad:  (size) => <ShieldCheck size={size} strokeWidth={2} />,
  facilidad:  (size) => <Clock       size={size} strokeWidth={2} />,
  facil:      (size) => <Plus        size={size} strokeWidth={2} />,
  escaparate: (size) => <Store       size={size} strokeWidth={2} />,
  redes:      (size) => <Share2      size={size} strokeWidth={2} />,
};
const VARIANTS = {
  beneficios: { card: "beneficios-card", circle: "icon-circle", iconSize: 36 },
  caracteristicas: { card: "caracteristicas-card", circle: "icon-circle", iconSize: 32 },
};

export default function Card({ titulo, descripcion, icono, variant = "benefit" }) {
  const v = VARIANTS[variant];

  return (
    <article className={v.card}>
      <div className={`text-orange-600 bg-orange-100 ${v.circle}`}>
        {ICONOS[icono](v.iconSize)}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
        {titulo}
      </h3>
      <p className="mt-3 text-center text-gray-600">{descripcion}</p>
    </article>
  );
}