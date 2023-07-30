// reactstrap components
import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Button,
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
    const [filtroAnio, setFiltroAnio] = useState('');
    const [filtroSemestre, setFiltroSemestre] = useState('');

    //Obtener lista de grupos
    const obtenerGrupos = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("data")).id;
            const profesor = await getProfesorByIdUsuario(usuario);
            const response = await listaGruposByIdProfesor(profesor.id);
            const data = await response.json();
            console.log(grupos);
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
                    <Link to={"/profesor/grupos/view/" + row.id}>
                        <FaSignInAlt />
                    </Link>
                </h3>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];

    // Filtrar los datos en base al término de búsqueda
    const filteredGrupos = grupos.filter((grupo) =>
        grupo.curso.codigo.includes(filtro.toLowerCase())
    );

    //reducir el texto
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    // Función para manejar el cambio en el filtro de año académico
    const handleFiltroAnioChange = (event) => {
        setFiltroAnio(event.target.value);
    };

    // Función para manejar el cambio en el filtro de semestre académico
    const handleFiltroSemestreChange = (event) => {
        setFiltroSemestre(event.target.value);
    };

    // Filtrar los grupos según el filtro seleccionado
    const gruposFiltrados = grupos.filter((grupo) => {
        if (!filtroAnio && !filtroSemestre) {
            // Si no hay filtros seleccionados, mostrar todos los grupos
            return true;
        }

        // Verificar si el grupo cumple con los filtros seleccionados
        return (
            (!filtroAnio || grupo.anioAcademico === filtroAnio) &&
            (!filtroSemestre || grupo.semestreAcademico === filtroSemestre)
        );
    });


    return (
        <>
            <Header />
            {/* Filtros */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-end bg-secondary">
                                <h3 className="mb-0">Filtros</h3>
                                <Row className="ml-5">
                                    <Col md={6}>
                                        <Label htmlFor="filtroAnio">Año</Label>
                                        <Input
                                            type="select"
                                            id="filtroAnio"
                                            value={filtroAnio}
                                            onChange={handleFiltroAnioChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2027">2028</option>
                                            <option value="2027">2029</option>
                                            <option value="2027">2030</option>
                                            {/* Agregar más opciones de años académicos aquí */}
                                        </Input>
                                    </Col>
                                    <Col md={6} className="mb-0 mb-md-0">
                                        <Label htmlFor="filtroSemestre">Semestre</Label>
                                        <Input
                                            type="select"
                                            id="filtroSemestre"
                                            value={filtroSemestre}
                                            onChange={handleFiltroSemestreChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            {/* Agregar más opciones de semestres académicos aquí */}
                                        </Input>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pb-4 bg-secondary">
                                {/* Page content */}
                                <Container>
                                    <Row>
                                        {gruposFiltrados.map((grupo) => (
                                            <Col key={grupo.id} md={4}>
                                                <Card className="shadow mb-4">
                                                    <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                                        <h3 className="mb-0">{grupo.curso.nombre}</h3>
                                                        <span className="badge badge-primary">Código: {grupo.curso.codigo}-{grupo.codigoGrupo}</span>
                                                    </CardHeader>
                                                    <CardBody className="pt-0 pb-0"> {/* Ajustamos el margen aquí */}
                                                        <p>{truncateText(grupo.descripcion, 150)}</p>
                                                        <p>Profesor: {grupo.profesor.usuario.nombre}</p>
                                                    </CardBody>
                                                    <CardFooter>
                                                        <Button color="primary" className="text-white">
                                                            <Link className="text-white" to={`/profesor/grupos/view/${grupo.id}`}>
                                                                Ingresar al curso
                                                            </Link>
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>

        </>
    );

    // return (
    //     <>
    //         <Header />
    //         {/* Page content */}
    //         <Container className="mt--7" fluid>
    //             {/* Table */}
    //             <Row>
    //                 <div className="col">
    //                     <Card className="shadow">
    //                         <CardHeader className=" border-0 d-flex">
    //                             <h3 className="mb-0">Lista Grupos</h3>
    //                         </CardHeader>
    //                         {loading ? (
    //                             <p className="text-center ">Cargando Grupos...</p>
    //                         ) : (
    //                             <>
    //                                 <FormGroup row>
    //                                     <Label for="filtro" sm={2} className="text-center">
    //                                         Filtro
    //                                     </Label>
    //                                     <Col sm={9}>
    //                                         <Input
    //                                             type="text"
    //                                             className=""
    //                                             placeholder="Buscar por codigo..."
    //                                             value={filtro}
    //                                             onChange={(e) => setFiltro(e.target.value)}
    //                                         />
    //                                     </Col>
    //                                 </FormGroup>

    //                                 <DataTable
    //                                     theme={customTheme}
    //                                     customStyles={customStyles}
    //                                     columns={columns}
    //                                     data={filteredGrupos}
    //                                     pointerOnHover
    //                                     responsive
    //                                     highlightOnHover
    //                                     search // Activa la búsqueda
    //                                     noDataComponent="No se encontraron registros para mostrar."
    //                                     pagination // Activa la paginación
    //                                     paginationComponentOptions={{
    //                                         rowsPerPageText: "Filas por página:",
    //                                         rangeSeparatorText: "de",
    //                                         selectAllRowsItem: true,
    //                                         selectAllRowsItemText: "Todos",
    //                                         selectAllRowsItemShow: true,
    //                                     }}
    //                                 />
    //                             </>
    //                         )}
    //                     </Card>
    //                 </div>
    //             </Row>
    //         </Container>
    //     </>
    // );
};

export default Grupos;
