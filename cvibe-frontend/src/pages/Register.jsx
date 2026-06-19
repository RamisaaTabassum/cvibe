import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const bounceTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.01] active:scale-[0.98]";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 overflow-hidden font-['DM_Sans',sans-serif]">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-15 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[440px] bg-[#0d0d12] border border-[#1f1f2e] rounded-2xl p-8 md:p-10 shadow-2xl">
        
        <Link 
          to="/" 
          className="absolute top-6 right-6 text-[#7070a0] hover:text-[#f0f0f8] transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="flex flex-col items-start mb-8 text-left">
          <Link to="/" className="mb-4 no-underline">
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[1.5px] text-[#f0f0f8] select-none leading-none">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>

          <h2 className="text-[24px] font-bold text-[#f0f0f8] m-0 tracking-tight">
            Create your account
          </h2>

          <p className="text-[14px] text-[#7070a0] m-0 mt-2.5 leading-relaxed">
            Start building your professional CV for free. No credit card needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-[#7070a0] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 text-[14px] rounded-lg bg-[#14141f] border border-[#232333] text-[#f0f0f8] outline-none transition-all duration-200 focus:border-[#7c5cfc] placeholder-[#404058]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-[#7070a0] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 text-[14px] rounded-lg bg-[#14141f] border border-[#232333] text-[#f0f0f8] outline-none transition-all duration-200 focus:border-[#7c5cfc] placeholder-[#404058]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[13px] font-medium text-[#7070a0] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Min. 6 characters"
              className="w-full px-4 py-3 text-[14px] rounded-lg bg-[#14141f] border border-[#232333] text-[#f0f0f8] outline-none transition-all duration-200 focus:border-[#7c5cfc] placeholder-[#404058]"
            />
          </div>

          {error && (
            <div className="text-[13px] text-[#fc5c7d] bg-[#fc5c7d]/10 border border-[#fc5c7d]/20 py-2.5 px-3 rounded-lg text-center font-medium">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 mt-2 rounded-lg bg-[#7c5cfc] text-white text-[15px] font-medium border-none cursor-pointer shadow-lg shadow-[#7c5cfc]/10 hover:bg-[#6a4ae8] disabled:opacity-60 disabled:pointer-events-none ${bounceTransition}`}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-[14px] text-[#7070a0] mt-8 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7c5cfc] font-medium no-underline hover:underline transition-all ml-1">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;