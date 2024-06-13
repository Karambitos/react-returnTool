import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Layout } from "./components";
import Home from './pages/Home';
import './App.css';



const App = () => {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home/>} />
                {/*<Route path="/result" element={<ResultPage />} />*/}
                {/*<Route path="*" element={<NotFound />} />*/}
            </Route>
        </Routes>
    );
}

export default App;




