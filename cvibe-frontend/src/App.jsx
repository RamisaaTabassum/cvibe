import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

import CVBuilder from './pages/CVBuilder';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';


const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col flex-grow pt-20">
        <Outlet />
      </div>
    </>
  );
};


const AppContentLayout = () => {
  return (
    <div className="flex flex-col flex-grow">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        
       
        <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-[#f0f0f8]">
          
          <Routes>
            
            {/* 1. ROUTES WITH GLOBAL NAVBAR & FOOTER */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
            </Route>

            {/* 2. ROUTES WITH NO GLOBAL NAVBAR (BUT CONTAINS GLOBAL FOOTER) */}
            <Route element={<AppContentLayout />}>
              
              {/* AUTH */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* DASHBOARD */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* BUILDER WORKSPACE */}
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
              
            </Route>

          </Routes>

          
          <Footer />

        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;