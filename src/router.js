import { Route, Routes } from "react-router"
import Login from "./pages/Login"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginSuccess } from "./redux/slice/user.slice"
import MainLayout from "./Layout/MainLayout"
import ManageProduct from "./pages/ManageProduct"
import NotFoundPage from "./pages/404Page"
import CreateProduct from "./pages/CreateProduct"


const Router = () => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.users?.user)

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (user) {
            dispatch(loginSuccess({ user: JSON.parse(user), token }))
        }
    }, [])
    return (
        <Routes>
            {!user && <Route path="/" element={<Login />} />}
            {user && <Route path="/" element={<MainLayout />}>
                <Route path="/manage-product" element={<ManageProduct />} />
                <Route path="/create-product" element={<CreateProduct />} />
            </Route>}
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Router