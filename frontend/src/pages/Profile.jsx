import React from 'react';
import Layout from '../components/Layout.jsx';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

const Profile = () => {
    // Get the user object from the Redux store
    const { user } = useSelector(state => state.user);

    return (
        <Layout>
            <h1 className="text-center m-2" style={{ marginBottom: '2rem' }}>My Profile</h1>
            
            {/* We use a Card component from Ant Design for a nice look */}
            {user && (
                <Card 
                    title="User Details" 
                    style={{ maxWidth: 500, margin: '0 auto' }}
                >
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                    <p>
                        <strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}
                    </p>
                    <p>
                        <strong>Is a Doctor:</strong> {user.isDoctor ? 'Yes' : 'No'}
                    </p>
                </Card>
            )}
        </Layout>
    );
};

export default Profile;