import { useSelector } from "react-redux"

const Header = () => {
    const user = useSelector((state) => state.users)
    console.log(12345677)
    return (
        <div style={{ marginTop: '20px' }}>
            {user?.user ? user?.user.username : <button>Đăng nhập</button>}
        </div>
    )
}

export default Header