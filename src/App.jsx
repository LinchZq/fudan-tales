import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Atlas from "./pages/Atlas";

function App() {
    const [count, setCount] = useState(0)

    return <Atlas/>;
}

export default App
