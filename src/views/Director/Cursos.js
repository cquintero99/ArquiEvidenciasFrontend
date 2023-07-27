// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  Modal,
  FormGroup,
  Label,
  Input,
  Form,
  Col,
  CardFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {
  listaCursos,
  saveCurso,
  updateCurso,
} from "views/fetch/Director/CursosApi";
import DataTable from "react-data-table-component";
import { customStyles, customTheme } from "components/Datatable/DatatableCustom"
import { BsPencilSquare, BsPen } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import Swal from 'sweetalert2'

const Cursos = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
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

    setModal(!modal);
  }

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [modalCurso, setModalCurso] = useState(false);

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
    { name: "Codigo", selector: "codigo", sortable: true },
    { name: "Nombre", selector: "nombre", sortable: true },
    {
      name: "Creditos",
      selector: "credito",
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <h3 onClick={() => handleOpciones(row)}><BsPencilSquare /></h3>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleOpciones = (curso) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
    toggleCurso();
    setCurso(curso);
  };
  const handleSubmitActualizar = (e) => {
    e.preventDefault();
    updateCurso(curso)
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: '¡Cambios Guardados!',
          text: 'El curso ha sido modificado con éxito.',
          showConfirmButton: false,
          timer: 1500
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'codigo') {
      const regex = /^[0-9]*$/; // Expresión regular para verificar si solo contiene números del 0 al 9
      if (!regex.test(value)) {
        return;
      }
    }

    if (name === 'nombre') {
      const newValue = value.toUpperCase();
      setCurso((prevCurso) => ({ ...prevCurso, [name]: newValue }));
      return;
    }

    setCurso((prevCurso) => ({ ...prevCurso, [name]: value }));
  };

  //Guardo un curso
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del curso, como enviarlos a una API, etc.

    saveCurso(curso)
      .then((response) => response)
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: '¡Completado!',
          text: 'El curso ha sido guardado con éxito.',
          showConfirmButton: false,
          timer: 1500
        });
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

  // Función para habilitar los campos del formulario
  const habilitarCampos = () => {
    const inputs = document.querySelectorAll('input, select'); // Obtener todos los inputs y selects dentro del formulario
    inputs.forEach((input) => (input.disabled = false)); // Habilitar cada input y select
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
                <Button color="danger" onClick={toggle} className="ml-auto text-white">
                  <IoMdAddCircle /> Nuevo Curso
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

                  <DataTable theme={customTheme} customStyles={customStyles}
                    columns={columns}
                    data={filteredCursos}
                    pointerOnHover
                    responsive
                    highlightOnHover
                    search // Activa la búsqueda
                    noDataComponent="No se encontraron registros para mostrar."
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

      {/* Modal editar curso */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalCurso}
        toggle={toggleCurso}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div className="text-muted text-center mt-2 mb-3" style={{ flex: 1, textAlign: 'center' }}>
                <h2>Modificar Curso</h2>
              </div>
              <button
                style={{
                  backgroundColor: 'transparent', // Color de fondo del botón transparente
                  border: 'none',
                }}
                onClick={habilitarCampos}
              >
                <BsPen style={{ fontSize: '20px', color: '#333' }} />
              </button>
            </CardHeader>
            <Form onSubmit={handleSubmitActualizar}>
              <CardBody className="px-lg-3 py-lg-2">
                {curso && (
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="codigo">Código</Label>
                        <Input
                          type="text"
                          name="codigo"
                          id="codigo"
                          maxLength={7}
                          value={curso.codigo}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={10}>
                      <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input
                          type="text"
                          name="nombre"
                          id="nombre"
                          value={curso.nombre}
                          onChange={handleChange}
                          maxLength={255}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaTeorica">Tipo Credito</Label>
                        <Input
                          type="select"
                          name="tipoCredito"
                          id="tipoCredito"
                          value={curso.tipoCredito}
                          onChange={handleChange}
                          required
                          disabled
                        >
                          <option value="">Seleccionar...</option>
                          <option value="1">TEÓRICO</option>
                          <option value="2">PRÁCTICO</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaPractica">Tipo Curso</Label>
                        <Input
                          type="select"
                          name="tipoCurso"
                          id="tipoCurso"
                          value={curso.tipoCurso}
                          onChange={handleChange}
                          required
                          disabled
                        >
                          <option value="">Seleccionar...</option>
                          <option value="1">ELECTIVO</option>
                          <option value="2">OBLIGATORIO</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaPractica">Horas Prácticas</Label>
                        <Input
                          type="number"
                          name="horaPractica"
                          id="horaPractica"
                          value={curso.horaPractica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaTeorica">Horas Teoricas</Label>
                        <Input
                          type="number"
                          name="horaTeorica"
                          id="horaTeorica"
                          value={curso.horaTeorica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaPractica">H Teoricas Prácticas</Label>
                        <Input
                          type="number"
                          name="horaTeoricaPractica"
                          id="horaTeoricaPractica"
                          value={curso.horaTeoricaPractica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="credito">Creditos</Label>
                        <Input
                          type="number"
                          name="credito"
                          id="credito"
                          value={curso.credito}
                          max={9}
                          min={1}
                          onChange={handleChange}
                          required
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}

              </CardBody>
              <CardFooter className="d-flex justify-content-between">
                <Button className="btn-white" color="default" onClick={toggleCurso}>
                  Cerrar
                </Button>
                <Button className="text-white" color="default" type="submit">
                  Guardar Cambios
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </div>
      </Modal>

      {/* Modal agregar curso */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Nuevo Curso</h2>
              </div>
            </CardHeader>

            <Form onSubmit={handleSubmit}>
              <CardBody className="px-lg-3 py-lg-2">
                {curso && (
                  <Row>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="codigo">Código</Label>
                        <Input
                          type="text"
                          name="codigo"
                          id="codigo"
                          maxLength={7}
                          value={curso.codigo}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={10}>
                      <FormGroup>
                        <Label for="nombre">Nombre</Label>
                        <Input
                          type="text"
                          name="nombre"
                          id="nombre"
                          value={curso.nombre}
                          onChange={handleChange}
                          maxLength={255}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
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
                          <option value="">Seleccionar...</option>
                          <option value="1">TEÓRICO</option>
                          <option value="2">PRÁCTICO</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
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
                          <option value="">Seleccionar...</option>
                          <option value="1">ELECTIVO</option>
                          <option value="2">OBLIGATORIO</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaPractica">Horas Prácticas</Label>
                        <Input
                          type="number"
                          name="horaPractica"
                          id="horaPractica"
                          value={curso.horaPractica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaTeorica">Horas Teoricas</Label>
                        <Input
                          type="number"
                          name="horaTeorica"
                          id="horaTeorica"
                          value={curso.horaTeorica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="horaPractica">H Teoricas Prácticas</Label>
                        <Input
                          type="number"
                          name="horaTeoricaPractica"
                          id="horaTeoricaPractica"
                          value={curso.horaTeoricaPractica}
                          onChange={handleChange}
                          max={20}
                          min={1}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="credito">Creditos</Label>
                        <Input
                          type="number"
                          name="credito"
                          id="credito"
                          value={curso.credito}
                          max={9}
                          min={1}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}

              </CardBody>
              <CardFooter className="d-flex justify-content-between">
                <Button className="btn-white" color="default" onClick={toggle}>
                  Cerrar
                </Button>
                <Button className="text-white" color="default" type="submit">
                  Guardar
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Cursos;
