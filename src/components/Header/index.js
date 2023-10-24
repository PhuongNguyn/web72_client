import { useSelector } from "react-redux"

const Header = () => {
    const user = useSelector((state) => state.users)

    return (
        <div>
        </div>
    )
}

export default Header