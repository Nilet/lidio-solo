import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/1.home/Home'
import Teste from './pages/2.teste/Teste'

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/teste' element={<Teste/>}/>
                </Routes>
            </Router>

        </div>
    )
}

export default App
