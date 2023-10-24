import { Button } from "antd"
import { Link } from "react-router-dom"


const ManageProduct = () => {
    return (
        <Link to={'/create-product'}><Button type="primary">Thêm mới sản phẩm</Button></Link>
    )
}

export default ManageProduct