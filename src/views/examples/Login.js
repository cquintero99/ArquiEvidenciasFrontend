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
//import Modals from "Modal"

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import {iniciarSesion, verificarEmail} from 'views/fetch/Peticiones'



const Login = () => {
  const navigate = useNavigate();
 


  const handelSubmit = (e) => {
    e.preventDefault()

    //console.log(e)
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const usuario = {
      email,
      password

    }
    
    if (email !== "" && password !== "") {
      const usuarioVerificar = {
        correoInstitucional: formData.get("email")
      }
      verificarEmail(usuarioVerificar)
        .then(response => response.json())
        .then(data => {
          if (data === true) {

            iniciarSesion(usuario)
              .then(response => response)
              .then(JWT => {
                if (JWT.status === 200 && JWT.headers.has('Authorization')) {
                  const bearerToken = JWT.headers.get('Authorization');
                  const token = bearerToken.replace('Bearer ', '');


                  localStorage.setItem('token', token);
                  localStorage.setItem("data", JSON.stringify(parseJwt(token)))
                  const usuario=JSON.parse(localStorage.getItem("data"))
                  const rol = usuario.roles[0].nombre.split("_")[1].toLowerCase();
                  localStorage.setItem("modulo",rol)
                  navigate("/"+rol+"/index")

                } else {
                  alert("Contraseña Incorrecta");
                }
              })
              .catch(err => {

                alert("Error" + err)
                console.log(err)

              })

          } else {
            alert("Usuario no verificado")
          }
        })
        .catch(err => {
          alert("usuario No verificado")
        })

    }


  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-gradient-white shadow border my-2"
         color="dark"
         outline>

          <CardBody className="px-lg-5 py-lg-5">
            <h1 className="text-center p-3 text-dark">Iniciar Sesion</h1>
            <Form role="form" onSubmit={handelSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    autoComplete="new-email"
                    name="email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="danger" type="submit">
                  Iniciar Sesion
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small
                className="text-dark h5"
              >Olvide mi contraseña?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
