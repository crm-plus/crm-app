import Header from './components/header/Header'
import RegistrationPage from './pages/registration/RegistrationPage'
import { Routes, Route } from "react-router-dom";
import {useState} from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return(
        <div className={"App"}>
            <Header isAuthenticated={isAuthenticated}/>
            <Routes>
                <Route path="registration" element={<RegistrationPage/>}/>
            </Routes>
        </div>

    )
}

export default App;
