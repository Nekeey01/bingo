import axios from "axios";
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    IconButton,
} from "@mui/material";
import { Close, Google, Facebook, GitHub } from "@mui/icons-material";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#000000",
    color: "#ffffff",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

// eslint-disable-next-line react/prop-types
export default function Register({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const email = "", password = "";
    // const [error, setError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(`email - ${email}`);
        console.log(`password - ${password}`);
        // setError("");

        try {
            const response = await axios.post("http://localhost:8000/register", {
                email,
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
            // setError(err.response?.data?.detail || "Ошибка регистрации");
            console.log(`Ошибка регистрации - ${err}`);
        }
    };

    const handleOAuthLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
    };

    return (
            <Box>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", top: 8, right: 8, color: "#ffffff" }}
                >
                    <Close />
                </IconButton>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                    Войти или зарегистрироваться
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Google />}
                    sx={{ mb: 1, bgcolor: "#4285F4", color: "white" }}
                    onClick={() => handleOAuthLogin("Google")}
                >
                    Войти через Google
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Facebook />}
                    sx={{ mb: 1, bgcolor: "#1877F2", color: "white" }}
                    onClick={() => handleOAuthLogin("Facebook")}
                >
                    Войти через Facebook
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GitHub />}
                    sx={{ mb: 2, bgcolor: "#333", color: "white" }}
                    onClick={() => handleOAuthLogin("GitHub")}
                >
                    Войти через GitHub
                </Button>
                <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
                    или используйте email
                </Typography>
                <form onSubmit={handleRegister}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        margin="normal"
                        // type="email"
                        InputLabelProps={{ style: { color: "#ffffff" } }}
                        InputProps={{ style: { color: "#ffffff" } }}
                        sx={{ bgcolor: "#333", borderRadius: 1 }}
                        {...register("email", {
                            required: "Введи почту дура",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Неверный формат email, лох",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        required
                        fullWidth
                        id="password"
                        label="Пароль"
                        margin="normal"
                        type="password"
                        InputLabelProps={{ style: { color: "#ffffff" } }}
                        InputProps={{ style: { color: "#ffffff" } }}
                        sx={{ bgcolor: "#333", borderRadius: 1 }}
                        {...register("password", {
                            required: "Введи пароль чмоня",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть не менее 6 символов, лох",
                            },
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, bgcolor: "#6200ea", color: "white" }}
                    >
                        Войти
                    </Button>
                </form>
            </Box>
    );
    //     <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
    //         <h2>Регистрация</h2>
    //         <form onSubmit={handleRegister}>
    //             <input
    //                 type="email"
    //                 placeholder="email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <input
    //                 type="password"
    //                 placeholder="Пароль"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <button type="submit">Зарегистрироваться</button>
    //         </form>
    //         {error && <p style={{ color: "red" }}>{error}</p>}
    //     </div>
    // );
}
