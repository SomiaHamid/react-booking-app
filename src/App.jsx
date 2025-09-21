import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import Booking from './pages/Booking'
import Dashboard from './pages/Dashboard'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'
import AuthContext from './contexts/AuthContext'

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)
    return user ? children : <Navigate to="/login" />
}

export default function App() {
    return (
        <AuthProvider>
            <div className="app-container">
                <Navbar />
                <main className="main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/events/:id" element={<EventDetails />} />
                        <Route path="/booking/:id" element={
                            <PrivateRoute>
                                <Booking />
                            </PrivateRoute>
                        } />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                        <Route path="/about-us" element={
                            <PrivateRoute>
                                <AboutUs />
                            </PrivateRoute>
                        } />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    )
}
