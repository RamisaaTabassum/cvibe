import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#2a2a38]"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#7c5cfc] border-r-transparent border-b-transparent border-l-transparent animate-spin shadow-lg shadow-[#7c5cfc]/20"></div>
        </div>
        <p className="text-xs font-semibold tracking-[2px] text-[#7070a0] font-['DM_Sans',sans-serif] uppercase animate-pulse">
          Loading
        </p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;