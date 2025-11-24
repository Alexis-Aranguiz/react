import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Inicio() {
  return (
    <>
      {/* HERO: logo + texto + botones */}
      <section className="py-5 bg-dark text-light">
        <Container>
          <Row className="align-items-center">
            <Col
              md={6}
              className="text-center text-md-start mb-4 mb-md-0"
            >
              <h1 className="display-4 fw-bold mb-3">
                Level Up Gamer
              </h1>
              <p className="lead mb-4">
                Conviértete en el héroe de tu propia historia y
                únete a nuestra comunidad de jugadores. ¡Explora,
                juega y gana con nosotros!
              </p>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-md-start">
                <Button
                  as={Link}
                  to="/productos"
                  variant="success"
                >
                  Ver catálogo
                </Button>
                <Button
                  as={Link}
                  to="/canjea"
                  variant="outline-light"
                  className="border-2"
                >
                  Canjear puntos
                </Button>
              </div>
            </Col>

            <Col md={6} className="text-center">
              <img
                src="/images/logo.png"
                alt="Logo Level-Up Gamer"
                className="img-fluid"
                style={{
                  maxWidth: "260px",
                  filter: "drop-shadow(0 0 12px rgba(0,0,0,0.5))",
                }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* DESCRIPCIÓN TIENDA */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4 p-md-5">
                  <h2 className="h4 mb-3 text-center text-md-start">
                    Tu tienda gamer en todo Chile
                  </h2>
                  <p className="fs-5 mb-0 text-center text-md-start">
                    Level-Up Gamer es una tienda online dedicada a
                    satisfacer las necesidades de los entusiastas de
                    los videojuegos en Chile. Lanzada hace dos años
                    como respuesta a la creciente demanda durante la
                    pandemia, Level-Up Gamer ofrece una amplia gama de
                    productos para gamers, desde consolas y accesorios
                    hasta computadores y sillas especializadas. Aunque
                    no cuenta con una ubicación física, realiza
                    despachos a todo el país.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* IMPACTO COMUNITARIO */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h2 className="text-center mb-3">
                    Impacto Comunitario
                  </h2>
                  <p className="mb-0 text-center text-md-start">
                    Tus compras en Level-Up Gamer ayudan a fortalecer
                    la comunidad gamer en Chile. Apoyamos eventos
                    locales, torneos y actividades que promueven la
                    inclusión y el desarrollo de nuevos talentos.
                    ¡Gracias por ser parte de este movimiento y
                    contribuir al crecimiento de la cultura gamer
                    nacional!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MAPA EVENTOS GAMER */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10}>
              <h2 className="mb-3">
                Mapa de Ubicaciones de Eventos Gamer
              </h2>
              <p>
                Descubre los principales puntos de encuentro gamer en
                Chile donde puedes participar en eventos y ganar puntos
                Level-Up.
              </p>

              <div className="d-flex justify-content-center">
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=17YqSZ5miNGl1iq3RvQhv_NQdx_WS3Zs&ehbc=2E312F"
                  width="90%"
                  height="400"
                  style={{
                    borderRadius: "12px",
                    border: 0,
                    maxWidth: "900px",
                  }}
                  allowFullScreen
                  title="Ubicaciones Gamer"
                ></iframe>
              </div>

              <small className="d-block mt-3 text-start text-muted">
                <strong>Ubicaciones:</strong>
                <br />
                📍 Movistar Arena, Santiago
                <br />
                📍 Movistar GameClub, Mall Plaza Vespucio
                <br />
                📍 Movistar GameClub, Mall Plaza Norte
              </small>
            </Col>
          </Row>
        </Container>
      </section>

      {/* VIDEO GAMECLUB */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={10}>
              <h2 className="mb-4">
                ¡Conoce Movistar GameClub!
              </h2>
              <div
                className="ratio ratio-16x9"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <iframe
                  src="https://www.youtube.com/embed/HgHR-msDejQ"
                  title="Movistar GameClub"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
