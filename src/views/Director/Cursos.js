// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {
  listaCursos,
  saveCurso,
  updateCurso,
} from "views/fetch/Director/CursosApi";
import DataTable from "react-data-table-component";

const Tables = () => {
  //Modal Guardar Curso
  const [modal, setModal] = useState(false);
  //Abrir Modal guardr curso
  const toggle = () => setModal(!modal);
  //Lista de Cursos
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  //Modal Actualizar Curso
  const [modalCurso, setModalCurso] = useState(false);
  //const [updateCurso, setupdateCurso] = useState(null); // Estado para almacenar el estudiante seleccionado
  const toggleCurso = () => {
    // Aquí, antes de cambiar el estado de modalCurso, puedes llamar a setCurso para reiniciar el estado del objeto 'curso'
    setCurso({
      codigo: "",
      nombre: "",
      horaPractica: "",
      horaTeorica: "",
      horaTeoricaPractica: "",
      credito: "",
      tipoCredito: "",
      tipoCurso: "",
    });
    // Luego, cambias el estado de modalCurso
    setModalCurso(!modalCurso);
  };
  //Obtener lista de cursos
  const obtenerCursos = async () => {
    try {
      const response = await listaCursos();
      const data = await response.json();
      setCursos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los Cursos:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    obtenerCursos();
  }, []);
  //Columnas de la Datatable
  const columns = [
    { name: "Nombre", selector: "nombre", sortable: true },
    { name: "Codigo", selector: "codigo", sortable: true },
    {
      name: "Creditos",
      selector: "credito",
      sortable: true,
    },
    // { name: "Estado Matricula", selector: "estadoMatricula", sortable: true },
    {
      name: "Ver",
      cell: (row) => (
        <p
          className="btn bg-danger text-white"
          onClick={() => handleOpciones(row)}
        >
          Actualizar
        </p>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px", // Ajusta el valor para cambiar el ancho de la columna
    },
    // Puedes agregar más columnas aquí si lo deseas
  ];

  const handleOpciones = (curso) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
    toggleCurso();
    setCurso(curso);
    console.log("Opciones del curso:", curso);
  };
  const handleSubmitActualizar = (e) => {
    e.preventDefault();
    updateCurso(curso)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        obtenerCursos();
        toggleCurso();
      })
      .catch((err) => console.log(err));
  };

  // Filtrar los datos en base al término de búsqueda
  const filteredCursos = cursos.filter((curso) =>
    curso.codigo.includes(filtro.toLowerCase())
  );

  const [curso, setCurso] = useState({
    codigo: "",
    nombre: "",
    horaPractica: "",
    horaTeorica: "",
    horaTeoricaPractica: "",
    credito: "",
    tipoCredito: "",
    tipoCurso: "",
  });

  //Obtener datos del formulario guardar curso
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prevCurso) => ({ ...prevCurso, [name]: value }));
  };
  //Guardo un curso
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del curso, como enviarlos a una API, etc.

    saveCurso(curso)
      .then((response) => response)
      .then((data) => {
        obtenerCursos();
        toggle();
      })
      .catch((err) => console.log(err));

    // Luego puedes resetear el formulario si lo deseas

    setCurso({
      codigo: "",
      nombre: "",
      horaPractica: "",
      horaTeorica: "",
      horaTeoricaPractica: "",
      credito: "",
      tipoCredito: "",
      tipoCurso: "",
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className=" border-0 d-flex">
                <h3 className="mb-0">Lista Cursos</h3>
                <Button color="danger" onClick={toggle} className="ml-auto">
                  Registrar Curso
                </Button>
              </CardHeader>
              {loading ? (
                <p className="text-center ">Cargando Cursos...</p>
              ) : (
                <>
                  <FormGroup row>
                    <Label for="filtro" sm={2} className="text-center">
                      Filtro
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        className=""
                        placeholder="Buscar por codigo..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <DataTable
                    columns={columns}
                    data={filteredCursos}
                    search // Activa la búsqueda
                    pagination // Activa la paginación
                    paginationComponentOptions={{
                      rowsPerPageText: "Filas por página:",
                      rangeSeparatorText: "de",
                      selectAllRowsItem: true,
                      selectAllRowsItemText: "Todos",
                      selectAllRowsItemShow: true,
                    }}
                  />
                </>
              )}
            </Card>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modalCurso} toggle={toggleCurso} size="lg">
        <ModalHeader toggle={toggleCurso}>
          <h1>Actualizar Curso</h1>
        </ModalHeader>
        <ModalBody className="text-dark fw-bold  ">
          <Form onSubmit={handleSubmitActualizar}>
            {curso && (
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label for="nombre">Nombre</Label>
                    <Input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={curso.nombre}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="codigo">Código</Label>
                    <Input
                      type="number"
                      name="codigo"
                      id="codigo"
                      value={curso.codigo}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="horaPractica">Horas Prácticas</Label>
                    <Input
                      type="number"
                      name="horaPractica"
                      id="horaPractica"
                      value={curso.horaPractica}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="horaTeorica">Horas Teoricas</Label>
                    <Input
                      type="number"
                      name="horaTeorica"
                      id="horaTeorica"
                      value={curso.horaTeorica}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="horaPractica">Horas Teoricas Prácticas</Label>
                    <Input
                      type="number"
                      name="horaTeoricaPractica"
                      id="horaTeoricaPractica"
                      value={curso.horaTeoricaPractica}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="credito">Credito</Label>
                    <Input
                      type="number"
                      name="credito"
                      id="credito"
                      value={curso.credito}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="horaTeorica">Tipo Credito</Label>
                    <Input
                      type="select"
                      name="tipoCredito"
                      id="tipoCredito"
                      value={curso.tipoCredito}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Teórico</option>
                      <option value="2">Práctico</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="horaPractica">Tipo Curso</Label>
                    <Input
                      type="select"
                      name="tipoCurso"
                      id="tipoCurso"
                      value={curso.tipoCurso}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1">Electivo</option>
                      <option value="2">Obligatorio</option>
                    </Input>
                  </FormGroup>
                </Col>
                {/* Repite los FormGroup para el resto de los campos */}
                <Col md={12}>
                  <FormGroup className="text-center">
                    <Button type="submit" color="success">
                      Actualizar Curso
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            )}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleCurso}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <h1>Registrar un curso</h1>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                <FormGroup>
                  <Label for="nombre">Nombre</Label>
                  <Input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={curso.nombre}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="codigo">Código</Label>
                  <Input
                    type="number"
                    name="codigo"
                    id="codigo"
                    value={curso.codigo}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaPractica">Horas Prácticas</Label>
                  <Input
                    type="number"
                    name="horaPractica"
                    id="horaPractica"
                    value={curso.horaPractica}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaTeorica">Horas Teoricas</Label>
                  <Input
                    type="number"
                    name="horaTeorica"
                    id="horaTeorica"
                    value={curso.horaTeorica}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaPractica">Horas Teoricas Prácticas</Label>
                  <Input
                    type="number"
                    name="horaTeoricaPractica"
                    id="horaTeoricaPractica"
                    value={curso.horaTeoricaPractica}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="credito">Credito</Label>
                  <Input
                    type="number"
                    name="credito"
                    id="credito"
                    value={curso.credito}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaTeorica">Tipo Credito</Label>
                  <Input
                    type="select"
                    name="tipoCredito"
                    id="tipoCredito"
                    value={curso.tipoCredito}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="1">Teórico</option>
                    <option value="2">Práctico</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaPractica">Tipo Curso</Label>
                  <Input
                    type="select"
                    name="tipoCurso"
                    id="tipoCurso"
                    value={curso.tipoCurso}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="1">Electivo</option>
                    <option value="2">Obligatorio</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* Repite los FormGroup para el resto de los campos */}
              <Col md={12}>
                <FormGroup className="text-center">
                  <Button type="submit" color="success">
                    Registrar Curso
                  </Button>
                  
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={toggle}>
                    Salir
                  </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
