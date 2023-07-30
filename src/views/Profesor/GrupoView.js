// reactstrap components
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import {
  listaGruposByIdProfesor, getProfesorByIdUsuario,
} from "views/fetch/Profesor/GruposApi";
import DataTable from "react-data-table-component";
import {
  customStyles,
  customTheme,
} from "components/Datatable/DatatableCustom";
import { FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { BsPencilSquare, BsPen } from "react-icons/bs";
// import { IoMdAddCircle } from "react-icons/io";
// import Swal from "sweetalert2";

const GrupoView = () => {

  const courses = [
    {
      id: 1,
      title: 'Matemáticas Avanzadas',
      description: 'Este curso cubrirá temas avanzados de matemáticas.',
      students: 30,
    },
    {
      id: 2,
      title: 'Historia Universal',
      description: 'Un recorrido por los acontecimientos históricos más importantes.',
      students: 25,
    },
    {
      id: 3,
      title: 'Programación en JavaScript',
      description: 'Aprende a programar aplicaciones web usando JavaScript.',
      students: 40,
    },
  ];



  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Contenido */}
        <Row>
          {courses.map((course) => (
            <Col key={course.id} md={4}>
              <Card className="shadow mb-4">
                <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                  <h3 className="mb-0">{course.title}</h3>
                  <span className="badge badge-primary">Estudiantes: {course.students}</span>
                </CardHeader>
                <CardBody>
                  <p>{course.description}</p>
                </CardBody>
                <CardFooter>
                  <Button color="primary">Ingresar al curso</Button>
                  {/* Aquí podrías agregar más acciones como editar el curso, ver calificaciones, etc. */}
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default GrupoView;
