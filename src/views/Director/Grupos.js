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
import { listaCursos } from "views/fetch/Director/CursosApi";
import {
  listaGrupos,
  saveGrupo,
  updateGrupo,
} from "views/fetch/Director/GrupoApi";

import { listaProfesores } from "../fetch/Director/ProfesorApi";
import DataTable from "react-data-table-component";
import {
  customStyles,
  customTheme,
} from "components/Datatable/DatatableCustom";
import { BsPencilSquare, BsPen } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import Swal from "sweetalert2";

const Grupos = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setGrupo({
      id: "",
      descripcion: "",
      anioAcademico: "",
      semestreAcademico: "",
      codigoGrupo: "",
      profesor: {
        id: "",
        tipoVinculacion: "",
        departamento: "",
        correoPersonal: "",
        usuario: {
          id: "",
          nombre: "",
          codigo: "",
          celular: "",
          correoInstitucional: "",
          estado: "",
          correoConfirmado: "",
          fechaRegistro: "",
        },
      },
      curso: {
        id: "",
        codigo: "",
        nombre: "",
        horaPractica: "",
        horaTeorica: "",
        horaTeoricaPractica: "",
        credito: "",
        tipoCredito: "",
        tipoCurso: "",
      },
      microcurriculo: "",
    });
    setModal(!modal);
  };

  const [grupos, setGrupos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [modalGrupo, setModalGrupo] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [grupo, setGrupo] = useState({
    id: "",
    descripcion: "",
    anioAcademico: "",
    semestreAcademico: "",
    codigoGrupo: "",
    profesor: {
      id: "",
      tipoVinculacion: "",
      departamento: "",
      correoPersonal: "",
      usuario: {
        id: "",
        nombre: "",
        codigo: "",
        celular: "",
        correoInstitucional: "",
        estado: "",
        correoConfirmado: "",
        fechaRegistro: "",
      },
    },
    curso: {
      id: "",
      codigo: "",
      nombre: "",
      horaPractica: "",
      horaTeorica: "",
      horaTeoricaPractica: "",
      credito: "",
      tipoCredito: "",
      tipoCurso: "",
    },
    microcurriculo: "",
  });

  const toggleGrupo = () => {
    // Aquí, antes de cambiar el estado de modalCurso, puedes llamar a setCurso para reiniciar el estado del objeto 'curso'

    // Luego, cambias el estado de modalCurso
    setModalGrupo(!modalGrupo);
  };
  //Obtener lista de cursos
  const obtenerGrupos = async () => {
    try {
      const response = await listaGrupos();
      const data = await response.json();
      setGrupos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los Cursos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerGrupos();
  }, []);
  //Obtener lista de profesores
  const obtenerProfesores = async () => {
    try {
      const response = await listaProfesores();
      const data = await response.json();
      setProfesores(data);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    obtenerProfesores();
  }, []);
  //Obtener lista de cursos
  const obtenerCursos = async () => {
    try {
      const response = await listaCursos();
      const data = await response.json();
      setCursos(data);
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
    {
      name: "Código",
      selector: (row) => `${row.curso.codigo}-${row.codigoGrupo}`,
      sortable: true,
    },
    {
      name: "Curso",
      selector: (row) => row.curso.nombre,
      sortable: true,
    },

    { name: "Descripcion", selector: (row) => row.descripcion, sortable: true },
    {
      name: "Profesor",
      selector: (row) => row.profesor.usuario.codigo,
      sortable: true,
    },
    {
      name: "Año ",
      selector: (row) => `${row.anioAcademico} - ${row.semestreAcademico}`,
      sortable: true,
    },

    {
      name: "",
      cell: (row) => (
        <h3 onClick={() => handleOpciones(row)}>
          <BsPencilSquare />
        </h3>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleOpciones = (grupo) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
    toggleGrupo();
    setGrupo(grupo);
    console.log(grupo);
  };
  //   const handleSubmitActualizar = (e) => {
  //     e.preventDefault();
  //     updateCurso(grupo)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "¡Cambios Guardados!",
  //           text: "El curso ha sido modificado con éxito.",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         obtenerCursos();
  //         toggleCurso();
  //       })
  //       .catch((err) => console.log(err));
  //   };

  // Filtrar los datos en base al término de búsqueda
  const filteredGrupos = grupos.filter((grupo) => {
    const filtroLower = filtro.toLowerCase();
    const codigoCurso = grupo.curso.codigo.toLowerCase();
    const codigoGrupo = grupo.codigoGrupo.toLowerCase();

    const searchString = codigoCurso + "-" + codigoGrupo;
    return searchString.includes(filtroLower);
  });

  //Guardo un curso
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(grupo);
    saveGrupo(grupo)
      .then((response) => response.json())
      .then((data) => {
        toggle();
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "¡Completado!",
          text: "El grupo ha sido guardado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
        obtenerGrupos();
      })
      .catch((error) => {
        console.log(error);
        toggle();
        Swal.fire({
          icon: "error",
          title: "¡Upps!",
          text: "El grupo no se puedo guardar.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    // Aquí puedes realizar alguna acción con los datos del curso, como enviarlos a una API, etc.

    // Luego puedes resetear el formulario si lo deseas
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrupo((prevCurso) => ({ ...prevCurso, [name]: value }));
  };

  const handleSubmitActualizar = (e) => {
    e.preventDefault();

    updateGrupo(grupo)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "¡Cambios Guardados!",
          text: "El grupo ha sido modificado con éxito.",
          showConfirmButton: false,
          timer: 1500,
        });
        toggleGrupo();
        obtenerGrupos();
      })
      .catch((error) => {
        console.log(error);
        toggleGrupo();
        Swal.fire({
          icon: "error",
          title: "¡Upps!",
          text: "El grupo no  ha sido modificado .",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Función para habilitar los campos del formulario
  const habilitarCampos = () => {
    const inputs = document.querySelectorAll("input, select, textarea"); // Obtener todos los inputs y selects dentro del formulario
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
                <h3 className="mb-0">Lista Grupos</h3>
                <Button
                  color="danger"
                  onClick={toggle}
                  className="ml-auto text-white"
                >
                  <IoMdAddCircle /> Nuevo Grupo
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
                        placeholder="Buscar por codigo curso..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <DataTable
                    theme={customTheme}
                    customStyles={customStyles}
                    columns={columns}
                    data={filteredGrupos}
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
      {/* Modal editar Grupo */}
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={modalGrupo}
        toggle={toggleGrupo}
      >
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-0 d-flex justify-content-between">
              <div
                className="text-muted text-center mt-2 mb-3"
                style={{ flex: 1, textAlign: "center" }}
              >
                <h2>Modificar Grupo</h2>
              </div>
              <button
                style={{
                  backgroundColor: "transparent", // Color de fondo del botón transparente
                  border: "none",
                }}
                onClick={habilitarCampos}
              >
                <BsPen style={{ fontSize: "20px", color: "#333" }} />
              </button>
            </CardHeader>
            <Form onSubmit={handleSubmitActualizar}>
              <CardBody className="px-lg-3 py-lg-2">
                {grupo && (
                  <>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="exampleText">
                            Descripción
                          </Label>
                          <Input
                            id="descripcion"
                            name="descripcion"
                            type="textarea"
                            value={grupo.descripcion}
                            onChange={handleChange}
                            maxLength={255}
                            rows="3"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label for="anioAcademico">Año Académico</Label>
                          <select
                            name="anioAcademico"
                            id="anioAcademico"
                            class="form-control"
                            value={grupo.anioAcademico}
                            required
                            disabled
                          >
                            <option value="">Seleccionar...</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                          </select>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup>
                          <Label for="semestreAcademico">Semestre Académico</Label>
                          <select
                            name="semestreAcademico"
                            id="semestreAcademico"
                            class="form-control"
                            value={grupo.semestreAcademico}
                            onChange={handleChange}
                            required
                            disabled
                          >
                            <option value="">Seleccionar...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="profesor">Profesor</Label>
                          <Input
                            type="select"
                            name="profesor"
                            id="profesor"
                            value={grupo.profesor.id}
                            onChange={(e) =>
                              setGrupo({
                                ...grupo,
                                profesor: {
                                  ...grupo.profesor,
                                  id: e.target.value,
                                },
                              })
                            }
                            disabled
                            required
                          >
                            <option value="">Seleccionar...</option>
                            {profesores.map((profesor) => (
                              <option key={profesor.id} value={profesor.id}>
                                {profesor.usuario.codigo} -{" "}
                                {profesor.usuario.nombre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="horaPractica">Curso</Label>
                          <Input
                            type="select"
                            name="curso"
                            id="curso"
                            value={grupo.curso.id}
                            onChange={(e) =>
                              setGrupo({
                                ...grupo,
                                curso: { ...grupo.curso, id: e.target.value },
                              })
                            }
                            disabled
                            required
                          >
                            <option value="">Seleccionar...</option>
                            {cursos.map((curso) => (
                              <option key={curso.id} value={curso.id}>
                                {curso.codigo} - {curso.nombre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
              <CardFooter className="d-flex justify-content-between">
                <Button
                  className="btn-white"
                  color="default"
                  onClick={toggleGrupo}
                >
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
      {/* Modal agregar Grupo */}
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
                <h2>Nuevo Grupo</h2>
              </div>
            </CardHeader>

            <Form onSubmit={handleSubmit}>
              <CardBody className="px-lg-3 py-lg-2">
                {grupo && (
                  <>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="exampleText">
                            Descripción
                          </Label>
                          <Input
                            id="descripcion"
                            name="descripcion"
                            type="textarea"
                            value={grupo.descripcion}
                            onChange={handleChange}
                            maxLength={255}
                            rows="3"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label for="anioAcademico">Año Académico</Label>
                          <select
                            name="anioAcademico"
                            id="anioAcademico"
                            class="form-control"
                            required
                          >
                            <option value="">Seleccionar...</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                          </select>
                        </FormGroup>
                      </Col>

                      <Col md="3">
                        <FormGroup>
                          <Label for="semestreAcademico">Semestre Académico</Label>
                          <select
                            name="semestreAcademico"
                            id="semestreAcademico"
                            class="form-control"
                            value={grupo.semestreAcademico}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Seleccionar...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="profesor">Profesor</Label>
                          <Input
                            type="select"
                            name="profesor"
                            id="profesor"
                            value={grupo.profesor.id}
                            onChange={(e) =>
                              setGrupo({
                                ...grupo,
                                profesor: {
                                  ...grupo.profesor,
                                  id: e.target.value,
                                },
                              })
                            }
                            required
                          >
                            <option value="">Seleccionar...</option>
                            {profesores.map((profesor) => (
                              <option key={profesor.id} value={profesor.id}>
                                {profesor.usuario.codigo} -{" "}
                                {profesor.usuario.nombre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="horaPractica">Curso</Label>
                          <Input
                            type="select"
                            name="curso"
                            id="curso"
                            value={grupo.curso.id}
                            onChange={(e) =>
                              setGrupo({
                                ...grupo,
                                curso: { ...grupo.curso, id: e.target.value },
                              })
                            }
                            required
                          >
                            <option value="">Seleccionar...</option>
                            {cursos.map((curso) => (
                              <option key={curso.id} value={curso.id}>
                                {curso.codigo} - {curso.nombre}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
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

export default Grupos;
