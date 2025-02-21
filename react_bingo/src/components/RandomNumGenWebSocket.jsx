import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";
import {useAuth} from "../Auth/AuthContext.jsx";

export default function RandomNumbersWebSocket() {
    const [count, setCount] = useState(1);
    const [numbers, setNumbers] = useState([]);
    const { token } = useAuth();
    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://localhost:8000/ws?token=${token}`, {
        shouldReconnect: () => true, // Автоматически пытаемся переподключиться
        onClose: () => console.log("WebSocket закрыт"),
        onError: (error) => console.error("Ошибка WebSocket:", error),
    });

    useEffect(() => {
        if (lastMessage?.data) {
            try {
                const data = JSON.parse(lastMessage.data);
                if (data.numbers) {
                    setNumbers(data.numbers);
                }
            } catch (error) {
                console.error("Ошибка парсинга:", error);
            }
        }
    }, [lastMessage]);

    const sendRequest = () => {
        if (readyState === 1){
            sendMessage(JSON.stringify({ count }));
        } else {
            console.warn("NOT WORK");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Генерация чисел через WebSocket</h1>
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min="1"
                max="10"
            />
            <button onClick={sendRequest} disabled={readyState !== 1}>Сгенерировать</button>
            <p>Результат: {numbers.join(", ")}</p>
            <p>Статус WebSocket: {['Закрыт', "Открыт", "Закрывается", "Ожидание"][readyState]}</p>
        </div>
    );
}