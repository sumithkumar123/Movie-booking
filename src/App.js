import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import BookingScreen from './screens/BookingScreen';
import ActivityScreen from './screens/ActivityScreen';
import SelectionScreen from './screens/SelectionScreen';
import { BookingProvider } from './context/bookingContext';
import Layout from './components/Layout';

function App() {
    return (
        <BookingProvider>
            <Router>
                <AppContent />
            </Router>
        </BookingProvider>
    );
}

function AppContent() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login' || location.pathname === '/';

    if (!isLoginPage) {
        return (
            <Routes>
                <Route path="/booking" element={<BookingScreen />} />
                <Route path="/activity" element={<ActivityScreen />} />
                <Route path="/selection/:movieId" element={<SelectionScreen />} />
                <Route path="/" element={<Navigate replace to="/booking" />} />
                <Route path="*" element={<Navigate replace to="/booking" />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;
