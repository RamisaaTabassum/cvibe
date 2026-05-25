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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">

      <div className="w-full max-w-md bg-[#111118] border border-[#2a2a38] rounded-2xl p-10">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-widest mb-1 font-[Bebas_Neue] text-[#f0f0f8]">
          CV<span className="text-[#7c5cfc]">ibe</span>
        </div>

        {/* Title */}
        <div className="text-xl font-semibold text-[#f0f0f8] mb-2">
          Create account
        </div>

        <p className="text-sm text-[#7070a0] mb-6 leading-relaxed">
          Start building your professional CV for free.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#7070a0] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a24] border border-[#2a2a38] text-[#f0f0f8] outline-none focus:border-[#7c5cfc]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#7070a0] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a24] border border-[#2a2a38] text-[#f0f0f8] outline-none focus:border-[#7c5cfc]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#7070a0] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a24] border border-[#2a2a38] text-[#f0f0f8] outline-none focus:border-[#7c5cfc]"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-[#fc5c7d]">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-[#7c5cfc] text-white font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#7070a0] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#7c5cfc]">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;