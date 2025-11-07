import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './reduxStore/slices/authSlice.jsx';

import NavBar from './components/customComponents/navbar/NavBar.jsx';
import Home from './pages/home.page.jsx';
import Register from './pages/register.page.jsx';
import Login from './pages/login.page.jsx';
import Profile from './pages/profile.page.jsx';
import Footer from './components/customComponents/FooterComponent/Footer.jsx';
import Jobs from './pages/Jobs.page.jsx';
import Applied from './pages/Applied.page.jsx';
import JobsPosted from './pages/JobsPosted.page.jsx';
import Applicants from './pages/Applicants.page.jsx';
import CreateCompnay from './pages/CreateCompnay.page.jsx';
import './App.css';

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();


  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [token, location.pathname, navigate]);


  return (
    <>
      <Toaster />
      {!['/login', '/register'].includes(location.pathname) && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/applied" element={<Applied />}></Route>
          <Route path="/jobsPosted" element={<JobsPosted />}></Route>
          <Route path="/applicants" element={<Applicants />}></Route>
          <Route path="/company-details" element={<CreateCompnay />}></Route>
        </Routes>
      </main>
      {!['/login', '/register', '/profile'].includes(location.pathname) && <Footer />}
    </>
  )
}

export default App;
{/* <Route path="/applied" element={  }></Route> */ }