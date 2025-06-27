import React from 'react';
import { AdminMenu, UserMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
import { Badge, message } from 'antd';
import { clearUser } from '../redux/features/userSlice'; // Import the new action
import '../styles/LayoutStyles.css';

const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Get the dispatch function

    const handleLogout = () => {
        dispatch(clearUser()); // CLEAR THE USER STATE
        localStorage.clear(); // Clear the token from storage
        message.success('Logout Successfully');
        navigate('/login');
    };

    // This logic now depends on a correctly populated user object
    const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;
    const logoTitle = user?.isAdmin ? 'MediCareBook' : 'Book A Doctor';

    return (
        <div className="main">
            <div className="sidebar">
                <div className="logo">
                    <h6>{logoTitle}</h6>
                </div>
                <div className="menu">
                    {SidebarMenu.map(menu => {
                        const isActive = location.pathname === menu.path;
                        return (
                            <div key={menu.name} className={`menu-item ${isActive ? 'active' : ''}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        );
                    })}
                    <div className="menu-item logout-item" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <Link to="/login">Logout</Link>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="header-content">
                        <Badge 
                            count={user?.notification.length} 
                            onClick={() => navigate('/notification')}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fa-solid fa-bell"></i>
                        </Badge>
                        <Link to="/profile">{user?.name}</Link>
                    </div>
                </div>
                <div className="body">{children}</div>
            </div>
        </div>
    );
};

export default Layout;