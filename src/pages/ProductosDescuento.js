import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Modal,
  Badge,
  Alert,
} from "react-bootstrap";

export default function ProductosDescuento() {
  // 1. Estado inicial de puntos del usuario desde localStorage
  const [puntosLevelUp, setPuntosLevelUp] = useState(() => {
    const saved = parseInt(localStorage.getItem("puntosLevelUp"));
    return isNaN(saved) ? 350 : saved; // 350 como en tu HTML
  });

  // 2. Carrito de canje (guardado en localStorage)
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("carrito")) || [];
    } catch {
      return [];
    }
  });

  // 3. Filtro categoría
  const [categoria, setCategoria] = useState("todos");

  // 4. Modal de detalle
  const [showModal, setShowModal] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  // 5. Mensaje después de canjear carrito
  const [mensajeCanjeCarrito, setMensajeCanjeCarrito] = useState("");

  // --- DATA productos (sacada de tu HTML) ---
  const productosBase = [
    {
      nombre: "Catan",
      categoria: "juegos-de-mesa",
      puntosBase: 300,
      descuentoPct: 0,
      descripcionCorta: "Juego de mesa clásico de estrategia.",
      descripcionLarga:
        "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos. <br><strong>Fabricante:</strong> Kosmos | <strong>Distribuidor:</strong> Devir.",
      img: "images/catan.png",
      reseñas: [
        "Muy entretenido para jugar en familia.",
        "Excelente calidad de piezas.",
        "4⭐",
      ],
    },
    {
      nombre: "Carcassonne",
      categoria: "juegos-de-mesa",
      puntosBase: 220,
      descuentoPct: 10,
      descripcionCorta: "Juego de colocación de fichas.",
      descripcionLarga:
        "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender. <br><strong>Fabricante:</strong> Hans im Glück | <strong>Distribuidor:</strong> Devir.",
      img: "images/carcassonne.png",
      reseñas: [
        "Perfecto para iniciar en juegos de mesa.",
        "Muy divertido y fácil de aprender.",
        "5⭐",
      ],
    },
    {
      nombre: "Controlador Inalámbrico Xbox Series X",
      categoria: "accesorios",
      puntosBase: 600,
      descuentoPct: 0,
      descripcionCorta: "Control inalámbrico para Xbox y PC.",
      descripcionLarga:
        "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC. <br><strong>Fabricante:</strong> Microsoft | <strong>Distribuidor:</strong> Microsoft Store.",
      img: "images/xbox-controller.jpg",
      reseñas: [
        "Muy cómodo y preciso.",
        "Funciona perfecto en PC y Xbox.",
        "4⭐",
      ],
    },
    {
      nombre: "Auriculares Gamer HyperX Cloud II",
      categoria: "accesorios",
      puntosBase: 800,
      descuentoPct: 20,
      descripcionCorta:
        "Sonido envolvente y micrófono desmontable.",
      descripcionLarga:
        "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego. <br><strong>Fabricante:</strong> HyperX | <strong>Distribuidor:</strong> Kingston Technology.",
      img: "images/hyperx-cloud2.jpg",
      reseñas: [
        "Sonido excelente y muy cómodos.",
        "El micrófono es muy claro.",
        "5⭐",
      ],
    },
    {
      nombre: "PlayStation 5",
      categoria: "consolas",
      puntosBase: 5500,
      descuentoPct: 0,
      descripcionCorta: "Consola de última generación.",
      descripcionLarga:
        "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva. <br><strong>Fabricante:</strong> Sony Interactive Entertainment | <strong>Distribuidor:</strong> Sony Store.",
      img: "images/ps5.jpg",
      reseñas: [
        "Gráficos increíbles.",
        "Carga los juegos rapidísimo.",
        "5⭐",
      ],
    },
    {
      nombre: "PC Gamer ASUS ROG Strix",
      categoria: "computadores-gamers",
      puntosBase: 12000,
      descuentoPct: 0,
      descripcionCorta: "Equipo de alto rendimiento para gamers.",
      descripcionLarga:
        "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego. <br><strong>Fabricante:</strong> ASUS | <strong>Distribuidor:</strong> ASUS Store.",
      img: "images/asus-rog-strix.jpg",
      reseñas: [
        "Rinde excelente en todos los juegos.",
        "Muy silencioso y rápido.",
        "4⭐",
      ],
    },
    {
      nombre: "Silla Gamer Secretlab Titan",
      categoria: "sillas-gamers",
      puntosBase: 350,
      descuentoPct: 15,
      descripcionCorta: "Soporte ergonómico y personalización.",
      descripcionLarga:
        "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas. <br><strong>Fabricante:</strong> Secretlab | <strong>Distribuidor:</strong> Secretlab.",
      img: "images/secretlab-titan.jpg",
      reseñas: [
        "Muy cómoda para largas sesiones.",
        "Materiales de alta calidad.",
        "4⭐",
      ],
    },
    {
      nombre: "Mouse Gamer Logitech G502 HERO",
      categoria: "mouse",
      puntosBase: 120,
      descuentoPct: 0,
      descripcionCorta:
        "Sensor de alta precisión y botones personalizables.",
      descripcionLarga:
        "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización. <br><strong>Fabricante:</strong> Logitech | <strong>Distribuidor:</strong> Logitech Store.",
      img: "images/logitech-g502.jpg",
      reseñas: [
        "Precisión increíble.",
        "Muy configurable y cómodo.",
        "4⭐",
      ],
    },
    {
      nombre: "Mousepad Razer Goliathus Extended Chroma",
      categoria: "mousepad",
      puntosBase: 90,
      descuentoPct: 0,
      descripcionCorta: "Área amplia e iluminación RGB.",
      descripcionLarga:
        "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse. <br><strong>Fabricante:</strong> Razer | <strong>Distribuidor:</strong> Razer Store.",
      img: "images/razer-goliathus.jpg",
      reseñas: [
        "La iluminación RGB es espectacular.",
        "Superficie muy suave.",
        "5⭐",
      ],
    },
    {
      nombre: "Polera Gamer Personalizada 'Level-Up'",
      categoria: "poleras-personalizadas",
      puntosBase: 60,
      descuentoPct: 0,
      descripcionCorta:
        "Camiseta personalizada para gamers.",
      descripcionLarga:
        "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito. <br><strong>Fabricante:</strong> Level-Up Gamer | <strong>Distribuidor:</strong> Level-Up Gamer.",
      img: "images/polera-personalizada.png",
      reseñas: [
        "Muy cómoda y el diseño es genial.",
        "Me encantó poder personalizarla.",
        "5⭐",
      ],
    },
  ];

  // --- helpers de puntos ---
  function puntosConDescuento(prod) {
    const base = prod.puntosBase;
    const d = prod.descuentoPct || 0;
    if (d === 0) return base;
    return Math.round(base * (1 - d / 100));
  }

  // productos filtrados por categoría
  const productosFiltrados = useMemo(() => {
    if (categoria === "todos") return productosBase;
    return productosBase.filter((p) => p.categoria === categoria);
  }, [categoria, productosBase]);

  // total de puntos necesarios para canjear todo el carrito
  const totalPuntosCarrito = useMemo(() => {
    return carrito.reduce((acc, item) => {
      // cada item del carrito: {nombre, cantidad}
      const prodInfo = productosBase.find(
        (p) => p.nombre === item.nombre
      );
      if (!prodInfo) return acc;
      const costo = puntosConDescuento(prodInfo);
      return acc + costo * item.cantidad;
    }, 0);
  }, [carrito, productosBase]);

  // --- persistencia en localStorage cuando cambian puntos/carrito ---
  useEffect(() => {
    localStorage.setItem("puntosLevelUp", puntosLevelUp.toString());
  }, [puntosLevelUp]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // --- modal ---
  function abrirModal(prod) {
    setProductoActual(prod);
    setShowModal(true);
  }

  function cerrarModal() {
    setShowModal(false);
    setProductoActual(null);
  }

  // --- carrito ---
  function agregarAlCarrito(prod) {
    const costo = puntosConDescuento(prod);

    if (puntosLevelUp < costo) {
        alert(
          `No tienes suficientes puntos para este producto (${costo} puntos requeridos).`
        );
        return;
    }

    setCarrito((prev) => {
      const existente = prev.find((i) => i.nombre === prod.nombre);
      if (existente) {
        return prev.map((i) =>
          i.nombre === prod.nombre
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      } else {
        return [...prev, { nombre: prod.nombre, cantidad: 1 }];
      }
    });

    alert(`"${prod.nombre}" agregado al carrito de canje.`);
  }

  function cambiarCantidad(idx, delta) {
    setCarrito((prev) => {
      const copia = [...prev];
      copia[idx].cantidad += delta;
      if (copia[idx].cantidad < 1) copia[idx].cantidad = 1;
      return copia;
    });
  }

  function eliminarDelCarrito(idx) {
    setCarrito((prev) => prev.filter((_, i) => i !== idx));
  }

  function canjearCarrito() {
    if (carrito.length === 0) return;

    if (puntosLevelUp < totalPuntosCarrito) {
      setMensajeCanjeCarrito(
        "No tienes suficientes puntos Level-Up para canjear todos los productos del carrito."
      );
      return;
    }

    // descontar puntos, vaciar carrito
    const nuevosPuntos = puntosLevelUp - totalPuntosCarrito;
    setPuntosLevelUp(nuevosPuntos);
    setCarrito([]);
    setMensajeCanjeCarrito(
      "¡Canje realizado correctamente! Recibirás un voucher de confirmación en tu correo electrónico. Gracias por usar tus puntos Level-Up."
    );
  }

  return (
    <>
      {/* Header con puntos */}
      <section className="py-4 bg-dark text-light">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start mb-3 mb-md-0">
              <h1 className="fw-bold mb-1">Canjea tus Puntos Level-Up</h1>
              <p className="mb-0">
                Usa tus puntos para obtener productos reales y recompensas
                exclusivas.
              </p>
            </Col>
            <Col
              md={4}
              className="text-center text-md-end fw-bold fs-5 text-warning"
            >
              Puntos Level-Up:{" "}
              <Badge bg="warning" text="dark" className="fs-6">
                {puntosLevelUp}
              </Badge>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Filtro + lista productos */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
      <Col md={6}>
        <Form.Group controlId="filtro-categoria">
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
            <option value="poleras-personalizadas">Poleras Personalizadas</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>

          {/* Productos */}
          <Row className="g-4">
            {productosFiltrados.map((prod, idx) => {
              const costo = puntosConDescuento(prod);
              const tieneDescuento = prod.descuentoPct > 0;
              const puedeCanjear = puntosLevelUp >= costo;

              return (
                <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="h-100 shadow-sm border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => abrirModal(prod)}
                  >
                    <Card.Img
                      variant="top"
                      src={prod.img}
                      alt={prod.nombre}
                      style={{
                        maxHeight: "180px",
                        objectFit: "cover",
                      }}
                    />

                    <Card.Body>
                      <Card.Title className="h5">
                        {prod.nombre}{" "}
                        {tieneDescuento && (
                          <Badge bg="success" className="ms-2">
                            {prod.descuentoPct}% menos puntos
                          </Badge>
                        )}
                      </Card.Title>

                      <Card.Text>{prod.descripcionCorta}</Card.Text>

                      <p className="fw-bold mb-3">
                        {costo} Puntos Level-Up
                      </p>

                      <Button
                        variant={puedeCanjear ? "primary" : "secondary"}
                        className="w-100 fw-bold"
                        disabled={!puedeCanjear}
                        onClick={(e) => {
                          e.stopPropagation(); // no abrir modal
                          agregarAlCarrito(prod);
                        }}
                      >
                        Canjear
                      </Button>

                      {!puedeCanjear && (
                        <div className="text-danger small mt-2">
                          No tienes puntos suficientes
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Carrito de canje */}
      <section className="py-5 bg-light">
        <Container>
          <Row>
            <Col md={8}>
              <h2 className="h4">Carrito de Canje</h2>

              {carrito.length === 0 ? (
                <p className="text-muted">El carrito está vacío.</p>
              ) : (
                <ListGroup className="mb-3">
                  {carrito.map((item, idx) => {
                    const prodInfo = productosBase.find(
                      (p) => p.nombre === item.nombre
                    );
                    const costoUnit = prodInfo
                      ? puntosConDescuento(prodInfo)
                      : 0;
                    const subtotal = costoUnit * item.cantidad;

                    return (
                      <ListGroup.Item key={idx}>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                          <div>
                            <strong>{item.nombre}</strong>
                            <br />
                            <small>
                              {costoUnit} pts c/u × {item.cantidad} ={" "}
                              {subtotal} pts
                            </small>
                          </div>

                          <div className="mt-2 mt-md-0 d-flex align-items-center gap-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => cambiarCantidad(idx, -1)}
                            >
                              −
                            </Button>
                            <span>{item.cantidad}</span>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => cambiarCantidad(idx, 1)}
                            >
                              +
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => eliminarDelCarrito(idx)}
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}

              <div className="fw-bold mb-3">
                Puntos necesarios para canjear todo: {totalPuntosCarrito}
              </div>

              <Button
                variant="success"
                className="fw-bold"
                disabled={
                  carrito.length === 0 ||
                  puntosLevelUp < totalPuntosCarrito
                }
                onClick={canjearCarrito}
              >
                Canjear Carrito
              </Button>

              {mensajeCanjeCarrito && (
                <Alert
                  variant={
                    mensajeCanjeCarrito.startsWith("¡Canje")
                      ? "success"
                      : "danger"
                  }
                  className="mt-3"
                >
                  {mensajeCanjeCarrito}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal detalle producto */}
      <Modal show={showModal} onHide={cerrarModal} centered size="lg">
        {productoActual && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{productoActual.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
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
                <Col md={8}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productoActual.descripcionLarga,
                    }}  
                  />
                  <h5 className="mt-4">Reseñas</h5>
                  {productoActual.reseñas &&
                  productoActual.reseñas.length > 0 ? (
                    <ListGroup>
                      {productoActual.reseñas.map((r, i) => (
                        <ListGroup.Item key={i}>{r}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-muted">Sin reseñas todavía.</p>
                  )}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>


    </>
  );
}
