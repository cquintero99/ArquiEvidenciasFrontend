import urlBackend from "./urlBackend";

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
  
  export { iniciarSesion, verificarEmail };
  