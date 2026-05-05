const CANVAS_SIZE = 1080;

const cargarImagen = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("IMAGE_LOAD_ERROR"));
    img.src = src;
  });

const limpiarTexto = (texto = "") => texto.replace(/\s+/g, " ").trim();

const recortarTexto = (texto = "", max = 180) => {
  const limpio = limpiarTexto(texto);
  if (limpio.length <= max) return limpio;
  return `${limpio.slice(0, max).trim()}...`;
};

const dibujarTexto = (ctx, texto, x, y, maxWidth, lineHeight, maxLines) => {
  const palabras = limpiarTexto(texto).split(" ");
  const lineas = [];
  let linea = "";

  palabras.forEach((palabra) => {
    const prueba = linea ? `${linea} ${palabra}` : palabra;
    if (ctx.measureText(prueba).width > maxWidth && linea) {
      lineas.push(linea);
      linea = palabra;
    } else {
      linea = prueba;
    }
  });

  if (linea) lineas.push(linea);

  const visibles = lineas.slice(0, maxLines);
  visibles.forEach((textoLinea, index) => {
    const esUltimaCortada = index === maxLines - 1 && lineas.length > maxLines;
    ctx.fillText(esUltimaCortada ? `${textoLinea}...` : textoLinea, x, y + index * lineHeight);
  });

  return y + visibles.length * lineHeight;
};

const dibujarImagenCover = (ctx, img, x, y, width, height) => {
  const ratioDestino = width / height;
  const ratioImagen = img.width / img.height;

  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (ratioImagen > ratioDestino) {
    sw = img.height * ratioDestino;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / ratioDestino;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
};

const descargarDataUrl = (dataUrl, nombreArchivo) => {
  const enlace = document.createElement("a");
  enlace.href = dataUrl;
  enlace.download = nombreArchivo;
  enlace.click();
};

export const exportarPublicacionPng = async ({
  imagenUrl,
  titulo,
  contenido,
  hashtags,
  perfil,
  nombreArchivo = "publicacion-etc.png",
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (imagenUrl) {
    const imagen = await cargarImagen(imagenUrl);
    dibujarImagenCover(ctx, imagen, 0, 0, CANVAS_SIZE, 720);
  } else {
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(0, 0, CANVAS_SIZE, 720);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "600 44px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Sin imagen", CANVAS_SIZE / 2, 360);
    ctx.textAlign = "left";
  }

  const degradado = ctx.createLinearGradient(0, 420, 0, 720);
  degradado.addColorStop(0, "rgba(0, 0, 0, 0)");
  degradado.addColorStop(1, "rgba(0, 0, 0, 0.58)");
  ctx.fillStyle = degradado;
  ctx.fillRect(0, 420, CANVAS_SIZE, 300);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 720, CANVAS_SIZE, 360);

  ctx.fillStyle = "#f97316";
  ctx.fillRect(0, 720, 16, 360);

  ctx.fillStyle = "#111827";
  ctx.font = "700 58px Arial, sans-serif";
  const siguienteY = dibujarTexto(ctx, titulo, 72, 810, 900, 68, 2);

  ctx.fillStyle = "#4b5563";
  ctx.font = "400 32px Arial, sans-serif";
  const textoCorto = recortarTexto(contenido, 170);
  const hashtagsLimpios = recortarTexto(hashtags, 95);
  const yTrasContenido = dibujarTexto(ctx, textoCorto, 72, siguienteY + 28, 900, 42, 3);

  ctx.fillStyle = "#ea580c";
  ctx.font = "600 28px Arial, sans-serif";
  dibujarTexto(ctx, hashtagsLimpios, 72, yTrasContenido + 24, 900, 34, 1);

  ctx.fillStyle = "#111827";
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText(perfil?.nombre || "ETC Apps", 72, 1030);

  const contacto = [perfil?.movil, perfil?.web].filter(Boolean).join("  |  ");
  if (contacto) {
    ctx.fillStyle = "#6b7280";
    ctx.font = "400 24px Arial, sans-serif";
    ctx.fillText(contacto, 360, 1030);
  }

  const dataUrl = canvas.toDataURL("image/png");
  descargarDataUrl(dataUrl, nombreArchivo);
};
