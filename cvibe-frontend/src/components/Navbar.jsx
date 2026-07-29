import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  const baseBtnClass =
    "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  const handleProfileClick = () => {
    console.log("Current User:", user);

    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }

    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0f]/85 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="w-full max-w-[1600px] mx-auto flex items-center">
        <div className="flex justify-start flex-1">
          <Link to="/" className="text-[#f0f0f8] no-underline">
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] cursor-pointer leading-none">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>
        </div>

        <ul className="items-center justify-center flex-none hidden gap-8 p-0 m-0 list-none md:flex">
          <li>
            <a
              href="#features-section"
              className="text-[14px] font-medium text-[#7070a0] hover:text-white no-underline"
            >
              Features
            </a>
          </li>

          <li>
            <a
              href="#templates-section"
              className="text-[14px] font-medium text-[#7070a0] hover:text-white no-underline"
            >
              Templates
            </a>
          </li>

          <li>
            <a
              href="#how-section"
              className="text-[14px] font-medium text-[#7070a0] hover:text-white no-underline"
            >
              How it works
            </a>
          </li>
        </ul>

        <div className="flex items-center justify-end flex-1 gap-3">
          <div className="items-center hidden gap-4 md:flex">
            {user ? (
              <>
                <div
                  onClick={handleProfileClick}
                  title="Dashboard"
                  className="w-10 h-10 rounded-full bg-[#7c5cfc] flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span
                  onClick={handleProfileClick}
                  className="cursor-pointer text-white hover:text-[#7c5cfc]"
                >
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="py-2 px-5 border border-[#2a2a38] rounded-lg text-[#7070a0] hover:text-white hover:border-[#7c5cfc]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${baseBtnClass} border border-[#2a2a38] text-[#7070a0] hover:text-white no-underline`}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className={`${baseBtnClass} bg-[#7c5cfc] text-white no-underline`}
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0a0f] border-t border-[#2a2a38] p-6">
          {user ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={handleProfileClick}
                className="text-left text-white"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="text-left text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-white no-underline"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-white no-underline"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;