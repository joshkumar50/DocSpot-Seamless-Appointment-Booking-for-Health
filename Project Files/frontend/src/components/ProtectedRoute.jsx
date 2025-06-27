import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser, clearUser } from '../redux/features/userSlice';

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                '/api/v1/user/getUserData',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                dispatch(setUser(res.data.data));
            } else {
                // If the token is invalid, clear everything and redirect to login
                dispatch(clearUser());
                localStorage.clear();
                return <Navigate to="/login" />;
            }
        } catch (error) {
            dispatch(hideLoading());
            dispatch(clearUser());
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, dispatch]);

    if (localStorage.getItem('token')) {
        // This is correct. It should just return the children (the page component).
        // The Layout is handled by App.jsx.
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}