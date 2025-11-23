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
  // ====== CONFIG: URL del backend ======
  // Para desarrollo local:
  const API_URL = "http://localhost:8080/api/v1/productos";

  // ====== ESTADO PRINCIPAL ======
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // descuento por correo duoc (como antes)
  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || {};
    } catch {
      return {};
    }
  })();
  const descuento = currentUser.discount || 0;

  const [categoria, setCategoria] = useState("todos");
  const [orden, setOrden] = useState("default");

  // carrito = [{ nombre, precio, cantidad }]
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

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

  // ====== FETCH DE PRODUCTOS DESDE BACKEND ======
  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        setErrorCarga(null);

        const resp = await fetch(API_URL);
        if (!resp.ok) {
          throw new Error(`Error HTTP ${resp.status}`);
        }
        const data = await resp.json();

        // data debe ser un array de productos [{id, nombre, descripcion, precio, categoria, imagenUrl, stock}, ...]
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setErrorCarga(
          "No se pudieron cargar los productos desde el servidor. Intenta nuevamente más tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  // ====== HELPERS ======

  function precioConDescuento(p) {
    if (!descuento) {
      return { final: p.precio, original: null };
    }
    const final = Math.round(p.precio * (1 - descuento / 100));
    return { final, original: p.precio };
  }

  function estrellasTexto(n) {
    let out = "";
    for (let i = 0; i < 5; i++) {
      out += i < n ? "★" : "☆";
    }
    return out;
  }

  // No hay reseñas en la BD todavía → solo extras por localStorage
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

  function reseñasCompletas(producto) {
    if (!producto) return [];
    const extra = getResenasExtra(producto.nombre).map((r) => ({
      texto: r.texto,
      estrellas: r.estrellas,
    }));
    return extra; // por ahora solo extras
  }

  function promedioEstrellas(producto) {
    const lista = reseñasCompletas(producto);
    if (lista.length === 0) return 0;
    const totalEst = lista.reduce((acc, r) => acc + r.estrellas, 0);
    return Math.round(totalEst / lista.length);
  }

  // ====== FILTRADO Y ORDEN ======
  const productosFiltradosYOrdenados = useMemo(() => {
    let lista = productos.filter(
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
  }, [productos, categoria, orden]);

  // ====== CARRITO ======
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

    setMensajePago("");
    alert(`Agregaste ${producto.nombre} por $${final.toLocaleString("es-CL")} al carrito.`);
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
    const puntosGanados = Math.floor(total * 0.001);
    const nuevosPuntosTotales = puntosLevelUp + puntosGanados;

    setPuntosLevelUp(nuevosPuntosTotales);
    localStorage.setItem("puntosLevelUp", nuevosPuntosTotales.toString());

    setCarrito([]);

    setMensajePago(
      `¡Compra realizada correctamente! Recibirás una boleta en tu correo electrónico.\n` +
        `Has ganado ${puntosGanados} puntos Level-Up.\n` +
        `Total acumulado: ${nuevosPuntosTotales} puntos Level-Up.`
    );

    alert("Compra realizada 🎉 ¡Gracias por tu compra gamer!");
  }

  // ====== MODAL PRODUCTO ======
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

    setNuevaResenaTexto("");
    setNuevaResenaEstrellas(0);
    setMostrarFormResena(false);

    alert("¡Gracias por tu reseña!");
  }

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

  // ====== RENDER ======
  return (
    <>
      {/* Header catálogo */}
      <section className="py-5 bg-dark text-light text-center">
        <Container>
          <h1 className="display-5 fw-bold">Catálogo de Productos</h1>
          <p className="lead">Todo lo que necesitas para tu setup gamer en Chile.</p>
        </Container>
      </section>

      {/* Filtros + estado de carga */}
      <section className="py-4">
        <Container>
          {loading && (
            <Alert variant="info" className="mb-4">
              Cargando productos desde el servidor...
            </Alert>
          )}

          {errorCarga && (
            <Alert variant="danger" className="mb-4">
              {errorCarga}
            </Alert>
          )}

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
            {!loading &&
              productosFiltradosYOrdenados.map((p) => {
                const { final, original } = precioConDescuento(p);
                const promEstrellas = promedioEstrellas(p);

                return (
                  <Col key={p.id} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      className="h-100 shadow-sm border-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => abrirModalDetalle(p)}
                    >
                      {p.imagenUrl && (
                        <Card.Img
                          variant="top"
                          src={p.imagenUrl}
                          alt={p.nombre}
                          style={{
                            maxHeight: "180px",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      <Card.Body>
                        <Card.Title className="h5">{p.nombre}</Card.Title>

                        <div
                          className="text-warning-emphasis mb-2"
                          style={{ fontSize: "1.1rem", color: "#FFD700" }}
                        >
                          {estrellasTexto(promEstrellas)}
                        </div>

                        <Card.Text>{p.descripcion}</Card.Text>

                        <div className="mb-2">
                          {original ? (
                            <>
                              <div className="text-muted text-decoration-line-through">
                                ${original.toLocaleString("es-CL")}
                              </div>
                              <div className="fw-bold">
                                ${final.toLocaleString("es-CL")}{" "}
                                <span className="text-success">
                                  (-{descuento}%)
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="fw-bold">
                              ${final.toLocaleString("es-CL")}
                            </div>
                          )}
                        </div>

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
                          ${item.precio.toLocaleString("es-CL")} x {item.cantidad} = $
                          {(item.precio * item.cantidad).toLocaleString("es-CL")}
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

              <p className="fw-bold">
                Total: ${total.toLocaleString("es-CL")}
              </p>

              <div className="mb-2">
                Puntos Level-Up acumulados: <b>{puntosLevelUp}</b>
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

      {/* Modal Detalle */}
      <Modal show={showModal} onHide={cerrarModalDetalle} centered size="lg">
        {productoActual && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoActual.nombre}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row>
                {productoActual.imagenUrl && (
                  <Col md={4} className="text-center mb-3">
                    <img
                      src={productoActual.imagenUrl}
                      alt={productoActual.nombre}
                      style={{
                        maxWidth: "180px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                )}

                <Col md={productoActual.imagenUrl ? 8 : 12}>
                  <p>{productoActual.descripcion}</p>

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

                  {/* Compartir */}
                  <h5 className="mt-3">Compartir este producto</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      onClick={() => compartir("facebook")}
                    >
                      📘 Facebook
                    </Button>
                    <Button variant="info" onClick={() => compartir("twitter")}>
                      🐦 Twitter
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => compartir("whatsapp")}
                    >
                      💬 WhatsApp
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  agregarAlCarrito(productoActual);
                  cerrarModalDetalle();
                }}
              >
                Agregar al carrito
              </Button>
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
