import {Routes, Route, Navigate} from 'react-router-dom'
import Atlas from "./pages/Atlas"
import AtlasDetail from "./pages/AtlasDetail"
import Profile from "./pages/Profile"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/atlas" replace/>}/>
            <Route path="/atlas" element={<Atlas/>}/>
            <Route path="/atlas/:code" element={<AtlasDetail/>}/>
            <Route path="/me" element={<Profile/>}/>
        </Routes>
    );
}
