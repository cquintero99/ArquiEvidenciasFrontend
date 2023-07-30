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
  CardBody,
  CardFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import "assets/css/style.css";
import {
  listaEstudiantes,
  cargaMasiva,
} from "views/fetch/Director/EstudianteApi";
import DataTable from "react-data-table-component";
import {
  customStyles,
  customTheme,
} from "components/Datatable/DatatableCustom";
import { Badge } from "reactstrap";
import Swal from "sweetalert2";

const Estudiantes = () => {
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

  //Columnas de la cabecera de la table
  const columns = [
    {
      name: "Codigo",
      cell: (row) => {
        const badgeContent =
          row.estadoMatricula === "MATRICULADO" ? (
            <Badge color="" className="badge-dot">
              <i className="bg-success" />
            </Badge>
          ) : (
            <Badge color="" className="badge-dot">
              <i className="bg-danger" />
            </Badge>
          );

        return (
          <>
            <div style={{ display: "flex", alignItems: "center" }}>
              {badgeContent}
              <span style={{ marginLeft: "10px" }}>{row.usuario.codigo}</span>
            </div>
          </>
        );
      },
    },
    {
      name: "Nombre",
      cell: (row) => row.usuario.nombre,
      selector: (row) => row.usuario.nombre,
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
          className="fa fa-eye text-muted"
          onClick={() => handleOpciones(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //Obtengo los datos del estudiante
  const handleOpciones = (estudiante) => {
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

  //Vaciar el file seleccionado
  const handleModalClosed = () => {
    setFileName("");
  };

  // Filtrar los datos en base al término de búsqueda
  const filteredEstudiantes = estudiantes.filter((estudiante) =>
    estudiante.usuario.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  // Carga masiva Estudiantes
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
        Swal.fire({
          icon: "success",
          title: "¡Completado!",
          text: "La carga de estudiantes se ha completado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
        obtenerEstudiantes();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error.",
          text: "Por favor, verifica el archivo y vuelve a intentarlo.",
          confirmButtonText: "Aceptar",
        });
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
                <h2 className="mb-0">Gestionar Estudiantes</h2>
                <Button color="danger" onClick={toggle} className="ml-auto">
                  Carga Masiva
                </Button>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <p className="text-center ">Cargando estudiantes...</p>
                ) : (
                  <>
                    <FormGroup row className="justify-content-end mr-2">
                      <Label for="filtro" sm={3} className="text-center">
                        Buscador:
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          className=""
                          placeholder="Buscar por código..."
                          value={filtro}
                          onChange={(e) => setFiltro(e.target.value)}
                        />
                      </Col>
                    </FormGroup>
                    {/* Data table react component */}
                    <DataTable
                      theme={customTheme}
                      customStyles={customStyles}
                      columns={columns}
                      data={filteredEstudiantes}
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
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>

      {/* Modal carga masiva */}
      <Modal
        className="modal-dialog-centered modal-danger"
        contentClassName="bg-danger"
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
                  <label
                    htmlFor="fileExcel"
                    className="input-file bg-white text-dark"
                  >
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
            <Button className="text-white" color="default" onClick={toggle}>
              Salir
            </Button>
            <Button className="btn-white" color="default" type="submit">
              Cargar
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Modal datos del estudiante */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalEstudiante}
        toggle={toggleEstudiante}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Datos del Estudiante</h2>
              </div>
            </CardHeader>
            <CardBody className="px-lg-3 py-lg-2">
              {estudiante && ( // Comprueba si hay un estudiante seleccionado antes de mostrar sus detalles
                <>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="labelEstudiante">Nombre Completo</Label>
                        <Input
                          disabled
                          value={estudiante.usuario.nombre}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="labelEstudiante">
                          Correo Institucional
                        </Label>
                        <Input
                          disabled
                          value={estudiante.usuario.correo}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Código</Label>
                        <Input
                          disabled
                          value={estudiante.usuario.codigo}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="selectTipoDocumento">
                          Tipo de Documento
                        </Label>
                        <Input
                          disabled
                          type="select"
                          id="selectTipoDocumento"
                          value={estudiante.tipoDocumento}
                          className="text-center"
                        >
                          <option value="CC">Cedula Ciudadania</option>
                          <option value="PA">Pasaporte</option>
                          <option value="TI">Tarjeta Identidad</option>
                          <option value="CE">Cedula extranjeria</option>
                          <option value="Vi">Otro</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Documento</Label>
                        <Input
                          disabled
                          value={estudiante.documento}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Celular</Label>
                        <Input
                          disabled
                          value={estudiante.usuario.celular}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="labelEstudiante">Estado Matricula</Label>
                        <Input
                          disabled
                          value={estudiante.estadoMatricula}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label for="labelEstudiante">Semestre</Label>
                        <Input
                          disabled
                          value={estudiante.semestre}
                          type="text"
                          className="text-center"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <Label for="labelEstudiante">Pensum</Label>
                        <Input
                          disabled
                          value={estudiante.pensum}
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
                  onClick={toggleEstudiante}
                >
                  Cerrar
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Estudiantes;
