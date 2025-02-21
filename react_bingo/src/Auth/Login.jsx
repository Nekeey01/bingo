import { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {IconButton} from "@mui/material";
import {Close, Facebook, GitHub, Google} from "@mui/icons-material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://your-website.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
// Создание темы

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [remember, setRemember] = useState("false");
    let remember = false;
    const { login } = useAuth();
    const navigate = useNavigate();


    // function handleCheckbox() {
    //     if (remember === "true"){
    //         setRemember("false")
    //     } else {
    //         setRemember("true")
    //     }
    //
    // }
    const handleLogin = async () => {
        try {
            console.log(`remember - ${remember}`)
            const response = await axios.post("http://localhost:8000/login", {
                username,
                password,
                remember,
            });
            login(response.data.access_token);
            navigate("/"); // После логина отправляем на главную
        } catch (error) {
            console.error("Ошибка входа:", error);
            alert("Неверные данные!");
        }
    };

    // return (
    //     <div style={{ textAlign: "center", padding: "20px" }}>
    //         <h1>Вход</h1>
    //         <input placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
    //         <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
    //         <button onClick={handleLogin}>Войти</button>
    //     </div>
    // );

    return (
        <Box>
            <IconButton
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
            >
                Войти через Google
            </Button>
            <Button
                fullWidth
                variant="contained"
                startIcon={<Facebook />}
                sx={{ mb: 1, bgcolor: "#1877F2", color: "white" }}
            >
                Войти через Facebook
            </Button>
            <Button
                fullWidth
                variant="contained"
                startIcon={<GitHub />}
                sx={{ mb: 2, bgcolor: "#333", color: "white" }}
            >
                Войти через GitHub
            </Button>
            <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
                или используйте email
            </Typography>
            <form onSubmit={handleLogin}>
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
            // <Container >
            //     <CssBaseline />
            //     <Box
            //         sx={{
            //             marginTop: 8,
            //             display: 'flex',
            //             flexDirection: 'column',
            //             alignItems: 'center',
            //         }}
            //     >
            //         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            //             <LockOutlinedIcon />
            //         </Avatar>
            //         <Typography component="h1" variant="h5">
            //             Войти
            //         </Typography>
            //         <Box component="form" noValidate sx={{ mt: 1 }}>
            //             <TextField
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 id="username"
            //                 label="username"
            //                 name="username"
            //                 autoComplete="username"
            //                 value={username}
            //                 onChange={(e) => setUsername(e.target.value)}
            //                 autoFocus
            //             />
            //             <TextField
            //                 margin="normal"
            //                 required
            //                 fullWidth
            //                 name="password"
            //                 label="Password"
            //                 type="password"
            //                 id="password"
            //                 autoComplete="current-password"
            //                 value={password}
            //                 onChange={(e) => setPassword(e.target.value)}
            //             />
            //             <FormControlLabel
            //                 control={<Checkbox value={remember} onChange={() => remember = !remember} color="primary" />}
            //                 label="Запомнить меня"
            //             />
            //             <Button
            //                 onClick={handleLogin}
            //                 fullWidth
            //                 variant="contained"
            //                 sx={{ mt: 3, mb: 2 }}
            //             >
            //                 Войти
            //             </Button>
            //             <Grid container>
            //                 <Grid item xs>
            //                     <Link href="#" variant="body2">
            //                         Забыли пароль?
            //                     </Link>
            //                 </Grid>
            //                 <Grid item>
            //                     <Link href="#" variant="body2">
            //                         Зарегайся, клоуняра
            //                     </Link>
            //                 </Grid>
            //             </Grid>
            //         </Box>
            //     </Box>
            //     <Copyright sx={{ mt: 8, mb: 4 }} />
            // </Container>
    );

}
