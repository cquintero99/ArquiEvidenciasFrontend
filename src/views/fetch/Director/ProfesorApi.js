import urlBackend from "../urlBackend"
async function listaProfesores(){
    const token=localStorage.getItem("token")
    const result= await fetch(urlBackend+"profesor",{
        method:'GET',
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return result;
}

export {listaProfesores}