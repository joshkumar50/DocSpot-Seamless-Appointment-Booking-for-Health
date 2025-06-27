import React from 'react';
import { Form, Input, message, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PublicHeader from '../components/PublicHeader.jsx';
import '../styles/AuthPage.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());

            if (res.data.success) {
                message.success('Registered Successfully!');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong during registration');
        }
    };

    return (
        <div className="auth-page-container">
            <PublicHeader />
            <main className="auth-content">
                <div className="auth-form-column">
                    <h3>Sign up to your account</h3>
                    <Form layout="vertical" onFinish={onFinishHandler} initialValues={{ isAdmin: false }}>
                        <Form.Item label="Full name" name="name" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="John" />
                        </Form.Item>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input type="email" placeholder="j@gmail.com" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" required rules={[{ required: true }]}>
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="1234567890" />
                        </Form.Item>
                        <Form.Item name="isAdmin" required>
                             <Radio.Group>
                                <Radio value={true}>Admin</Radio>
                                <Radio value={false}>User</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <button className="form-btn" type="submit">Register</button>
                         <p className="form-link">
                            Have an account? <Link to="/login">Login here</Link>
                        </p>
                    </Form>
                </div>
                <div className="auth-visual-column">
                     {/* ======================================== */}
                     {/*  UPDATED IMAGE SOURCE TO 'bg1.jpg'       */}
                     {/* ======================================== */}
                     <img src="/bg1.jpg" alt="Doctor with Patient" />
                </div>
            </main>
        </div>
    );
};

export default Register;