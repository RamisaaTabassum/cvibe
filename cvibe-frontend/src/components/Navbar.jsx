import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2a2a38]">

      {/* Logo */}
      <Link
        to="/"
        className="font-[Bebas_Neue] text-2xl tracking-widest text-[#f0f0f8]"
      >
        CV<span className="text-[#7c5cfc]">ibe</span>
      </Link>

      {/* Middle Links */}
      <ul className="hidden gap-8 md:flex">
        <li>
          <a href="#features-section" className="text-sm text-[#7070a0] hover:text-[#f0f0f8] transition">
            Features
          </a>
        </li>
        <li>
          <a href="#templates-section" className="text-sm text-[#7070a0] hover:text-[#f0f0f8] transition">
            Templates
          </a>
        </li>
        <li>
          <a href="#how-section" className="text-sm text-[#7070a0] hover:text-[#f0f0f8] transition">
            How it works
          </a>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm text-[#7070a0] hover:text-white transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-[#2a2a38] rounded-lg text-[#7070a0] hover:text-white hover:border-[#7c5cfc] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm border border-[#2a2a38] rounded-lg text-[#7070a0] hover:text-white transition"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 text-sm rounded-lg bg-[#7c5cfc] text-white font-medium hover:opacity-90 transition"
            >
              Sign up free
            </Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;