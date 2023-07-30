
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
  FormText,
  Col,
  CardFooter,
  CardBody
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { listProfesores } from "views/fetch/ProfesorApi.js";
import DataTable from "react-data-table-component";

const Tables = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [profesor, setProfesor] = useState(null); // Estado para almacenar el estudiante seleccionado
  const [modalProfesor, setModalProfesor] = useState(false);
  const toggleProfesor = () => setModalProfesor(!modalProfesor);

  useEffect(() => {
    const obtenerProfesores = async () => {
      try {
        const response = await listProfesores();
        const data = await response.json();
        setProfesores(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener profesores:", error);
        setLoading(false);
      }
    };
    obtenerProfesores();
  }, []);
  const columns = [
    { name: "Nombre", selector: "usuario.nombre", sortable: true },
    { name: "Codigo", selector: "usuario.codigo", sortable: true },
    {
      name: "Correo Institucional",
      selector: "usuario.correoInstitucional",
      sortable: true,
    },
    // { name: "Estado Matricula", selector: "estadoMatricula", sortable: true },
    {
      name: "Ver",
      cell: (row) => (
        <i className="fa fa-eye" onClick={() => handleOpciones(row)} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // Puedes agregar más columnas aquí si lo deseas
  ];
  const handleOpciones = (profesor) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
   
    setProfesor(profesor)
    toggleProfesor()
    console.log("Opciones del profesor:", profesor);
  };
  // Filtrar los datos en base al término de búsqueda
  const filteredProfesores = profesores.filter((profesor) =>
    profesor.usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
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
                <h3 className="mb-0">Lista Profesores</h3>
                <Button color="danger" onClick={toggle} className="ml-auto">
                  Carga Masiva
                </Button>
              </CardHeader>
              {loading ? (
                <p className="text-center ">Cargando profesores...</p>
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
                        placeholder="Buscar por nombre..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <DataTable
                    columns={columns}
                    data={filteredProfesores}
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
      {/*Modal Ver Profesor*/ }
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalProfesor}
        toggle={toggleProfesor}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Datos del Profesor</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-3 py-lg-2">
              {profesor && ( // Comprueba si hay un estudiante seleccionado antes de mostrar sus detalles
                <>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <Label for="labelEstudiante">Nombre Completo</Label>
                        <Input
                          disabled
                          value={profesor.usuario.nombre}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Celular</Label>
                        <Input
                          disabled
                          value={profesor.usuario.celular}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="8">
                      <FormGroup>
                        <Label for="labelEstudiante">
                          Correo Institucional
                        </Label>
                        <Input
                          disabled
                          value={profesor.usuario.correoInstitucional}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Código</Label>
                        <Input
                          disabled
                          value={profesor.usuario.codigo}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="6">
                      <FormGroup>
                        <Label for="labelEstudiante">Departamento</Label>
                        <Input
                          disabled
                          value={profesor.departamento}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="labelEstudiante">Tipo de Vinculacion</Label>
                        <Input
                          disabled
                          value={profesor.tipoVinculacion}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  

                
                </>
              )}
            </CardBody>
            <CardFooter>
              <div className="text-center">
                <Button
                  className="my-0 text-white"
                  type="button"
                  color="default"
                  onClick={toggleProfesor}
                >
                  Cerrar
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Modal>
      {/* Modal Carga Masiva Profesores*/ }
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Carga masiva de profesores</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleFile">Ingrese el archivo en formato Excel</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            <FormText>Debe tene los siguientes datos.</FormText>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success">Cargar</Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
