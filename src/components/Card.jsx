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

export default function Card({
  titulo,
  descripcion,
  icono,
  imagen,
  variant = "benefit",
}) {
  const v = VARIANTS[variant];

  if (variant === "beneficios" && imagen) {
    return (
      <article className="relative overflow-hidden text-white transition duration-300 bg-gray-900 border border-gray-200 shadow-sm group min-h- hover:-translate-y-1 hover:shadow-xl">
        <img
          src={imagen}
          alt=""
          role="presentation"
          className="absolute inset-0 object-cover w-full h-full transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 transition duration-300 bg-black/25 group-hover:bg-black/65" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full p-6 text-left min-h-">
          <div className="flex items-center justify-center w-12 h-12 mb-4 text-orange-600 shadow-sm bg-white/90">
            {ICONOS[icono](30)}
          </div>

          <h3 className="text-2xl font-semibold text-white">{titulo}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-100 transition duration-300 opacity-100 max-h-40 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
            {descripcion}
          </p>
        </div>
      </article>
    );
  }

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
