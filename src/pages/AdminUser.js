// src/pages/AdminUser.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import {
  getProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} from "../utils/api";
import { getToken, isAdmin } from "../utils/auth";

const EMPTY_FORM = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  categoria: "",
  puntosBase: "",
  descuentoPct: "",
};

function AdminUser() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar productos al inicio
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      }
    };
    cargar();
  }, []);

  // Si NO es admin, bloqueamos la página
  if (!isAdmin()) {
    return (
      <Container className="py-4">
        <h2>Panel de administración</h2>
        <Alert variant="danger" className="mt-3">
          Necesitas iniciar sesión con una cuenta de administrador para ver esta
          página.
        </Alert>
      </Container>
    );
  }

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cancelar modo edición
  const handleCancelarEdicion = () => {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setMensaje("");
    setError("");
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setLoading(true);

    const token = getToken();
    if (!token) {
      setError(
        "No se encontró token de autenticación. Inicia sesión nuevamente."
      );
      setLoading(false);
      return;
    }

    // Parsear valores numéricos
    const precioNum = Number(form.precio);
    const stockNum = Number(form.stock);
    const puntosNum = form.puntosBase === "" ? 0 : Number(form.puntosBase);
    const descNum =
      form.descuentoPct === "" ? 0 : Number(form.descuentoPct);

    if (
      Number.isNaN(precioNum) ||
      Number.isNaN(stockNum) ||
      Number.isNaN(puntosNum) ||
      Number.isNaN(descNum)
    ) {
      setError("Revisa que precio, stock, puntos y descuento sean números válidos.");
      setLoading(false);
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: precioNum,
      stock: stockNum,
      categoria: form.categoria.trim(),
      puntosBase: puntosNum,
      descuentoPct: descNum,
    };

    try {
      let productoRespuesta;

      if (editingProduct) {
        // MODO EDICIÓN → PUT
        productoRespuesta = await actualizarProducto(
          editingProduct.id,
          payload,
          token
        );
        setProductos((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id ? productoRespuesta : p
          )
        );
        setMensaje("Producto actualizado correctamente.");
      } else {
        // MODO CREACIÓN → POST
        productoRespuesta = await crearProducto(payload, token);
        setProductos((prev) => [...prev, productoRespuesta]);
        setMensaje("Producto creado correctamente.");
      }

      setForm(EMPTY_FORM);
      setEditingProduct(null);
    } catch (err) {
      setError(err.message || "Ocurrió un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  // Poner producto en modo edición
  const handleEditar = (producto) => {
    setEditingProduct(producto);
    setForm({
      nombre: producto.nombre || "",
      descripcion: producto.descripcion || "",
      precio:
        producto.precio !== null && producto.precio !== undefined
          ? String(producto.precio)
          : "",
      stock:
        producto.stock !== null && producto.stock !== undefined
          ? String(producto.stock)
          : "",
      categoria: producto.categoria || "",
      puntosBase:
        producto.puntosBase !== null && producto.puntosBase !== undefined
          ? String(producto.puntosBase)
          : "",
      descuentoPct:
        producto.descuentoPct !== null &&
        producto.descuentoPct !== undefined
          ? String(producto.descuentoPct)
          : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Eliminar producto
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) {
      return;
    }

    setError("");
    setMensaje("");

    try {
      const token = getToken();
      if (!token) {
        setError(
          "No se encontró token de autenticación. Inicia sesión nuevamente."
        );
        return;
      }

      await eliminarProducto(id, token);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      setMensaje("Producto eliminado correctamente.");
    } catch (err) {
      setError(err.message || "Error al eliminar producto.");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-2">Panel de administración</h2>
      <p className="text-muted">
        Desde aquí puedes crear, editar y eliminar los productos que aparecen en
        la tienda.
      </p>

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}
      {mensaje && (
        <Alert variant="success" className="mt-2">
          {mensaje}
        </Alert>
      )}

      <Row className="mt-4">
        {/* Formulario Crear / Editar */}
        <Col md={5} className="mb-4">
          <h3 className="h5 mb-3">
            {editingProduct ? "Editar producto" : "Crear producto"}
          </h3>

          {editingProduct && (
            <Alert variant="info" className="py-2">
              Editando: <strong>{editingProduct.nombre}</strong>{" "}
              <Button
                size="sm"
                variant="outline-secondary"
                className="ms-2"
                onClick={handleCancelarEdicion}
              >
                Cancelar edición
              </Button>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder='Ej: "PlayStation 5", "Catan"'
              />
              <Form.Text muted>
                Nombre que verán los usuarios en el catálogo.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                required
                placeholder="Descripción breve del producto."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio (CLP)</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                min="0"
                step="100"
                value={form.precio}
                onChange={handleChange}
                required
                placeholder="Ej: 1200000"
              />
              <Form.Text muted>
                Precio en pesos chilenos. Se mostrará en el catálogo y en el
                carrito.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock disponible</Form.Label>
              <Form.Control
                name="stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                required
                placeholder="Cantidad disponible"
              />
              <Form.Text muted>
                Unidades disponibles del producto en inventario.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                name="categoria"
                type="text"
                value={form.categoria}
                onChange={handleChange}
                required
                placeholder='Ej: "consolas", "accesorios", "juegos-de-mesa"...'
              />
              <Form.Text muted>
                La categoría se usa para los filtros del catálogo.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Puntos base</Form.Label>
              <Form.Control
                name="puntosBase"
                type="number"
                min="0"
                step="1"
                value={form.puntosBase}
                onChange={handleChange}
                placeholder="Ej: 300 (puede ser 0)"
              />
              <Form.Text muted>
                Puntos Level-Up que genera este producto. Si no aplica, deja 0.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descuento (%)</Form.Label>
              <Form.Control
                name="descuentoPct"
                type="number"
                min="0"
                max="100"
                step="1"
                value={form.descuentoPct}
                onChange={handleChange}
                placeholder="Ej: 10 para 10% (puede ser 0)"
              />
              <Form.Text muted>
                Porcentaje de descuento asociado (0 a 100). Se puede usar para
                promociones especiales.
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="success" disabled={loading}>
                {loading
                  ? "Guardando..."
                  : editingProduct
                  ? "Guardar cambios"
                  : "Crear producto"}
              </Button>

              {editingProduct && (
                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handleCancelarEdicion}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </Form>
        </Col>

        {/* Tabla de productos */}
        <Col md={7}>
          <h3 className="h5 mb-3">Productos existentes</h3>

          {productos.length === 0 ? (
            <p className="text-muted">
              Aún no hay productos registrados en la base de datos.
            </p>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              size="sm"
              className="align-middle"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Puntos</th>
                  <th>Desc. %</th>
                  <th style={{ width: "140px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  const precioMostrar = Number(p.precio).toLocaleString(
                    "es-CL"
                  );
                  return (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.nombre}</td>
                      <td>${precioMostrar}</td>
                      <td>{p.stock}</td>
                      <td>{p.categoria}</td>
                      <td>{p.puntosBase ?? 0}</td>
                      <td>{p.descuentoPct ?? 0}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditar(p)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminar(p.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminUser;
