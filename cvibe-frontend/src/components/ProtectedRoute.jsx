import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <p className="text-muted">Loading...</p>
    </div>
  );

  return user ? children : <Navigate to="/" />;
}