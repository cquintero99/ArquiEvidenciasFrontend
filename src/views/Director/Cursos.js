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
import { listaCursos, saveCurso } from "views/fetch/Director/CursosApi";
import DataTable from "react-data-table-component";

const Tables = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

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
  }
  useEffect(() => {
    obtenerCursos();
  }, []);
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
        <i className="fa fa-eye" onClick={() => handleOpciones(row)} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // Puedes agregar más columnas aquí si lo deseas
  ];
  const handleOpciones = (curso) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
    console.log("Opciones del curso:", curso);
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
    setCurso((prevCurso) => ({ ...prevCurso, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos del curso, como enviarlos a una API, etc.
    console.log(curso);
    saveCurso(curso)
    .then(response=>response)
    .then(data=>{
        console.log(data)
        obtenerCursos()
    toggle()
    })
    .catch((err) => console.log(err));
    
    // Luego puedes resetear el formulario si lo deseas
    /*
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
    */
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
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <h3>Registrar un curso</h3>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="codigo">Código</Label>
                  <Input
                    type="text"
                    name="codigo"
                    id="codigo"
                    value={curso.codigo}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
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
                  <Label for="horaPractica">Horas Prácticas</Label>
                  <Input
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
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
                    type="text"
                    name="tipoCredito"
                    id="tipoCredito"
                    value={curso.tipoCredito}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="horaPractica">Tipo Curso</Label>
                  <Input
                    type="text"
                    name="tipoCurso"
                    id="tipoCurso"
                    value={curso.tipoCurso}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              {/* Repite los FormGroup para el resto de los campos */}
              <Col md={12}>
                <FormGroup className="text-center">
                  <Button type="submit" color="success">
                    Registrar Curso
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Salir
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
