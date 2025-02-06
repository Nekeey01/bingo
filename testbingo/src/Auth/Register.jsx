import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/register", {
                username,
                password,
            });

            if (response.status === 200) {
                alert("Регистрация успешна! Теперь войдите в аккаунт.");
                navigate("/login"); // Перенаправление на страницу входа
            }
            else{
                alert("ABOBA NOT WORK");
            }
        } catch (err) {
            setError(err.response?.data?.detail || "Ошибка регистрации");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
