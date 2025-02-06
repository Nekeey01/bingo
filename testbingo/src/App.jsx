import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import RandomNumGenerator from './components/RandomNumGenAxios.jsx'
import RandomNumbersWebSocket from "./components/RandomNumGenWebSocket";
import './App.css'
import {AuthProvider, useAuth} from "./AuthContext.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import {useState} from "react";


function App() {
    // const [token, ] = useState(localStorage.getItem("token"));
    const token  = localStorage.getItem("token");
    console.log("token - ", token)
    //
    // const updateToken = (newToken) => {
    //     if (newToken) {
    //         localStorage.setItem("token", newToken);
    //     } else {
    //         localStorage.removeItem("token")
    //     }
    //     setToken(newToken);
    // }
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/*<Route path="/axios" element={<RandomNumGenerator />} />*/}
                    {/*<Route path="/websocket" element={<RandomNumbersWebSocket />} />*/}
                    <Route path="/axios" element={token ? <RandomNumGenerator /> : <Navigate to="/login" />} />
                    <Route path="/websocket" element={token ? <RandomNumbersWebSocket /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App
