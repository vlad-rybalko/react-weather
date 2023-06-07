import React from 'react';
import './App.css';
import Search from './search';
import City from './city';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/city/:name" element={< City />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
