
import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../services';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slice/user.slice'
import { useToast } from '@chakra-ui/react'

const Login = () => {
    const toast = useToast()

    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            const user = await login(values.username, values.password)
            toast({
                status: "success",
                title: "Đăng nhập thành công",
                position: "top"
            })
            dispatch(loginSuccess(user.data))

        } catch (error) {
            console.log(error)
            toast({
                status: "error",
                title: "Đăng nhập thất bại",
                position: "top"
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: '20px auto'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login;