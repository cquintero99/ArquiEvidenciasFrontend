import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificarToken = () => {
  // Obtener la ubicación actual
  const location = useLocation();
  const navigate = useNavigate();
  // Verificar si el usuario tiene un token (puedes ajustar esta lógica según cómo almacenas el token en tu aplicación)
  const tieneToken = localStorage.getItem("token") !== null;

  useEffect(() => {
    // Si el usuario no tiene un token y no está en la página de inicio de sesión (login),
    // redirigirlo a la página de inicio de sesión.
    if (!tieneToken && location.pathname !== "/auth/login") {
      navigate("/auth/login");
    }
  }, [tieneToken, location, navigate]);

  // Si el usuario tiene un token o está en la página de inicio de sesión (login), muestra el contenido normalmente.
  // De lo contrario, muestra un mensaje o componente que indique que se está verificando el token.
  return tieneToken || location.pathname === "/auth/login" ? null : (
    <div>Verificando el token...</div>
  );
};

const VerificarRol = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tieneToken = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (tieneToken) {
      const usuario = JSON.parse(
        JSON.stringify(parseJwt(localStorage.getItem("token")))
      );
      const numberRol = usuario.roles.length;
      const rol1 = usuario.roles[0].nombre.split("_")[1].toLowerCase();
      const modulo=localStorage.getItem("modulo")
      if(numberRol>1){
        const rol2 = usuario.roles[1].nombre.split("_")[1].toLowerCase();
        if(!location.pathname.includes(rol1) && !location.pathname.includes(rol2) ){
          // localStorage.clear();
          navigate("/"+modulo+"/index");
        }
      }else{
        console.log(location.pathname.includes(rol1))
        if(!location.pathname.includes(rol1) && numberRol===1){
          //localStorage.clear();
          navigate("/"+modulo+"/index");
        }
      }
      
    }
  }, [location, navigate, tieneToken]); // Aquí se eliminan los corchetes y se agrega el arreglo de dependencias

 
};


function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export { VerificarToken, VerificarRol };
