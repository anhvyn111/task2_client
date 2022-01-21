import React, {useState, useEffect} from "react";
import moment from "moment";
import ContentEditable from 'react-contenteditable';
import { useNavigate } from "react-router-dom";
import {auth} from "../auth/auth"
function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  let url = 'http://localhost:5000/api/users';
  const token = localStorage.getItem("token");    
  // function get user from server
  const getUsers = (input) => {
    if(input.length > 0){
      url = 'http://localhost:5000/api/users?name='+input
      console.log(url)
    }
    else{
      url = 'http://localhost:5000/api/users'
    }
    fetch(url,
      {
        headers:{"Authorization": `Bearer ${token}`}
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
  }

  // Function Change data of user
  const changeProfile = (u) => {
    if(u.email != "" && u.username && u.birthdate){
      const user = users.find(u => {return u._id === u._id});
      user.email = u.email;
      user.username = u.username;
      user.birthdate = u.birthdate;
      setDisabled(false);
    }
    else{
      setDisabled(true)
    }
  } 

  // Function handle update user
  const handleUpdateUsers = () => {
    fetch('http://localhost:5000/api/users',
    {
      method:"POST", 
      headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`},
      body: JSON.stringify(users)
    })
      .then((response) => {
        if(response.status === 400){
          alert("Please enter full information");
        }
        return response.json();
      })
      .then((data) => {
        if(data.code === 1){
          alert(data.message);
          getUsers(search);
          setDisabled(true);
        }
      })
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(async () => {
    const checkLogin = await auth();
    if(checkLogin === 401){
        navigate("/login");
    }
  },[])

  useEffect(() => {
    getUsers(search);
  },[search])

  return (
    <>
    
    <div className="container mt-4">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-danger mr-4 mt-2 " onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <input className="form-control me-2 w-50" onChange={(e) => {setSearch(e.target.value)}}type="search" placeholder="Search" aria-label="Search"/>
      </div>
      <table className="table table-hover">
      <thead>
          <tr>
            <th >Username</th>
            <th>Email</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
              <ContentEditable                  
                  html={u.username}
                  disabled={false}
                  onChange={(e) => { 
                    u.username = e.target.value;
                    changeProfile(u)}}
                />
              </td>
              <td>
                <ContentEditable                  
                  html={u.email}
                  disabled={false}
                  onChange={(e) => { 
                    u.email = e.target.value;
                    changeProfile(u)}}
                />
              </td>
              <td>
                <ContentEditable                  
                  html={moment(u.birthdate).format("yyyy-MM-DD")}
                  disabled={false}
                  onChange={(e) => { 
                    u.birthdate = e.target.value;
                    changeProfile(u)}}
                />
              </td>
            </tr>
          ))}      
        </tbody>
      </table>  
      <button onClick={() => handleUpdateUsers()} disabled={disabled} className="btn btn-success">Click to update users</button>
    </div>
    </>
  );
}

export default User;
