/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import "assets/css/style.css";
import {
  listaEstudiantes,
  cargaMasiva,
} from "views/fetch/Director/EstudianteApi";
import DataTable from "react-data-table-component";
const Tables = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalEstudiante, setModalEstudiente] = useState(false);
  const [estudiante, setEstudiante] = useState(null); // Estado para almacenar el estudiante seleccionado
  const toggleEstudiante = () => setModalEstudiente(!modalEstudiante);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [fileName, setFileName] = useState("");
  const obtenerEstudiantes = async () => {
    try {
      const response = await listaEstudiantes();
      const data = await response.json();
      // Aquí tienes acceso al arreglo de estudiantes

      setEstudiantes(data); // Guardamos los datos en el estado para poder utilizarlos en el JSX
      setLoading(false); // Cambiamos el estado a "false" una vez que se obtienen los datos
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      setLoading(false); // En caso de error, también cambiamos el estado a "false"
    }
  };
  useEffect(() => {
    obtenerEstudiantes();
  }, []);
  const columns = [
    {
      name: "Nombre",
      cell: (row) => row.usuario.nombre,
      selector: (row) => row.usuario.nombre,
      sortable: true,
    },
    {
      name: "Codigo",
      cell: (row) => row.usuario.codigo,
      selector: (row) => row.usuario.codigo,
      sortable: true,
    },
    {
      name: "Correo Institucional",
      cell: (row) => row.usuario.correo,
      selector: (row) => row.usuario.correo,
      sortable: true,
    },
    {
      name: "Estado Matricula",
      cell: (row) => row.estadoMatricula,
      selector: (row) => row.estadoMatricula,
      sortable: true,
    },
    {
      name: "Ver",
      cell: (row) => (
        <i
          className="fa fa-eye text-danger"
          onClick={() => handleOpciones(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // Puedes agregar más columnas aquí si lo deseas
  ];

  //Obtengo los datos del estudiante
  const handleOpciones = (estudiante) => {
    //Abro el modal
    toggleEstudiante();
    setEstudiante(estudiante);
  };

  // Función para actualizar el nombre del archivo seleccionado
  const showFileName = (event) => {
    const input = event.target;
    if (input.files.length > 0) {
      setFileName(input.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleModalClosed = () => {
    setFileName("");
  };

  // Filtrar los datos en base al término de búsqueda

  const filteredEstudiantes = estudiantes.filter((estudiante) =>
    estudiante.usuario.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  //Carga masiva Estudiantes
  const handelSubmitCargaMasiva = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fileExcel = formData.get("file");

    const formDataFile = new FormData();
    formDataFile.append("archivo", fileExcel);
    cargaMasiva(formDataFile)
      .then((response) => response)
      .then((data) => {
        toggle();
        obtenerEstudiantes();
      })
      .catch((err) => console.log(err));
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
                <h3 className="mb-0">Lista Estudiantes</h3>
                <Button color="danger" onClick={toggle} className="ml-auto">
                  Carga Masiva
                </Button>
              </CardHeader>
              {loading ? (
                <p className="text-center ">Cargando estudiantes...</p>
              ) : (
                <>
                  <FormGroup row>
                    <Label for="filtro" sm={2} className="text-center">
                      Buscador
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
                    data={filteredEstudiantes}
                    striped
                    pointerOnHover
                    highlightOnHover
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

      {/* Modal carga masiva */}
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={modal}
        toggle={toggle}
        onClosed={handleModalClosed}
      >
        <ModalHeader toggle={toggle}>
          <h6 className="modal-title" id="modal-title-notification">
            Proceso de actualización de usuarios
          </h6>
        </ModalHeader>
        <Form role="form" onSubmit={handelSubmitCargaMasiva}>
          <ModalBody>
            <div className="py-3 text-center">
              <i className="ni ni-cloud-upload-96 ni-3x" />
              <h4 className="heading mt-4">Carga masiva de estudiantes</h4>
              <p>
                A continuación debe seleccionar el archivo excel con el listado
                de estudiantes.
              </p>
            </div>
            <div class="input-file-container">
              <FormGroup>
                <div className="input-file-container">
                  <input
                    id="fileExcel"
                    name="file"
                    type="file"
                    accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    className="input-file"
                    onChange={showFileName} // Actualizar el estado con el nombre del archivo seleccionado
                  />
                  <label htmlFor="fileExcel" className="input-file">
                    Seleccionar archivo
                  </label>
                  {/* Mostrar el nombre del archivo seleccionado */}
                  {fileName && <span>{fileName}</span>}
                </div>
                <FormText className="text-white">
                  Archivo excel de formato xlsx.
                </FormText>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <Button className="text-white" color="link" onClick={toggle}>
              Salir
            </Button>
            <Button className="btn-white" color="default" type="submit">
              Cargar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Modal isOpen={modalEstudiante} toggle={toggleEstudiante}>
        <ModalHeader toggle={toggleEstudiante}>
          <h1>Informacion del estudiante</h1>
        </ModalHeader>
        <ModalBody className="text-dark fw-bold  ">
          {estudiante && ( // Comprueba si hay un estudiante seleccionado antes de mostrar sus detalles
            <>
              <p>
                <strong>Nombre:</strong> {estudiante.usuario.nombre}
              </p>
              <p>
                <strong>Código:</strong> {estudiante.usuario.codigo}
              </p>
              <p>
                <strong>Tipo de documento:</strong> {estudiante.tipoDocumento}
              </p>

              <p>
                <strong>Documento:</strong> {estudiante.documento}
              </p>
              <p>
                <strong>Estado de matrícula:</strong>{" "}
                {estudiante.estadoMatricula}
              </p>
              <p>
                <strong>Pensum:</strong> {estudiante.pensum}
              </p>
              <p>
                <strong>Semestre:</strong> {estudiante.semestre}
              </p>

              <p>
                <strong>Celular:</strong> {estudiante.usuario.celular}
              </p>

              <p>
                <strong>Correo:</strong> {estudiante.usuario.correo}
              </p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleEstudiante}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Tables;
