import urlBackend from "../urlBackend";

async function listaGrupos(){
  const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"grupo",{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
    })
    return result;
  }

export {listaGrupos}