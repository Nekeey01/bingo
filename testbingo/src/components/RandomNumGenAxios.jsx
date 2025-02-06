import { useState } from 'react'
import axios from "axios";
import {useAuth} from "../AuthContext.jsx";

export default function RandomNumGenerator() {
    const [count, setCount] = useState(1);
    const [numbers, setNumbers] = useState([]);

    const { token } = useAuth();

    const fetchNumbers = async () =>{
        try{
            const response = await axios.post("http://localhost:8000/random_numbers", { count },
                { headers: { Authorization: `Bearer ${token}` } });
            setNumbers(response.data.numbers);
        } catch (err){
            console.error("Ошибка абобы", err);
        }
    }

    return (
        <div>
            <h1>Генератор случайных чисел</h1>
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                min="1"
                max="10"
            />
            <button onClick={fetchNumbers}>Сгенерировать</button>
            <p>Результат: {numbers.join(", ")}</p>
        </div>
    );
}