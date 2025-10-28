import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";

export default function Productos() {
  // ----- DATA BASE de productos -----
  const productosBase = [
    {
      nombre: "PlayStation 5",
      precio: 650000,
      categoria: "consolas",
      img: "images/ps5.jpg",
      descripcion: "La nueva generación de consolas PlayStation.",
      descripcionLarga:
        "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
      reseñas: [
        { texto: "¡Increíble potencia!", estrellas: 5 },
        { texto: "La mejor consola de Sony.", estrellas: 5 },
      ],
    },
    {
      nombre: "Asus ROG Strix",
      precio: 1200000,
      categoria: "computadores-gamers",
      img: "images/asus-rog-strix.jpg",
      descripcion: "Notebook gamer de alto rendimiento.",
      descripcionLarga:
        "PC Gamer ASUS ROG Strix: un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
      reseñas: [
        { texto: "Perfecto para gaming y trabajo.", estrellas: 5 },
        { texto: "Excelente calidad de construcción.", estrellas: 4 },
      ],
    },
    {
      nombre: "Carcassonne",
      precio: 25000,
      categoria: "juegos-de-mesa",
      img: "images/carcassonne.png",
      descripcion: "Juego de mesa de estrategia y ciudades.",
      descripcionLarga:
        "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
      reseñas: [
        {
          texto: "Muy entretenido para toda la familia.",
          estrellas: 5,
        },
        { texto: "Fácil de aprender.", estrellas: 4 },
      ],
    },
    {
      nombre: "Catan",
      precio: 35000,
      categoria: "juegos-de-mesa",
      img: "images/catan.png",
      descripcion: "El clásico de estrategia y comercio.",
      descripcionLarga:
        "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
      reseñas: [
        { texto: "Ideal para jugar con amigos.", estrellas: 5 },
        { texto: "Nunca aburre.", estrellas: 4 },
      ],
    },
    {
      nombre: "HyperX Cloud II",
      precio: 69000,
      categoria: "accesorios",
      img: "images/hyperx-cloud2.jpg",
      descripcion: "Auriculares gamer con gran sonido.",
      descripcionLarga:
        "Auriculares Gamer HyperX Cloud II: proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
      reseñas: [
        { texto: "Sonido espectacular.", estrellas: 5 },
        {
          texto: "Muy cómodos para largas sesiones.",
          estrellas: 5,
        },
      ],
    },
    {
      nombre: "Logitech G502",
      precio: 45000,
      categoria: "mouse",
      img: "images/logitech-g502.jpg",
      descripcion: "Mouse gamer de alta precisión.",
      descripcionLarga:
        "Mouse Gamer Logitech G502 HERO: con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
      reseñas: [
        { texto: "Muy cómodo.", estrellas: 5 },
        { texto: "Excelente para shooters.", estrellas: 4 },
      ],
    },
    {
      nombre: "Polera Personalizada",
      precio: 18000,
      categoria: "poleras-personalizadas",
      img: "images/polera-personalizada.png",
      descripcion: "Personaliza tu polera con tu tag.",
      descripcionLarga:
        "Polera Gamer Personalizada 'Level-Up': una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
      reseñas: [
        { texto: "¡Me encantó el diseño!", estrellas: 5 },
        { texto: "Buena calidad.", estrellas: 4 },
      ],
    },
    {
      nombre: "Razer Goliathus",
      precio: 22000,
      categoria: "mousepad",
      img: "images/razer-goliathus.jpg",
      descripcion: "Mousepad amplio para precisión.",
      descripcionLarga:
        "Mousepad Razer Goliathus Extended Chroma: ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
      reseñas: [
        { texto: "Colores vibrantes.", estrellas: 5 },
        { texto: "Muy espacioso.", estrellas: 4 },
      ],
    },
    {
      nombre: "Secretlab Titan",
      precio: 350000,
      categoria: "sillas-gamers",
      img: "images/secretlab-titan.jpg",
      descripcion: "Silla gamer premium y ergonómica.",
      descripcionLarga:
        "Silla Gamer Secretlab Titan: diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
      reseñas: [
        { texto: "La mejor silla que he tenido.", estrellas: 5 },
        { texto: "Muy ergonómica.", estrellas: 5 },
      ],
    },
    {
      nombre: "Xbox Controller",
      precio: 55000,
      categoria: "accesorios",
      img: "images/xbox-controller.jpg",
      descripcion: "Control inalámbrico para Xbox y PC.",
      descripcionLarga:
        "Controlador Inalámbrico Xbox Series X: ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
      reseñas: [
        { texto: "Excelente respuesta.", estrellas: 5 },
        { texto: "Muy cómodo en las manos.", estrellas: 4 },
      ],
    },
    {
      nombre: "Soporte Técnico",
      precio: 0,
      categoria: "servicio-tecnico",
      img: "images/servicio-tecnico.jpg",
      descripcion: "Chatea con nuestro soporte por WhatsApp.",
      descripcionLarga:
        "¿Tienes problemas con tu producto? Haz clic en el botón para chatear con nuestro soporte técnico por WhatsApp.",
      reseñas: [
        {
          texto: "Me ayudaron rápido y resolvieron mi problema.",
          estrellas: 5,
        },
      ],
      soporte: true,
    },
  ];

  // descuento por correo duoc (como antes)
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || {};
    } catch {
      return {};
    }
  })();
  const descuento = currentUser.discount || 0;

  // ----- STATE -----
  const [categoria, setCategoria] = useState("todos");
  const [orden, setOrden] = useState("default");

  // carrito = [{ nombre, precio, cantidad }]
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // puntos LevelUp (se ganan al pagar)
  const [puntosLevelUp, setPuntosLevelUp] = useState(() => {
    const saved = parseInt(localStorage.getItem("puntosLevelUp"));
    return isNaN(saved) ? 0 : saved;
  });

  // modal producto
  const [showModal, setShowModal] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  // reseña nueva en modal
  const [nuevaResenaTexto, setNuevaResenaTexto] = useState("");
  const [nuevaResenaEstrellas, setNuevaResenaEstrellas] = useState(0);
  const [mostrarFormResena, setMostrarFormResena] = useState(false);

  // mensaje de post-pago
  const [mensajePago, setMensajePago] = useState("");

  // ----- HELPERS -----

  // Calcula precio con descuento (si user tiene discount)
  function precioConDescuento(p) {
    if (!descuento || p.soporte) {
      return { final: p.precio, original: null };
    }
    const final = Math.round(p.precio * (1 - descuento / 100));
    return { final, original: p.precio };
  }

  // Estrellas promedio para card
  function promedioEstrellas(p) {
    if (!p.reseñas || p.reseñas.length === 0) return 0;
    const total = p.reseñas.reduce((acc, r) => acc + r.estrellas, 0);
    return Math.round(total / p.reseñas.length);
  }

  function estrellasTexto(n) {
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += i < n ? "★" : "☆";
    }
    return out;
  }

  // ---- RESEÑAS guardadas por usuario (localStorage) ----

  function getResenasExtra(nombreProducto) {
    try {
      return (
        JSON.parse(localStorage.getItem("reseñas_" + nombreProducto)) || []
      );
    } catch {
      return [];
    }
  }

  function saveResena(nombreProducto, reseñaObj) {
    const actuales = getResenasExtra(nombreProducto);
    const nuevas = [...actuales, reseñaObj];
    localStorage.setItem("reseñas_" + nombreProducto, JSON.stringify(nuevas));
  }

  // crear lista de reseñas combinando las originales + las extras guardadas
  function reseñasCompletas(producto) {
    if (!producto) return [];
    const base = producto.reseñas || [];
    const extra = getResenasExtra(producto.nombre).map((r) => {
      // las extras las guardamos como {texto, estrellas}
      return {
        texto: r.texto,
        estrellas: r.estrellas,
      };
    });
    return [...base, ...extra];
  }

  // ----- FILTRAR Y ORDENAR PRODUCTOS -----
  const productosFiltradosYOrdenados = useMemo(() => {
    let lista = productosBase.filter(
      (p) => categoria === "todos" || p.categoria === categoria
    );

    if (orden === "precio-asc") {
      lista.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-desc") {
      lista.sort((a, b) => b.precio - a.precio);
    } else if (orden === "az") {
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === "za") {
      lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    return lista;
  }, [categoria, orden, productosBase]);

  // ----- CARRITO -----

  // actualizar total cuando cambia carrito
  useEffect(() => {
    const nuevoTotal = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [carrito]);

  function agregarAlCarrito(producto) {
    const { final } = precioConDescuento(producto);

    setCarrito((prev) => {
      const existente = prev.find((i) => i.nombre === producto.nombre);
      if (existente) {
        return prev.map((i) =>
          i.nombre === producto.nombre
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      } else {
        return [
          ...prev,
          {
            nombre: producto.nombre,
            precio: final,
            cantidad: 1,
          },
        ];
      }
    });

    setMensajePago(""); // limpiar mensaje anterior
    alert(`Agregaste ${producto.nombre} por $${final} al carrito.`);
  }

  function eliminarDelCarrito(nombre) {
    setCarrito((prev) => prev.filter((item) => item.nombre !== nombre));
  }

  function modificarCantidad(nombre, nuevaCantidad) {
    const cant = Number(nuevaCantidad) > 0 ? Number(nuevaCantidad) : 1;
    setCarrito((prev) =>
      prev.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: cant } : item
      )
    );
  }

  function realizarPago() {
    // puntos = total * 0.001 redondeado hacia abajo
    const puntosGanados = Math.floor(total * 0.001);
    const nuevosPuntosTotales = puntosLevelUp + puntosGanados;

    // guardar puntos en localStorage y estado
    setPuntosLevelUp(nuevosPuntosTotales);
    localStorage.setItem("puntosLevelUp", nuevosPuntosTotales.toString());

    // limpiar carrito
    setCarrito([]);

    // mensaje de confirmación
    setMensajePago(
      `¡Compra realizada correctamente! Recibirás una boleta en tu correo electrónico. ` +
        `Has ganado ${puntosGanados} puntos Level-Up. ` +
        `Total acumulado: ${nuevosPuntosTotales} puntos Level-Up.`
    );

    alert("Compra realizada 🎉 ¡Gracias por tu compra gamer!");
  }

  // ----- MODAL PRODUCTO -----

  function abrirModalDetalle(producto) {
    setProductoActual(producto);
    setNuevaResenaTexto("");
    setNuevaResenaEstrellas(0);
    setMostrarFormResena(false);
    setShowModal(true);
  }

  function cerrarModalDetalle() {
    setShowModal(false);
    setProductoActual(null);
  }

  function seleccionarEstrellas(n) {
    setNuevaResenaEstrellas(n);
  }

  function enviarResena() {
    if (!nuevaResenaTexto.trim()) {
      alert("Por favor, escribe tu reseña.");
      return;
    }
    if (nuevaResenaEstrellas === 0) {
      alert("Por favor, selecciona una calificación.");
      return;
    }
    if (!productoActual) return;

    saveResena(productoActual.nombre, {
      texto: nuevaResenaTexto.trim(),
      estrellas: nuevaResenaEstrellas,
    });

    // reset form
    setNuevaResenaTexto("");
    setNuevaResenaEstrellas(0);
    setMostrarFormResena(false);

    alert("¡Gracias por tu reseña!");
  }

  // helper para compartir producto
  function compartir(red) {
    if (!productoActual) return;

    const url = window.location.href;
    const texto = `Mira este producto: ${productoActual.nombre} en Level-Up Gamer`;

    if (red === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else if (red === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
        "_blank"
      );
    } else if (red === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(texto + " " + url)}`,
        "_blank"
      );
    }
  }

  // ----- RENDER -----
  return (
    <>
      {/* Header catálogo */}
      <section className="py-5 bg-dark text-light text-center">
        <Container>
          <h1 className="display-5 fw-bold">Catálogo de Productos</h1>
          <p className="lead">Todo lo que necesitas para tu setup gamer en Chile.</p>
        </Container>
      </section>

      {/* Filtros */}
      <section className="py-4">
        <Container>
          <Row className="mb-4 align-items-end">
            <Col xs={12} md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Filtrar por categoría:</Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="consolas">Consolas</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="computadores-gamers">Computadores Gamers</option>
                  <option value="sillas-gamers">Sillas Gamers</option>
                  <option value="juegos-de-mesa">Juegos de mesa</option>
                  <option value="mouse">Mouse</option>
                  <option value="mousepad">Mousepad</option>
                  <option value="poleras-personalizadas">
                    Poleras Personalizadas
                  </option>
                  <option value="servicio-tecnico">Soporte Técnico</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Ordenar por:</Form.Label>
                <Form.Select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                >
                  <option value="default">Por defecto</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                  <option value="az">Nombre: A-Z</option>
                  <option value="za">Nombre: Z-A</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} className="text-md-end">
              {descuento > 0 ? (
                <div className="p-3 bg-warning-subtle border rounded text-center text-md-end">
                  <strong>Descuento activo:</strong> {descuento}% por correo
                  educativo 🎓
                </div>
              ) : (
                <div className="p-3 bg-light border rounded text-center text-md-end text-muted">
                  Sin descuento especial activo
                </div>
              )}
            </Col>
          </Row>

          {/* Productos */}
          <Row className="g-4">
            {productosFiltradosYOrdenados.map((p, i) => {
              const { final, original } = precioConDescuento(p);
              const promEstrellas = promedioEstrellas(p);

              return (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="h-100 shadow-sm border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => abrirModalDetalle(p)}
                  >
                    {!p.soporte && (
                      <Card.Img
                        variant="top"
                        src={p.img}
                        alt={p.nombre}
                        style={{
                          maxHeight: "180px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <Card.Body>
                      <Card.Title className="h5">{p.nombre}</Card.Title>

                      {!p.soporte && (
                        <div
                          className="text-warning-emphasis mb-2"
                          style={{ fontSize: "1.1rem", color: "#FFD700" }}
                        >
                          {estrellasTexto(promEstrellas)}
                        </div>
                      )}

                      <Card.Text>{p.descripcion}</Card.Text>

                      {!p.soporte && (
                        <div className="mb-2">
                          {original ? (
                            <>
                              <div className="text-muted text-decoration-line-through">
                                ${original}
                              </div>
                              <div className="fw-bold">
                                ${final}{" "}
                                <span className="text-success">
                                  (-{descuento}%)
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="fw-bold">${final}</div>
                          )}
                        </div>
                      )}

                      {p.soporte ? (
                        <Button
                          variant="success"
                          className="w-100 fw-bold"
                          href="https://wa.me/56949623132?text=Hola,%20necesito%20soporte%20técnico%20con%20mi%20producto%20Level-Up%20Gamer"
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          💬 Chatear con Soporte Técnico
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          className="w-100 fw-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            agregarAlCarrito(p);
                          }}
                        >
                          Agregar al carrito
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Carrito / Pago */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col md={6}>
              <h2 className="h4">🛒 Carrito de Compras</h2>

              {carrito.length === 0 ? (
                <p className="text-muted">Tu carrito está vacío.</p>
              ) : (
                <ListGroup className="mb-3">
                  {carrito.map((item) => (
                    <ListGroup.Item key={item.nombre}>
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2">
                        <div>
                          <strong>{item.nombre}</strong>
                          <br />
                          ${item.precio} x {item.cantidad} = $
                          {item.precio * item.cantidad}
                        </div>

                        <div className="d-flex flex-column align-items-start gap-2">
                          <div className="d-flex align-items-center gap-2">
                            <label className="small mb-0">Cant:</label>
                            <input
                              type="number"
                              min="1"
                              style={{ width: "60px" }}
                              value={item.cantidad}
                              onChange={(e) =>
                                modificarCantidad(
                                  item.nombre,
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => eliminarDelCarrito(item.nombre)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              <p className="fw-bold">Total: ${total}</p>

              <div className="mb-2">
                Puntos Level-Up acumulados:{" "}
                <b>{puntosLevelUp}</b>
              </div>

              {carrito.length > 0 && (
                <Button
                  id="btn-pagar"
                  variant="success"
                  className="fw-bold"
                  onClick={realizarPago}
                >
                  Pagar
                </Button>
              )}

              {mensajePago && (
                <Alert
                  variant="success"
                  className="mt-3"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {mensajePago}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal Detalle con Reseñas y Compartir */}
      <Modal show={showModal} onHide={cerrarModalDetalle} centered size="lg">
        {productoActual && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoActual.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                {!productoActual.soporte && (
                  <Col md={4} className="text-center mb-3">
                    <img
                      src={productoActual.img}
                      alt={productoActual.nombre}
                      style={{
                        maxWidth: "180px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                )}

                <Col md={productoActual.soporte ? 12 : 8}>
                  <p>{productoActual.descripcionLarga}</p>

                  {/* Reseñas */}
                  <h5 className="mt-4">Reseñas</h5>
                  {reseñasCompletas(productoActual).length > 0 ? (
                    <ListGroup className="mb-3">
                      {reseñasCompletas(productoActual).map((r, i) => (
                        <ListGroup.Item key={i}>
                          <span
                            style={{
                              color: "#FFD700",
                              marginRight: "8px",
                            }}
                          >
                            {estrellasTexto(r.estrellas)}
                          </span>
                          {r.texto}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">No hay reseñas aún.</p>
                  )}

                  {/* Botón "Dejar reseña" */}
                  {!productoActual.soporte && (
                    <>
                      {!mostrarFormResena ? (
                        <Button
                          variant="outline-primary"
                          className="mb-3"
                          onClick={() => setMostrarFormResena(true)}
                        >
                          Dejar reseña
                        </Button>
                      ) : (
                        <div className="mb-4 p-3 border rounded bg-light">
                          <h6>Tu reseña</h6>

                          {/* Estrellas clickeables */}
                          <div
                            style={{
                              fontSize: "1.5em",
                              cursor: "pointer",
                              userSelect: "none",
                            }}
                            className="mb-2"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <span
                                key={n}
                                onClick={() => seleccionarEstrellas(n)}
                              >
                                {n <= nuevaResenaEstrellas ? "★" : "☆"}
                              </span>
                            ))}
                          </div>

                          <Form.Group className="mb-2">
                            <Form.Control
                              as="textarea"
                              rows={2}
                              maxLength={120}
                              placeholder="Escribe tu opinión..."
                              value={nuevaResenaTexto}
                              onChange={(e) =>
                                setNuevaResenaTexto(e.target.value)
                              }
                            />
                          </Form.Group>

                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={enviarResena}
                          >
                            Enviar reseña
                          </Button>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setMostrarFormResena(false);
                              setNuevaResenaTexto("");
                              setNuevaResenaEstrellas(0);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Compartir */}
                  {!productoActual.soporte && (
                    <>
                      <h5 className="mt-3">Compartir este producto</h5>
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="primary"
                          onClick={() => compartir("facebook")}
                        >
                          📘 Facebook
                        </Button>
                        <Button
                          variant="info"
                          onClick={() => compartir("twitter")}
                        >
                          🐦 Twitter
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => compartir("whatsapp")}
                        >
                          💬 WhatsApp
                        </Button>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              {!productoActual.soporte && (
                <Button
                  variant="primary"
                  onClick={() => {
                    agregarAlCarrito(productoActual);
                    cerrarModalDetalle();
                  }}
                >
                  Agregar al carrito
                </Button>
              )}
              <Button variant="secondary" onClick={cerrarModalDetalle}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

    
    </>
  );
}
