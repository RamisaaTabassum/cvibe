import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0f]">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    // If admin tries to open user page
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    // If user tries to open admin page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;