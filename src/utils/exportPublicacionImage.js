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

const dibujarImagenContain = (ctx, img, x, y, width, height) => {
  const escala = Math.min(width / img.width, height / img.height);
  const drawWidth = img.width * escala;
  const drawHeight = img.height * escala;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
};

const dibujarLogo = (ctx, img, x, y, size) => {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = "#e5e7eb";
  ctx.strokeRect(x, y, size, size);
  dibujarImagenContain(ctx, img, x + 6, y + 6, size - 12, size - 12);
  ctx.restore();
};

const descargarBlob = (blob, nombreArchivo) => {
  const dataUrl = URL.createObjectURL(blob);
  const enlace = document.createElement("a");
  enlace.href = dataUrl;
  enlace.download = nombreArchivo;
  enlace.click();
  URL.revokeObjectURL(dataUrl);
};

const canvasToBlob = (canvas) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("CANVAS_BLOB_ERROR"));
      }
    }, "image/png");
  });

const crearCanvasPublicacion = async ({
  imagenUrl,
  imagenBlobUrl,
  titulo,
  contenido,
  hashtags,
  perfil,
}) => {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f9fafb";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const imagenCanvasUrl = imagenBlobUrl || imagenUrl;

  if (imagenCanvasUrl) {
    const imagen = await cargarImagen(imagenCanvasUrl);
    dibujarImagenContain(ctx, imagen, 0, 0, CANVAS_SIZE, 700);
  } else {
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(0, 0, CANVAS_SIZE, 700);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "600 44px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Sin imagen", CANVAS_SIZE / 2, 350);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 700, CANVAS_SIZE, 380);

  ctx.fillStyle = "#f97316";
  ctx.fillRect(0, 700, 16, 380);

  ctx.fillStyle = "#111827";
  ctx.font = "700 46px Arial, sans-serif";
  const siguienteY = dibujarTexto(ctx, titulo, 72, 770, 920, 54, 2);

  ctx.fillStyle = "#4b5563";
  ctx.font = "400 26px Arial, sans-serif";
  const textoCorto = recortarTexto(contenido, 125);
  const hashtagsLimpios = recortarTexto(hashtags, 75);
  const yTrasContenido = dibujarTexto(ctx, textoCorto, 72, siguienteY + 20, 920, 34, 2);

  ctx.fillStyle = "#ea580c";
  ctx.font = "600 24px Arial, sans-serif";
  dibujarTexto(ctx, hashtagsLimpios, 72, yTrasContenido + 18, 920, 30, 1);

  ctx.strokeStyle = "#f3f4f6";
  ctx.beginPath();
  ctx.moveTo(72, 980);
  ctx.lineTo(1000, 980);
  ctx.stroke();

  let logo = null;
  if (perfil?.logoUrl) {
    try {
      logo = await cargarImagen(perfil.logoUrl);
    } catch {
      logo = null;
    }
  }

  if (logo) {
    dibujarLogo(ctx, logo, 72, 1000, 56);
  } else {
    ctx.fillStyle = "#ffedd5";
    ctx.fillRect(72, 1000, 56, 56);
    ctx.strokeStyle = "#fed7aa";
    ctx.strokeRect(72, 1000, 56, 56);
    ctx.fillStyle = "#f97316";
    ctx.font = "700 26px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText((perfil?.nombre || "E").charAt(0).toUpperCase(), 100, 1037);
    ctx.textAlign = "left";
  }

  ctx.fillStyle = "#111827";
  ctx.font = "700 24px Arial, sans-serif";
  ctx.fillText(perfil?.nombre || "ETC Apps", 148, 1024);

  const contacto = [perfil?.movil, perfil?.web].filter(Boolean).join("  |  ");
  if (contacto) {
    ctx.fillStyle = "#6b7280";
    ctx.font = "400 20px Arial, sans-serif";
    ctx.fillText(contacto, 148, 1050);
  }

  return canvas;
};

export const crearPublicacionPngBlob = async (datosPublicacion) => {
  const canvas = await crearCanvasPublicacion(datosPublicacion);
  return canvasToBlob(canvas);
};

export const exportarPublicacionPng = async ({
  nombreArchivo = "publicacion-etc.png",
  ...datosPublicacion
}) => {
  const blob = await crearPublicacionPngBlob(datosPublicacion);
  descargarBlob(blob, nombreArchivo);
};
