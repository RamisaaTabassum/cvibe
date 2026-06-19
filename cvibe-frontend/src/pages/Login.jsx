import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const bounceTransition =
    "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.01] active:scale-[0.98]";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 overflow-hidden font-['DM_Sans',sans-serif]">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-15 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl p-8 md:p-10 shadow-2xl">

        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-[#7070a0] hover:text-[#f0f0f8]"
        >
          ✕
        </button>

        <div className="mb-6">
          <Link to="/" className="text-[28px] font-bold text-white">
            CV<span className="text-[#7c5cfc]">ibe</span>
          </Link>

          <h2 className="text-[24px] font-bold text-[#f0f0f8] mt-3">
            Welcome back
          </h2>

          <p className="text-[14px] text-[#7070a0] mt-2">
            Login to continue
          </p>
        </div>

        <div className="flex bg-[#14141f] p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 rounded-lg ${
              role === 'user' ? 'bg-[#7c5cfc] text-white' : 'text-gray-400'
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 rounded-lg ${
              role === 'admin' ? 'bg-[#7c5cfc] text-white' : 'text-gray-400'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-[#14141f] text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-[#14141f] text-white"
            required
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded bg-[#7c5cfc] text-white ${bounceTransition}`}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#7c5cfc]">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;