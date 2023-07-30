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
    Modal,
    Form,
    Label,
    Input,
    Col,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import {
    listaGruposByIdProfesor, getProfesorByIdUsuario,
} from "views/fetch/Profesor/GruposApi";
import { listaCursos } from "views/fetch/Director/CursosApi";
import {
    saveGrupo,
    updateGrupo,
} from "views/fetch/Director/GrupoApi";

import { listaProfesores } from "../fetch/Director/ProfesorApi";
import { Link } from 'react-router-dom';
import { BsPencilSquare, BsPen } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import Swal from "sweetalert2";

const Grupos = () => {

    const [modal, setModal] = useState(false);
    const [grupos, setGrupos] = useState([]);
    const [usuarioProfesor, setUsuarioProfesor] = useState([]);
    const [profesores, setProfesores] = useState([]);
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
        setModalGrupo(!modalGrupo);
    };

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

    useEffect(() => {
        obtenerGrupos();
    }, []);

    const obtenerProfesores = async () => {
        try {
            const response = await listaProfesores();
            const data = await response.json();
            setProfesores(data);
        } catch (error) {
            console.error("Error al obtener profesores:", error);
        }
    };

    useEffect(() => {
        obtenerProfesores();
    }, []);

    const obtenerCursos = async () => {
        try {
            const response = await listaCursos();
            const data = await response.json();
            setCursos(data);
        } catch (error) {
            console.error("Error al obtener los Cursos:", error);
        }
    };

    useEffect(() => {
        obtenerCursos();
    }, []);

    const [filtroAnio, setFiltroAnio] = useState('');
    const [filtroSemestre, setFiltroSemestre] = useState('');

    const obtenerGrupos = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("data")).id;
            const profesor = await getProfesorByIdUsuario(usuario);
            const response = await listaGruposByIdProfesor(profesor.id);
            const data = await response.json();
            setGrupos(data);
        } catch (error) {
            console.error("Error al obtener los Grupos:", error);
        }
    };

    const obtenerProfesor = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("data")).id;
            const profesor = await getProfesorByIdUsuario(usuario);
            setUsuarioProfesor(profesor);
            console.log("profesor id" + profesor.id)
            console.log("profesor id x" + usuarioProfesor.id);
        } catch (error) {
            console.error("Error al obtener el profesor:", error);
        }
    };

    useEffect(() => {
        obtenerProfesor();
    }, []);

    useEffect(() => {
        obtenerGrupos();
    }, []);

    const handleOpciones = (grupo) => {
        toggleGrupo();
        setGrupo(grupo);
        console.log(grupo);
    };

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

    const habilitarCampos = () => {
        const inputs = document.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => (input.disabled = false));
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const handleFiltroAnioChange = (event) => {
        setFiltroAnio(event.target.value);
    };

    const handleFiltroSemestreChange = (event) => {
        setFiltroSemestre(event.target.value);
    };

    const gruposFiltrados = grupos.filter((grupo) => {
        if (!filtroAnio && !filtroSemestre) {
            return true;
        }
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
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-end bg-secondary">
                                <Button
                                    color="danger"
                                    onClick={toggle}
                                    className="text-white shadow mb-4 pt-0 pb-0"
                                >
                                    <IoMdAddCircle size={20} />
                                    Nuevo Grupo
                                </Button>
                                <h3 className="mb-0 ml-auto">Filtros</h3>
                                <Row className="ml-5">
                                    <Col md={6}>
                                        <Label htmlFor="filtroAnio" className="h3 font-weight-bold text-dark">
                                            Año
                                        </Label>
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
                                        </Input>
                                    </Col>
                                    <Col md={6} className="mb-0 mb-md-0">
                                        <Label htmlFor="filtroSemestre" className="h3 font-weight-bold text-dark">
                                            Semestre
                                        </Label>
                                        <Input
                                            type="select"
                                            id="filtroSemestre"
                                            value={filtroSemestre}
                                            onChange={handleFiltroSemestreChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className="pt-0 pb-0 bg-secondary">
                                {/* Grupos card */}
                                <Row>
                                    {gruposFiltrados.map((grupo) => (
                                        <Col key={grupo.id} md={4}>
                                            <Card className="shadow mb-4">
                                                <CardHeader className="border-0 d-flex align-items-center justify-content-between">
                                                    <h3 className="mb-1">{grupo.curso.nombre}</h3>
                                                    <h4>
                                                        <span className="badge badge-dark text-white">
                                                            Código: {grupo.curso.codigo}-{grupo.codigoGrupo}{' '}
                                                        </span>
                                                    </h4>
                                                    <h4 className="ml-2">
                                                        <BsPencilSquare style={{ fontSize: '18px' }} onClick={() => handleOpciones(grupo)} />
                                                    </h4>
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
                            </CardBody>
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
                                                        Descripción (Opcional)
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
                                            <Col md={6} style={{ display: "none" }}>
                                                <FormGroup>
                                                    <Label for="profesor">Profesor</Label>
                                                    <Input
                                                        type="select"
                                                        name="profesor"
                                                        id="profesor"
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
                                                        value={usuarioProfesor.id}
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
                                                        Descripción (Opcional)
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
                                                        disabled
                                                        value={usuarioProfesor.id}
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
