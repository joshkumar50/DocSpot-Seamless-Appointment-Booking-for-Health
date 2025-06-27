import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout.jsx";
import { Table, message } from "antd";
import moment from "moment";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllAppointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            title: "Appointment ID",
            dataIndex: "_id",
        },
        {
            title: "Doctor Name",
            dataIndex: "doctorInfo",
        },
        {
            title: "User Name",
            dataIndex: "userInfo",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}  
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];

    return (
        <Layout>
            <h1 className="text-center m-3">All Appointments for Admin Panel</h1>
            <Table columns={columns} dataSource={appointments} rowKey="_id" />
        </Layout>
    );
};

export default Appointments;