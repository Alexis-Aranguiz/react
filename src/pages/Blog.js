import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Blog() {
  return (
    <>
      {/* Encabezado */}
      <section className="py-5 bg-dark text-light text-center">
        <Container>
          <h1 className="display-5 fw-bold">Blog de Level-Up Gamer</h1>
          <p className="lead">
            Noticias, novedades y artículos del mundo gamer en Chile.
          </p>
        </Container>
      </section>

      {/* Sobre la tienda */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <h2 className="text-center mb-4">Sobre Level-Up Gamer</h2>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h3>Enunciado</h3>
                  <p>
                    Level-Up Gamer es una tienda online dedicada a satisfacer
                    las necesidades de los entusiastas de los videojuegos en
                    Chile. Lanzada hace dos años como respuesta a la creciente
                    demanda durante la pandemia, Level-Up Gamer ofrece una
                    amplia gama de productos para gamers, desde consolas y
                    accesorios hasta computadores y sillas especializadas. Aunque
                    no cuenta con una ubicación física, realiza despachos a todo
                    el país.
                  </p>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h3>Misión</h3>
                  <p>
                    Proporcionar productos de alta calidad para gamers en todo
                    Chile, ofreciendo una experiencia de compra única y
                    personalizada, con un enfoque en la satisfacción del cliente
                    y el crecimiento de la comunidad gamer.
                  </p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h3>Visión</h3>
                  <p>
                    Ser la tienda online líder en productos para gamers en
                    Chile, reconocida por su innovación, servicio al cliente
                    excepcional, y un programa de fidelización basado en
                    gamificación que recompense a nuestros clientes más fieles.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Últimos artículos */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <h2 className="text-center mb-4">Últimos Artículos</h2>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <h4>Nueva línea de sillas gamer 2025</h4>
                      <p>
                        Conoce la nueva colección de sillas gamer que combina
                        ergonomía y estilo para largas sesiones de juego.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <h4>Accesorios imprescindibles para tu setup</h4>
                      <p>
                        Explora los accesorios que todo gamer debe tener para
                        mejorar su rendimiento y comodidad.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <h4>Top 5 videojuegos de estrategia</h4>
                      <p>
                        Descubre los mejores juegos de estrategia para PC y
                        consolas recomendados por nuestros expertos.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>


    </>
  );
}
