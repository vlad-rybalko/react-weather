import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        fetchSuggestions(value);
    };

    const fetchSuggestions = async (value) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/find?q=${value}&units=metric&appid=04c28042c354e56d87c11ae4123c23c0`
            );
            const data = await response.json();

            if (response.ok) {
                console.log('response.ok', data)
                const citySuggestions = data.list.map((city) => {
                    addToSearchHistory(city.name)
                    return ({
                        name: city.name,
                        temperature: city.main.temp,
                    })
                });
                setSuggestions(citySuggestions);
            }
        } catch (error) {
            console.log('Ошибка при получении подсказок:', error);
        }
    };

    const addToSearchHistory = (suggestion) => {
        setSearchHistory((prevHistory) => [...prevHistory, suggestion]);
    };

    return (
        <div className="search">
            <input
                type="text"
                className="search__input"
                value={searchTerm}
                onChange={handleChange}
            />
            <div className="search__list">
                {suggestions.map((suggestion) => (
                    <Link
                        key={suggestion.name}
                        to={`/city/${suggestion.name.toLowerCase()}`}
                        className="search__link"
                    >
                        {suggestion.name} - {suggestion.temperature}°C
                    </Link>
                ))}
            </div>
            <div>
                <h2>История поиска</h2>
                {searchHistory.length > 0 ? (
                    searchHistory.map((searchItem, index) => (
                        <div key={index}>
                            <Link
                                to={`/city/${searchItem.toLowerCase()}`}
                                className="search__link"
                            >
                                {searchItem}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>тут пусто :)</p>
                )}
            </div>

        </div>
    );
}

export default Search;
