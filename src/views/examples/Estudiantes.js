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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { listaEstudiantes } from "views/fetch/Peticiones";
import DataTable from "react-data-table-component";

const Tables = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
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

    obtenerEstudiantes();
  }, []);
  const columns = [
    { name: "Nombre", selector: "usuario.nombre", sortable: true },
    { name: "Codigo", selector: "usuario.codigo", sortable: true },
    {
      name: "Correo Institucional",
      selector: "usuario.correo",
      sortable: true,
    },
    { name: "Estado Matricula", selector: "estadoMatricula", sortable: true },
    {
      name: "Ver",
      cell: (row) => (
        <i className="ni ni-single-02 text-danger" onClick={() => handleOpciones(row)} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    // Puedes agregar más columnas aquí si lo deseas
  ];
  const handleOpciones = (estudiante) => {
    // Aquí puedes manejar las acciones para el botón de opciones, como mostrar un modal o redirigir a otra página, etc.
    console.log("Opciones del estudiante:", estudiante);
  };
  // Filtrar los datos en base al término de búsqueda
  const filteredEstudiantes = estudiantes.filter((estudiante) =>
    estudiante.usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
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
                    data={filteredEstudiantes}
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Carga masiva de estudiantes</ModalHeader>
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
