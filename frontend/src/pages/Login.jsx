import React from 'react';
import { Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PublicHeader from '../components/PublicHeader.jsx';
import '../styles/AuthPage.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            dispatch(hideLoading());

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success('Login Successfully');
                navigate('/dashboard');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong during login');
        }
    };

    return (
        <div className="auth-page-container">
            <PublicHeader />
            <main className="auth-content">
                <div className="auth-form-column">
                    <h3>Sign in to your account</h3>
                    <Form layout="vertical" onFinish={onFinishHandler}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input type="email" placeholder="j@gmail.com" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" required rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>
                        <button className="form-btn" type="submit">Let's Enter</button>
                        <p className="form-link">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </Form>
                </div>
                <div className="auth-visual-column">
                    {/* ======================================== */}
                    {/*  UPDATED IMAGE SOURCE TO 'bg3.jpg'       */}
                    {/* ======================================== */}
                    <img src="/bg3.jpg" alt="Doctor Consultation" />
                </div>
            </main>
        </div>
    );
};

export default Login;