
const urlBackend="http://localhost:8080/"
//Login
async function iniciarSesion(usuario) {
    const result = await fetch(urlBackend+"user/login", {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        "Content-type": "application/json"
      }
    });
    return result;
  }
  
  async function verificarEmail(usuario) {
    const result = await fetch(urlBackend+"usuario/verificar", {
      method: 'POST',
      body: JSON.stringify(usuario),
      headers: {
        "Content-type": "application/json"
      }
    });
    return result;
  }
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
  
  export { iniciarSesion, verificarEmail,listaEstudiantes };
  