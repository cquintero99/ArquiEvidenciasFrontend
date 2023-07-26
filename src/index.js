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
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AuthLayout from "layouts/Auth.js";
import DirectorLayout from "layouts/Director"
import ProfesorLayout from "layouts/Profesor"
import EstudianteLayout from "layouts/Estudiante"
import {VerificarToken ,VerificarRol }from "views/fetch/Seguridad/Seguridad"; // Importa el componente VerificarToken


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <VerificarToken />
    <VerificarRol/>
    <Routes>
      <Route path="/director/*" element={<DirectorLayout />} />
      <Route path="/profesor/*" element={<ProfesorLayout />} />
      <Route path="/estudiante/*" element={<EstudianteLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  </BrowserRouter>
);
