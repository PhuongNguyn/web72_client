import { Button, Pagination } from "antd"
import { Link } from "react-router-dom"
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from "react";
import { getProduct } from "../services";
import { CLOUDINARY_URL } from "../config";

const ManageProduct = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const getPagingProduct = async () => {
        try {
            const result = await getProduct(pageSize, pageIndex)
            setProducts(result.data.product)
            setCount(result.data.count)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPagingProduct()
    }, [pageSize, pageIndex])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (value) => (
                <>
                    <img width={50} height={50} src={`${CLOUDINARY_URL}/${value}`} onError={(e) => e.target.src = "https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"} />
                </>
            )
        },
        {
            title: 'Created By',
            key: 'createdBy',
            dataIndex: 'createdBy',
            render: (value) => (
                <>
                    {value.username}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/edit-product/${record._id}`}>Edit</Link>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Link to={'/create-product'}><Button type="primary">Thêm mới sản phẩm</Button></Link>
            <Table columns={columns} dataSource={products} pagination={false} style={{ marginTop: '10px' }} />
            <Pagination current={pageIndex} pageSize={pageSize} total={count} style={{ marginTop: '10px' }} onChange={(page, pageSize) => { setPageIndex(page); setPageSize(pageSize) }} showSizeChanger pageSizeOptions={[3, 5, 8]} />
        </>

    )
}

export default ManageProduct