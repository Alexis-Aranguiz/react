describe("Lógica de puntos y canje (LevelUpTestHelpers)", function () {
  // Atajo local
  const H = window.LevelUpTestHelpers;

  it("calcula puntosConDescuento sin descuento", function () {
    const prod = { nombre: "Catan", puntosBase: 300, descuentoPct: 0 };
    const result = H.puntosConDescuento(prod);
    expect(result).toBe(300);
  });

  it("calcula puntosConDescuento con 10% de descuento (redondeo hacia entero más cercano)", function () {
    // 10% de 220 = 22 → 220 - 22 = 198 exacto
    const prod = { nombre: "Carcassonne", puntosBase: 220, descuentoPct: 10 };
    const result = H.puntosConDescuento(prod);
    expect(result).toBe(198);
  });

  it("calcula puntosConDescuento con 15% de descuento y redondea Math.round", function () {
    // 15% de 350 = 52.5 → 350 - 52.5 = 297.5 → Math.round(297.5) = 298
    const prod = { nombre: "Silla Gamer", puntosBase: 350, descuentoPct: 15 };
    const result = H.puntosConDescuento(prod);
    expect(result).toBe(298);
  });

  it("si descuentoPct no viene (undefined), asume 0 descuento", function () {
    const prod = { nombre: "PS5", puntosBase: 5500 }; // sin descuentoPct
    const result = H.puntosConDescuento(prod);
    expect(result).toBe(5500);
  });

  it("totalPuntosCarrito suma correctamente productos con descuento y cantidades distintas", function () {
    const productosBase = [
      { nombre: "Catan", puntosBase: 300, descuentoPct: 0 },      // 300
      { nombre: "Carcassonne", puntosBase: 220, descuentoPct: 10 } // 198
    ];

    const carrito = [
      { nombre: "Catan", cantidad: 2 },          // 300 * 2 = 600
      { nombre: "Carcassonne", cantidad: 1 }     // 198 * 1 = 198
    ];

    const total = H.totalPuntosCarrito(carrito, productosBase);
    // total esperado = 600 + 198 = 798
    expect(total).toBe(798);
  });

  it("totalPuntosCarrito ignora productos que NO están en productosBase", function () {
    const productosBase = [
      { nombre: "Catan", puntosBase: 300, descuentoPct: 0 },
    ];

    const carrito = [
      { nombre: "ProductoInventado", cantidad: 99 }, // no existe
    ];

    const total = H.totalPuntosCarrito(carrito, productosBase);
    expect(total).toBe(0);
  });

  it("totalPuntosCarrito maneja carrito vacío devolviendo 0", function () {
    const productosBase = [
      { nombre: "Catan", puntosBase: 300, descuentoPct: 0 },
    ];
    const carrito = []; // nadie ha elegido nada aún

    const total = H.totalPuntosCarrito(carrito, productosBase);
    expect(total).toBe(0);
  });

  it("totalPuntosCarrito soporta cantidades grandes sin perder exactitud", function () {
    const productosBase = [
      { nombre: "PS5", puntosBase: 5500, descuentoPct: 0 },
    ];

    const carrito = [
      { nombre: "PS5", cantidad: 10 }, // 10 consolas
    ];

    const total = H.totalPuntosCarrito(carrito, productosBase);
    // 5500 * 10 = 55000
    expect(total).toBe(55000);
  });
});
