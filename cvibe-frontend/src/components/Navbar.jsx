import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2a2a38]">
      {/* 
        Wider layout (max-w-[1600px]) to match modern desktops beautifully.
        Increased horizontal padding (px-8 md:px-16) to remove excessive margins.
      */}
      <div className="flex items-center w-full max-w-[1600px] px-8 py-5 mx-auto md:px-16">
        
        {/* LEFT - Logo Container */}
        <div className="flex justify-start flex-1">
          <Link to="/" className="text-[#f0f0f8]">
            {/* Increased text size to 28px for better desktop visibility */}
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px]">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>
        </div>
        
        {/* MIDDLE - Links */}
        {/* Switched from text-sm to text-base (16px) to make text readable and proportional */}
        <ul className="hidden md:flex items-center gap-10 text-base text-[#7070a0] font-sans font-medium justify-center flex-none">
          <li><a href="#features-section" className="transition hover:text-white">Features</a></li>
          <li><a href="#templates-section" className="transition hover:text-white">Templates</a></li>
          <li><a href="#how-section" className="transition hover:text-white">How it works</a></li>
        </ul>
        
        {/* RIGHT - Auth Container */}
        <div className="flex items-center justify-end flex-1 gap-4 font-sans">
          
          {/* Desktop Auth Buttons (Upgraded to text-base and better padding) */}
          <div className="items-center hidden gap-4 md:flex">
            {user ? (
              <>
                <Link to="/dashboard" className="text-base text-[#7070a0] hover:text-white transition">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-base border border-[#2a2a38] rounded-xl text-[#7070a0] hover:text-white transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-base text-[#7070a0] hover:text-white transition">
                  Log in
                </Link>
                <Link to="/register" className="px-5 py-2.5 text-base bg-[#7c5cfc] text-white rounded-xl font-medium hover:bg-[#6a4ae8] transition---">
                  Sign up free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#7070a0] hover:text-white focus:outline-none cursor-pointer p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 border-b border-[#2a2a38] px-8 py-6 flex flex-col gap-6 backdrop-blur-lg">
          <ul className="flex flex-col gap-5 text-lg text-[#7070a0] font-medium">
            <li>
              <a href="#features-section" onClick={() => setIsOpen(false)} className="block py-1 transition hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#templates-section" onClick={() => setIsOpen(false)} className="block py-1 transition hover:text-white">
                Templates
              </a>
            </li>
            <li>
              <a href="#how-section" onClick={() => setIsOpen(false)} className="block py-1 transition hover:text-white">
                How it works
              </a>
            </li>
          </ul>
          
          <div className="h-[1px] bg-[#2a2a38] w-full" />

          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center text-base text-[#7070a0] hover:text-white transition py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full text-center px-5 py-3 text-base border border-[#2a2a38] rounded-xl text-[#7070a0] hover:text-white transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center px-5 py-3 text-base border border-[#2a2a38] rounded-xl text-[#7070a0] hover:text-white transition"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-center px-5 py-3 text-base bg-[#7c5cfc] text-white rounded-xl font-medium hover:bg-[#6a4ae8] transition"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;