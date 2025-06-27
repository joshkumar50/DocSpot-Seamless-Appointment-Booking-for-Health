import React, { useEffect } from 'react';
import Layout from '../components/Layout.jsx';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // =======================================================
    // NEW: Add a check to redirect if the user is an admin
    // =======================================================
    useEffect(() => {
        if (user?.isAdmin) {
            message.error("Admins cannot apply to be doctors.");
            navigate('/dashboard');
        }
    }, [user, navigate]);


    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor',
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ]
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/dashboard');

            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    // If user is an admin, we can return null to prevent rendering the form while redirecting
    if (user?.isAdmin) {
        return null; 
    }

    return (
        <Layout>
            <h1 style={{ textAlign: "center", marginBottom: '2rem' }}>Apply for Doctor</h1>
            <Form layout="vertical" onFinish={handleFinish}>
                <h4 style={{ marginBottom: '1rem', color: '#555' }}>Personal Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your first name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your phone number" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{ required: true }]}>
                            <Input type="email" placeholder="Your email address" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your clinic address" />
                        </Form.Item>
                    </Col>
                </Row>
                
                <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#555' }}>Professional Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type="text" placeholder="Your specialization" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Experience (in Years)" name="experience" required rules={[{ required: true }]}>
                            <Input type="number" placeholder="Your experience" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Fees Per Consultation" name="feesPerConsultation" required rules={[{ required: true }]}>
                            <Input type="number" placeholder="Your consultation fees" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </Form>
        </Layout>
    );
};

export default ApplyDoctor;