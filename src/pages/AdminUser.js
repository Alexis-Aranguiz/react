import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function AdminUser() {
  return (
    <>
      {/* Header Admin */}
      <section className="py-5 bg-dark text-light text-center">
        <Container>
          <h1 className="display-6 fw-bold">
            Panel de Administración Level-Up Gamer
          </h1>
          <p className="mb-0 text-muted">
            Gestión interna de usuarios, productos, canjes y soporte.
          </p>
        </Container>
      </section>

      {/* Panel de Control */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col md={8} className="text-center">
              <h2 className="h4 fw-bold">Panel de Control</h2>
              <p className="text-muted">
                Accesos rápidos a las secciones administrativas.
              </p>
            </Col>
          </Row>

          <Row className="g-4 justify-content-center">
            {/* Usuarios */}
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">Usuarios</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Ver, editar y bloquear usuarios registrados.
                  </Card.Text>
                  <Button
                    className="fw-bold"
                    style={{
                      backgroundColor: "#00b894",
                      borderColor: "#00b894",
                    }}
                    href="#"
                  >
                    Gestionar Usuarios
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Productos */}
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">Productos</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Agregar, modificar o desactivar productos del catálogo.
                  </Card.Text>
                  <Button
                    className="fw-bold"
                    style={{
                      backgroundColor: "#0984e3",
                      borderColor: "#0984e3",
                    }}
                    href="#"
                  >
                    Gestionar Productos
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Canjes */}
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">Canjes</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Revisa solicitudes de canje de puntos Level-Up.
                  </Card.Text>
                  <Button
                    className="fw-bold text-dark"
                    style={{
                      backgroundColor: "#fdcb6e",
                      borderColor: "#fdcb6e",
                      color: "#2d3436",
                    }}
                    href="#"
                  >
                    Ver Canjes
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Reportes */}
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">Reportes</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Estadísticas de ventas, puntos y actividad.
                  </Card.Text>
                  <Button
                    className="fw-bold"
                    style={{
                      backgroundColor: "#636e72",
                      borderColor: "#636e72",
                    }}
                    href="#"
                  >
                    Ver Reportes
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Soporte */}
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 h-100 text-center">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">Soporte</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    Tickets abiertos y solicitudes de ayuda técnica.
                  </Card.Text>
                  <Button
                    className="fw-bold"
                    style={{
                      backgroundColor: "#d63031",
                      borderColor: "#d63031",
                    }}
                    href="#"
                  >
                    Centro de Soporte
                  </Button>
                </Card.Body>
              </Card>   
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-light text-center">
        <Container>
          <p className="mb-0">Panel administrador Level-Up Gamer</p>
        </Container>
      </footer>
    </>
  );
}
