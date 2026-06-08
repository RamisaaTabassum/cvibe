import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name} 👋
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
        <p className="text-gray-500">Dashboard coming in Sprint 3!</p>
      </div>
    </div>
  );
};

export default Dashboard;