import urlBackend from "../urlBackend";



  async function listaEstudiantes(){
    let token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"estudiante",{
      method:'GET',
      headers:{
        "Authorization":"Bearer "+token
      }
    })
    return result;
  }

  async function cargaMasiva(file){
   const token=localStorage.getItem("token")
    const result=await fetch(urlBackend+"estudiante",{
        method:'POST',
        body:(file),
        header:{
          "Authorization":"Bearer "+token
        }
    })
    return result;
  }
  
  export { listaEstudiantes , cargaMasiva };
  