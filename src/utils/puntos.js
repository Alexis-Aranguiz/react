// calcula el costo real en puntos considerando descuento
export function puntosConDescuento(prod) {
  const base = prod.puntosBase;
  const d = prod.descuentoPct || 0;
  if (!d) return base;
  return Math.round(base * (1 - d / 100));
}

// calcula el total de puntos necesarios para canjear el carrito completo
// carrito: [{ nombre: "Catan", cantidad: 2}, ...]
// productosBase: [{ nombre, puntosBase, descuentoPct }, ...]
export function totalPuntosCarrito(carrito, productosBase) {
  return carrito.reduce((acc, item) => {
    const prodInfo = productosBase.find((p) => p.nombre === item.nombre);
    if (!prodInfo) return acc;
    const costoUnit = puntosConDescuento(prodInfo);
    return acc + costoUnit * item.cantidad;
  }, 0);
}
