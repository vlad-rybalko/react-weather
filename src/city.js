import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

function City() {
    const params = useParams();
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${params.name}&cnt=5&units=metric&appid=04c28042c354e56d87c11ae4123c23c0`
                );
                const data = await response.json();
                setForecast(data.list);
            } catch (error) {
                console.log('Ошибка при получении прогноза погоды:', error);
            }
        };

        fetchForecast();
    }, [params.name]);

    return (
        <div class="city">
            <h2>{params.name}</h2>

            {forecast.map((item) => (
                <p key={item.dt}>{item.main.temp} °C - {item.dt_txt}</p>
            ))}

            <Link
                to={'/'}
            >
                ← вернуться на главную
            </Link>

        </div>
    );
}

export default City;
