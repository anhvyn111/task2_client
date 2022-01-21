import './App.css';
import React from "react";
import Login from "./page/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./page/User";
import {auth} from "./auth/auth";
function App() {
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={<User/>}
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
