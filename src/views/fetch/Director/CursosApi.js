import urlBackend from "../urlBackend";

async function listaCursos(){
  const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"curso",{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
    })
    return result;
  }

  async function saveCurso(curso){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"curso/save",{
        method:'POST',
        body:JSON.stringify(curso),
        headers:{
            "Authorization":"Bearer "+token,
            "Content-Type":"application/json"
        }
    })
    return result;
  }
  async function updateCurso(curso){
    const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"curso/"+curso.id+"/update",{
        method:'PUT',
        body:JSON.stringify(curso),
        headers:{
            "Authorization":"Bearer "+token,
            "Content-Type":"application/json"
        }
    })
    return result;
  }

  export {listaCursos, saveCurso,updateCurso}