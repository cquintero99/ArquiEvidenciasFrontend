const urlBackend = "http://localhost:8080/"

async function listProfesores() {
    let token = localStorage.getItem("token")
    const result = await fetch(urlBackend + "profesor", {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return result;
}


export { listProfesores };