import { Route, Routes } from "react-router"
import Login from "./pages/Login"


const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Router