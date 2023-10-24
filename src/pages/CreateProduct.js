import { Form, Button, Checkbox, Input, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { createProduct } from "../services";
import { useToast } from "@chakra-ui/react";

const CreateProduct = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState()

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (info) => {
        setFile(info.file.originFileObj)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const onFinish = async (values) => {
        try {
            const formdata = new FormData()
            formdata.append("name", values.name)
            formdata.append("price", values.price)
            formdata.append("quantity", values.quantity)
            formdata.append("image", file)
            const result = await createProduct(formdata)

            toast({
                status: "success",
                title: "Tạo sản phẩm thành công",
                position: 'top'
            })
        } catch (error) {
            console.log(error)
            toast({
                status: "error",
                title: "Tạo sản phẩm thất bại",
                position: 'top'
            })
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
    return (
        <div>
            <Form
                name="basic"

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
                    multiple={false}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={handleChange}
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