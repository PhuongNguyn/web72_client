import { Form, Button, Checkbox, Input, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { createProduct, getProductById, updateProduct } from "../services";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { CLOUDINARY_URL } from "../config";

const CreateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState()

    const [form] = Form.useForm()

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const getProduct = async () => {
        try {
            const product = await getProductById(params.id)
            form.setFieldValue("name", product.data.product.name)
            form.setFieldValue("price", product.data.product.price)
            form.setFieldValue("quantity", product.data.product.quantity)
            setImageUrl(`${CLOUDINARY_URL}/${product.data.product?.image}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (info) => {
        setFile(info.file.originFileObj)
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });

    };

    const onFinish = async (values) => {
        const formdata = new FormData()
        formdata.append("name", values.name)
        formdata.append("price", values.price)
        formdata.append("quantity", values.quantity)
        formdata.append("image", file)
        if (!params.id) {
            try {
                const result = await createProduct(formdata)

                toast({
                    status: "success",
                    title: "Tạo sản phẩm thành công",
                    position: 'top'
                })
                navigate("/manage-product")
            } catch (error) {
                console.log(error)
                toast({
                    status: "error",
                    title: "Tạo sản phẩm thất bại",
                    position: 'top'
                })
            }
        } else {
            try {
                const result = await updateProduct(params.id, formdata)

                toast({
                    status: "success",
                    title: "Update sản phẩm thành công",
                    position: 'top'
                })
                navigate("/manage-product")

            } catch (error) {
                console.log(error)
                toast({
                    status: "error",
                    title: "Update sản phẩm thất bại",
                    position: 'top'
                })
            }
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        if (params.id) {
            getProduct()
        }
    }, [])

    return (
        <div>
            <Form
                name="basic"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input price!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số lượng sản phẩm"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input price!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={handleChange}
                    showUploadList={false}
                    action={() => false}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Form.Item
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateProduct