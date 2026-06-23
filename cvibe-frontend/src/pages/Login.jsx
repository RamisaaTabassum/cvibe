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

  // Premium interaction animation classes matching register page
  const bounceTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.01] active:scale-[0.98]";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 overflow-hidden font-['DM_Sans',sans-serif]">
      
      {/* Cohesive Background Glow & Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-15 pointer-events-none" />

      {/* Card Wrapper Container */}
      <div className="relative z-10 w-full max-w-[440px] bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl p-8 md:p-10 shadow-2xl">
        
        {/* Close (X) Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-[#7070a0] hover:text-[#f0f0f8] bg-transparent border-none cursor-pointer p-0 transition-colors duration-200 outline-none"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Block (Left-aligned perfectly matching register flow) */}
        <div className="flex flex-col items-start mb-6 text-left">
          {/* Brand Logo */}
          <Link to="/" className="mb-4 no-underline">
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[1.5px] text-[#f0f0f8] select-none leading-none">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>
          
          {/* Title */}
          <h2 className="text-[24px] font-bold text-[#f0f0f8] m-0 tracking-tight">
            Welcome back
          </h2>
          
          {/* Subtitle */}
          <p className="text-[14px] text-[#7070a0] m-0 mt-2.5 leading-relaxed">
            Login to your account to access your CVs and dashboard.
          </p>
        </div>

        {/* User / Admin Segmented Switcher */}
        <div className="flex bg-[#14141f] p-1 rounded-xl mb-6 border border-[#232333]">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2.5 text-[14px] font-semibold rounded-lg border-none cursor-pointer transition-all duration-200 ${
              role === 'user' 
                ? 'bg-[#7c5cfc] text-white shadow-md' 
                : 'bg-transparent text-[#52526b] hover:text-[#7070a0]'
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2.5 text-[14px] font-semibold rounded-lg border-none cursor-pointer transition-all duration-200 ${
              role === 'admin' 
                ? 'bg-[#7c5cfc] text-white shadow-md' 
                : 'bg-transparent text-[#52526b] hover:text-[#7070a0]'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[13px] font-medium text-[#7070a0] mb-2">
              Email
            </label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" 
              required
              className="w-full px-4 py-3 text-[14px] rounded-lg bg-[#14141f] border border-[#232333] text-[#f0f0f8] outline-none transition-all duration-200 focus:border-[#7c5cfc] placeholder-[#404058]"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[13px] font-medium text-[#7070a0] mb-2">
              Password
            </label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full px-4 py-3 text-[14px] rounded-lg bg-[#14141f] border border-[#232333] text-[#f0f0f8] outline-none transition-all duration-200 focus:border-[#7c5cfc] placeholder-[#404058]"
            />
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="text-[13px] text-[#fc5c7d] bg-[#fc5c7d]/10 border border-[#fc5c7d]/20 py-2.5 px-3 rounded-lg text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3.5 mt-2 rounded-lg bg-[#7c5cfc] text-white text-[15px] font-medium border-none cursor-pointer shadow-lg shadow-[#7c5cfc]/10 hover:bg-[#6a4ae8] disabled:opacity-60 disabled:pointer-events-none ${bounceTransition}`}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[14px] text-[#7070a0] mt-8 mb-0 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#7c5cfc] no-underline hover:underline transition-all ml-1 font-semibold">
            Sign up free
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;