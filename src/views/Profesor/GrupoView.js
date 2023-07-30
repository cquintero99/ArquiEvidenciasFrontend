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


  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Contenido */}
        <Row>
      
        </Row>
      </Container>
    </>
  );
};

export default GrupoView;
