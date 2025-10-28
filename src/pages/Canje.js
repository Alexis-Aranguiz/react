import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

export default function Canje() {
  return (
    <>
      {/* Encabezado */}
      <section className="py-5 bg-dark text-light text-center">
        <Container>
          <h1 className="display-5 fw-bold">Programa de Referidos</h1>
          <p className="lead">
            Gana puntos LevelUp compartiendo tu código y canjea productos exclusivos.
          </p>
        </Container>
      </section>

      {/* Contenido principal */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="shadow-sm border-0 p-4 bg-light text-dark">
                <Card.Body>
                  <h2 className="text-center mb-4">
                    Programa de Referidos y Gamificación
                  </h2>

                  {/* Código de referido */}
                  <div className="text-center mb-4">
                    <p className="mb-2 fw-semibold">Tu código de referido:</p>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#00b894",
                        color: "#fff",
                        padding: "8px 20px",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      ABC123XYZ
                    </span>
                  </div>

                  {/* Descripción */}
                  <p>
                    Comparte tu código con amigos y gana{" "}
                    <strong>Puntos LevelUp</strong> por cada nuevo usuario que
                    se registre usando tu referido. ¡Entre más puntos acumules,
                    más alto será tu nivel y podrás canjear productos y
                    descuentos exclusivos!
                  </p>

                  {/* Beneficios */}
                  <ListGroup variant="flush" className="mb-4">
                    <ListGroup.Item>
                      <strong>1 referido = 50 Puntos LevelUp</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Niveles:</strong> Bronce, Plata, Oro y Platino
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Puedes revisar y canjear tus puntos en esta sección
                    </ListGroup.Item>
                  </ListGroup>

                  {/* Botón */}
                  <div className="text-center">
                    <Button
                      href="/productoDescuento"
                      variant="primary"
                      size="lg"
                      className="fw-bold px-4"
                    >
                      Ver productos para canjear
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>


    </>
  );
}
