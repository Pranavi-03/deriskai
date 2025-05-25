import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProtectedRoute from './components/ProtectedRoute';
import TelegramMini from './pages/TelegramMini';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="container my-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/telegram" element={<TelegramMini />} />
              <Route path="/login" element={<Login />} />
              {/* ✅ Protected Routes */}
              <Route path="/analyze" element={
                <ProtectedRoute>
                  <Analyze />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
