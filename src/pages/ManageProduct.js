import { Button, Pagination } from "antd"
import { Link } from "react-router-dom"
import { Space, Table, Tag, Popconfirm } from 'antd';
import { useEffect, useState } from "react";
import { deleteProduct, getProduct } from "../services";
import { CLOUDINARY_URL } from "../config";
import { useToast } from "@chakra-ui/react";

const ManageProduct = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const toast = useToast()
    const getPagingProduct = async () => {
        try {
            const result = await getProduct(pageSize, pageIndex)
            setProducts(result.data.product)
            setCount(result.data.count)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProducts = async (id) => {
        try {
            const result = await deleteProduct(id)
            toast({
                status: "success",
                title: "Xoá sản phẩm thành công",
                position: 'top'
            })
            setProducts(products.filter(item => item._id != id))
        } catch (error) {
            toast({
                status: "error",
                title: "Delete product failed",
                position: 'top'
            })
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
                    {console.log(record)}
                    <Link to={`/edit-product/${record._id}`}>Edit</Link>
                    <Popconfirm title="Delete product" description="Are you sure to delete this product?" onConfirm={() => { deleteProducts(record._id) }}>Delete</Popconfirm>
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