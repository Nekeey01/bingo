import {useNavigate} from "react-router-dom";
import Register from "../Auth/Register.jsx";
import {Button} from "@mui/material";
import {useState} from "react";
import LoginModalCard from "../Auth/LoginModalCard.jsx";

export default function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log("token2 - ", token)
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div style={{textAlign: "center", padding: "20px"}}>
            <h1>Выберите метод генерации чисел</h1>
            {!token ? (
                <>
                    <button onClick={() => navigate("/login")}
                            style={{margin: "10px", padding: "10px 20px"}}
                    >Войти
                    </button>

                    {/*<button onClick={() => navigate("/register")} style={{margin: "10px", padding: "10px 20px"}}>Регистрация*/}
                    {/*</button>*/}

                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Открыть регистрацию
                    </Button>
                    {/*<Register open={open} handleClose={() => setOpen(false)} />*/}
                    <LoginModalCard open={open} handleClose={() => setOpen(false)} />

                </>
            ) : (
                <>
                    <button
                        onClick={() => navigate("/axios")}
                        style={{margin: "10px", padding: "10px 20px"}}
                    >
                        Генерация через Axios
                    </button>

                    <button
                        onClick={() => navigate("/websocket")}
                        style={{margin: "10px", padding: "10px 20px"}}
                    >
                        Генерация через WebSocket
                    </button>

                    <button
                        onClick={handleLogout}
                        style={{margin: "10px", padding: "10px 20px"}}
                    >
                        Выйти
                    </button>
                </>
            )}
        </div>
    );
}
