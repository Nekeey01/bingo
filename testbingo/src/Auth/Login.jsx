import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/login", {
                username,
                password,
            });
            login(response.data.access_token);
            navigate("/"); // После логина отправляем на главную
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Неверные данные!");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Вход</h1>
            <input placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}
