import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const bounceTransition =
    "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.01] active:scale-[0.98]";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const loggedUser = await login(email, password);

      // Selected tab must match database role
      if (loggedUser.role !== role) {
        logout();

        setError(
          role === "admin"
            ? "This account is not an Admin."
            : "Please use the Admin tab for admin accounts."
        );

        return;
      }

      if (loggedUser.role === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4 overflow-hidden font-sans">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <div className="relative z-10 w-full max-w-md bg-[#0d0d12] border border-[#222235] rounded-3xl p-8 shadow-2xl">

        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-2xl text-[#7070a0] hover:text-white"
        >
          ×
        </button>

        <Link
          to="/"
          className="text-4xl font-bold text-white"
        >
          CV<span className="text-[#7c5cfc]">ibe</span>
        </Link>

        <h1 className="mt-8 text-5xl font-bold text-white">
          Welcome back
        </h1>

        <p className="text-[#7070a0] mt-3 mb-8">
          Login to continue
        </p>

        {/* Role Toggle */}
        <div className="flex bg-[#161622] rounded-xl p-1 mb-6">

          <button
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              role === "user"
                ? "bg-[#7c5cfc] text-white"
                : "text-gray-400"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              role === "admin"
                ? "bg-[#7c5cfc] text-white"
                : "text-gray-400"
            }`}
          >
            Admin
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-[#171722] p-4 text-white outline-none border border-transparent focus:border-[#7c5cfc]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-[#171722] p-4 text-white outline-none border border-transparent focus:border-[#7c5cfc]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl bg-[#7c5cfc] text-white font-semibold ${bounceTransition}`}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        <p className="mt-8 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#7c5cfc] hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;