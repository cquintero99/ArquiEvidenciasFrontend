// reactstrap components
import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Container,
    Row,
    FormGroup,
    Label,
    Input,
    Col,
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

const Grupos = () => {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("");

    //Obtener lista de grupos
    const obtenerGrupos = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("data")).id;
            const profesor = await getProfesorByIdUsuario(usuario);
            const response = await listaGruposByIdProfesor(profesor.id);
            const data = await response.json();
            setGrupos(data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los Grupos:", error);
            setLoading(false);
        }
    };
    useEffect(() => {
        obtenerGrupos();
    }, []);

    //Columnas de la Datatable
    const columns = [
        {
            name: "Codigo",
            cell: (row) => row.curso.codigo + "-" + row.codigoGrupo,
            selector: (row) => row.curso.codigo,
            sortable: true,
            maxWidth: "200px",
        },
        {
            name: "Nombre",
            cell: (row) => row.curso.nombre,
            selector: (row) => row.curso.nombre,
            sortable: true,
        },
        {
            
            name: "Ingresar",
            cell: (row) => (
              <h3>
                <Link to={`/grupos/ingreso?curso=${row.curso.codigo}&grupo=${row.codigoGrupo}`}>
                  <FaSignInAlt />
                </Link>
              </h3>
            ),
           
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
    ];

    // Filtrar los datos en base al término de búsqueda
    const filteredGrupos = grupos.filter((grupo) =>
        grupo.curso.codigo.includes(filtro.toLowerCase())
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
                                <h3 className="mb-0">Lista Grupos</h3>
                            </CardHeader>
                            {loading ? (
                                <p className="text-center ">Cargando Grupos...</p>
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
        </>
    );
};

export default Grupos;
