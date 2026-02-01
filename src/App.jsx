import {useState} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Atlas from "./pages/Atlas";
import AtlasDetail from "./pages/AtlasDetail";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/atlas" replace/>}/>
            <Route path="/atlas" element={<Atlas/>}/>
            <Route path="/builder" element={<BuilderPage/>}/>
            <Route path="/atlas/:code" element={<AtlasDetail/>}/>
        </Routes>
    );
}
