export const auth = () => {
    let token = localStorage.getItem("token");
    
    const status = fetch('http://localhost:5000/api/auth',
    {
        headers: {"authorization": `Bearer ${token}`}
    })
        .then(res => {
            return res.status;
        })
    return status;
}



