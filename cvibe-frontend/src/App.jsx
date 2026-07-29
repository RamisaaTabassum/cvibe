import {
    Outlet,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import CVBuilder from "./pages/CVBuilder";
import Dashboard from "./pages/Dashboard";

const PublicLayout = () => (
  <>
    <Navbar />
    <div className="pt-20">
      <Outlet />
    </div>
    <Footer />
  </>
);

const PrivateLayout = () => (
  <div className="min-h-screen bg-[#0a0a0f] text-white">
    <Outlet />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Pages */}
          <Route element={<PrivateLayout />}>
            {/* User Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin-dashboard"
              element={
        <ProtectedRoute allowedRoles={["admin", "Admin", "ADMIN"]}>                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Builder */}
            <Route
              path="/builder"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <CVBuilder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/builder/:id"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <CVBuilder />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;