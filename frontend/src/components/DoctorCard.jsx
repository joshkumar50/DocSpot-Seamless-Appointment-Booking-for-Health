import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorCard.css';

const DoctorCard = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="doctor-card"
            onClick={() => navigate(`/book-appointment/${doctor._id}`)} 
        >
            <div className="card-header">
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className="card-body">
                <p><b>Specialization:</b> {doctor.specialization}</p>
                <p><b>Experience:</b> {doctor.experience} Yrs</p>
                <p><b>Fees:</b> {doctor.feesPerConsultation}</p>
                <p><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</p>
            </div>
        </div>
    );
};

export default DoctorCard;