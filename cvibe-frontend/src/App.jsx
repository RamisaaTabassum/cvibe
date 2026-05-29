import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

import CVBuilder from './pages/CVBuilder';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>

        {/* NAVBAR (fixed) */}
        <Navbar />

        {/* MAIN WRAPPER */}
        <div className="pt-20 min-h-screen flex flex-col bg-[#0a0a0f] text-[#f0f0f8]">

          <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* BUILDER */}
            <Route
              path="/builder"
              element={
                <ProtectedRoute>
                  <CVBuilder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/builder/:id"
              element={
                <ProtectedRoute>
                  <CVBuilder />
                </ProtectedRoute>
              }
            />

          </Routes>

          {/* FOOTER */}
          <Footer />

        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;