import urlBackend from "../urlBackend";

async function listaGruposByIdProfesor(idProfesor) {
  const token = localStorage.getItem("token")
  const result = await fetch(urlBackend + "grupo/" + idProfesor + "/profesor", {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + token
    }
  })
  return result;
}

async function getProfesorByIdUsuario(idUsuario) {
  let token = localStorage.getItem("token")
  const result = await fetch(urlBackend + "profesor/" + idUsuario, {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const data = await result.json();
  return data;
}

export { listaGruposByIdProfesor, getProfesorByIdUsuario }