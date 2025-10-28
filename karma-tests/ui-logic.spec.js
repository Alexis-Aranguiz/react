describe("Reglas de canje y validación de puntos del usuario", function () {
  const H = window.LevelUpTestHelpers;

  it("bloquea el canje si el usuario no tiene puntos suficientes", function () {
    // simulamos el estado que tendría el componente ProductosDescuento
    const puntosDelUsuario = 100; // usuario pobre
    const productosBase = [
      { nombre: "HyperX Cloud II", puntosBase: 800, descuentoPct: 20 } 
      // descuento 20% → 800 * 0.8 = 640
    ];
    const carrito = [
      { nombre: "HyperX Cloud II", cantidad: 1 },
    ];

    const costoTotal = H.totalPuntosCarrito(carrito, productosBase);
    // costoTotal debería ser 640
    expect(costoTotal).toBe(640);

    // regla de negocio: ¿puede canjear?
    const puedeCanjear = puntosDelUsuario >= costoTotal;

    expect(puedeCanjear).toBeFalse(); // debería bloquear
  });

  it("permite el canje y calcula puntos restantes correctamente", function () {
    // usuario con bastantes puntos
    let puntosDelUsuario = 2000;

    const productosBase = [
      { nombre: "Catan", puntosBase: 300, descuentoPct: 0 },        // 300
      { nombre: "Carcassonne", puntosBase: 220, descuentoPct: 10 }, // 198
    ];

    const carrito = [
      { nombre: "Catan", cantidad: 2 },        // 300 * 2 = 600
      { nombre: "Carcassonne", cantidad: 1 },  // 198 * 1 = 198
    ];

    const costoTotal = H.totalPuntosCarrito(carrito, productosBase);
    // 600 + 198 = 798
    expect(costoTotal).toBe(798);

    // regla de negocio del componente:
    const puedeCanjear = puntosDelUsuario >= costoTotal;
    expect(puedeCanjear).toBeTrue(); // sí debería poder

    // simulamos lo que hace tu canjearCarrito():
    if (puedeCanjear) {
      puntosDelUsuario = puntosDelUsuario - costoTotal;
    }

    expect(puntosDelUsuario).toBe(2000 - 798); // 1202
  });
});
