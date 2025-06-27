import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// --- Core Components ---
import Spinner from './components/Spinner.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

// --- Public Pages ---
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// --- User Pages ---
import HomePage from './pages/HomePage.jsx';
import ApplyDoctor from './pages/ApplyDoctor.jsx';
import Appointments from './pages/Appointments.jsx';
import Profile from './pages/Profile.jsx';

// --- Admin Pages ---
import Users from './pages/admin/Users.jsx';
import Doctors from './pages/admin/Doctors.jsx';
import AdminAppointments from './pages/admin/Appointments.jsx';

function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? <Spinner /> :
          <Routes>
            {/* ======================================== */}
            {/* PUBLIC ROUTES                          */}
            {/* ======================================== */}
            <Route path='/' element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

            {/* ======================================== */}
            {/* USER (PRIVATE) ROUTES                  */}
            {/* ======================================== */}
            <Route path='/dashboard' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/apply-doctor' element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
            <Route path='/appointments' element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            
            {/* ======================================== */}
            {/* ADMIN (PRIVATE) ROUTES                 */}
            {/* ======================================== */}
            <Route path='/admin/appointments' element={<ProtectedRoute><AdminAppointments /></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path='/admin/doctors' element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
          </Routes>
        }
      </BrowserRouter>
    </>
  );
}

export default App;