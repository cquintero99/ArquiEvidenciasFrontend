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
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  // Función para cerrar sesión y redirigir al usuario al login
  const handleCerrarSesion = () => {
    // Borramos el token del localStorage
    localStorage.clear();

    // Redirigimos al usuario al login
    navigate("/auth/login" ,{ replace: true });
    window.location.replace("/auth/login");
  };
   //window.history.replaceState(null, "", "/auth/login");
    //window.location.reload(); // Opcional: recargar la página para que el usuario no pueda regresar usando la caché del navegador
  
  const [nombreUser, setNombreUser] = useState("");

  useEffect(() => {
    try {
      const nombreUsuario = JSON.parse(localStorage.getItem("data")).nombre;
      setNombreUser(nombreUsuario);
    } catch (error) {
      // Si hay un error al obtener el nombre del usuario, simplemente dejamos el nombre vacío
      setNombreUser("");
    }
  }, []);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            INICIO
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../assets/img/user/user.png")}
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {nombreUser} {/* Mostramos el nombre del usuario aquí */}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bienvenido!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Mi Perfil</span>
                </DropdownItem>
                
                <DropdownItem divider />
                <DropdownItem onClick={handleCerrarSesion}>
                  <i className="ni ni-user-run" />
                  <span>Cerrar Sesion</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
