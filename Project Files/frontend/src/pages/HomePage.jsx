// frontend/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout.jsx';
import { Row } from 'antd';
import DoctorCard from '../components/DoctorCard.jsx';

const HomePage = () => {
    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const res = await axios.get('/api/v1/user/getAllDoctors', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                }
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllDoctors();
    }, []);

    return (
        <Layout>
            <h1 className="text-center" style={{ marginBottom: '20px' }}>Available Doctors</h1>
            <Row>
                {doctors && doctors.map(doctor => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
            </Row>
        </Layout>
    );
};

export default HomePage;