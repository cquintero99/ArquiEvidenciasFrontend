import { json } from "react-router-dom";
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

  async function saveGrupo(grupo){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"grupo/save",{
      method:'POST',
      body:JSON.stringify(grupo),
      headers:{
        "Authorization":"Bearer "+token,
        "Content-type":"application/json"
      }
    })
    return result;
  }

  async function updateGrupo(grupo){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"grupo/"+grupo.id+"/update",{
      method:'PUT',
      body:JSON.stringify(grupo),
      headers:{
        "Authorization":"Bearer "+token,
        "Content-type":"application/json"
      }
    })

    return result

  }
export {listaGrupos,saveGrupo,updateGrupo}