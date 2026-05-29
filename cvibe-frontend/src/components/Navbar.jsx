import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2a2a38]">
      {/* Inner grid bounds matching Hero exactly */}
      <div className="flex items-center w-full max-w-6xl px-6 py-4 mx-auto md:px-12">
        
        {/* LEFT - Logo Container (flex-1 forces equal width on the left) */}
        <div className="flex justify-start flex-1">
          <Link to="/" className="text-[#f0f0f8]">
            <div className="font-['Bebas_Neue',sans-serif] text-[24px] tracking-[2px]">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>
        </div>
        
        {/* MIDDLE - Links (Perfectly centered, aligning with Hero text) */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-[#7070a0] font-sans font-medium justify-center flex-none">
          <li><a href="#features-section" className="transition hover:text-white">Features</a></li>
          <li><a href="#templates-section" className="transition hover:text-white">Templates</a></li>
          <li><a href="#how-section" className="transition hover:text-white">How it works</a></li>
        </ul>
        
        {/* RIGHT - Auth Container (flex-1 forces equal width on the right, keeping middle centered) */}
        <div className="flex items-center justify-end flex-1 gap-3 font-sans">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-[#7070a0] hover:text-white transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm border border-[#2a2a38] rounded-lg text-[#7070a0] hover:text-white transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm text-[#7070a0] hover:text-white transition">
                Log in
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm bg-[#7c5cfc] text-white rounded-lg font-medium hover:bg-[#6a4ae8] transition">
                Sign up free
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;