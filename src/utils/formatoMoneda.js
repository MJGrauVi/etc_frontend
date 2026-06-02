export const formatoEuro = (valor) => {
  if (valor === null || valor === undefined || valor === "") {
    return "Sin precio";
  }

  const numero = Number(valor);

  if (Number.isNaN(numero)) {
    return "Sin precio";
  }

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(numero);
};
