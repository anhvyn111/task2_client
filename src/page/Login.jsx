import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../auth/auth"

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(async () => {
        const checkLogin = await auth();
        if(checkLogin === 200){
            navigate("/");
        }
    },[])

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if(username.length > 0 && password.length > 0){
            const user = {
                username: username,
                password: password
            }
            fetch('http://localhost:5000/api/login',
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }).then(res => {
                return res.json();
            }).then(data => {
                localStorage.setItem("token", data.token);
                navigate("/");
            })
        }
    }

    return (
        <div className="container mt-3">
            <div className="text-center">
                <h2>LOGIN</h2>
            </div>
            <form onSubmit={handleSubmitLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;