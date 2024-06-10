import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_token } from './Auth/authslice'; // For Check Token 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Auth/Register';
import Login from './Auth/Login';
import About from './Pages/About';
import Services from './Pages/Services';
import Department from './Pages/Department';
import Depwisedoctor from './Pages/Depwisedoctor';
import Doctordetails from './Pages/Doctordetails';
import Appointment from './Pages/Appointment';
import Alldoctors from './Pages/Alldoctors';
import Blog from './Pages/Blog';
import Blogdetails from './Pages/Blogdetails';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Dashboard';

const App = () => {

  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/about',
      component: <About />
    },
    {
      path: '/services',
      component: <Services />
    },
    {
      path: '/alldoctors',
      component: <Alldoctors />
    },
    {
      path: '/register',
      component: <Register />
    },
    {
      path: '/login',
      component: <Login />
    }
  ]


  const private_routing = [
    {
      path: '/department',
      component: <Department />
    },
    {
      path: '/depwisedoctor/:id',
      component: <Depwisedoctor />
    },
    {
      path: '/doctordetails/:id',
      component: <Doctordetails />
    },
    {
      path: '/appointment/:id',
      component: <Appointment />
    },
    {
      path: '/blog',
      component: <Blog />
    },
    {
      path: '/blogdetails/:id',
      component: <Blogdetails />
    },
    {
      path: '/contact',
      component: <Contact />
    },
    {
      path: '/dashboard',
      component: <Dashboard />
    }
  ]

  // This step is required for to stop page refreshing problem in logout button
  useEffect(() => {
    dispatch(check_token())
  }, [])


  return (
    <>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />



      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/*Public Routing Area*/}
            {public_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={routing?.component} />
                </>
              )
            })}

            {/*Private Routing Area*/}
            {private_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
                </>
              )
            })}

          </Routes>
        </Router>
      </QueryClientProvider>

    </>
  )
}

export default App
