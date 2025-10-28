(function (global) {
  function puntosConDescuento(prod) {
    var base = prod.puntosBase;
    var d = prod.descuentoPct || 0;
    if (!d) return base;
    return Math.round(base * (1 - d / 100));
  }

  function totalPuntosCarrito(carrito, productosBase) {
    return carrito.reduce(function (acc, item) {
      var prodInfo = productosBase.find(function (p) {
        return p.nombre === item.nombre;
      });
      if (!prodInfo) return acc;
      var costoUnit = puntosConDescuento(prodInfo);
      return acc + costoUnit * item.cantidad;
    }, 0);
  }

  // Exponer las funciones en un namespace global para que Jasmine las pueda usar
  global.LevelUpTestHelpers = {
    puntosConDescuento: puntosConDescuento,
    totalPuntosCarrito: totalPuntosCarrito
  };
})(window);
