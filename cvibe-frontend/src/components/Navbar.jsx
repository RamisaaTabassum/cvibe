import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // CSS Spring/Bounce Transition & Hover Effect Match
  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0f]/85 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24">
      {/* ডিজাইন পরিবর্তন না করে ল্যাপটপ এবং বড় স্ক্রিনের সাথে সামঞ্জস্য রেখে 
        সাইড মার্জিন ফুটিয়ে তুলতে আউটার কন্টেইনারে রেসপনসিভ প্যাডিং বাড়ানো হয়েছে।
      */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center">
        
        {/* LEFT - Logo (.nav-logo) */}
        <div className="flex justify-start flex-1">
          <Link to="/" className="text-[#f0f0f8] no-underline">
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] cursor-pointer leading-none">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </Link>
        </div>
        
        {/* MIDDLE - Links (Perfectly Centered) */}
        <ul className="items-center justify-center flex-none hidden gap-8 p-0 m-0 list-none md:flex">
          <li>
            <a href="#features-section" className="text-[14px] font-medium text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] block leading-none">
              Features
            </a>
          </li>
          <li>
            <a href="#templates-section" className="text-[14px] font-medium text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] block leading-none">
              Templates
            </a>
          </li>
          <li>
            <a href="#how-section" className="text-[14px] font-medium text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] block leading-none">
              How it works
            </a>
          </li>
        </ul>
        
        {/* RIGHT - Auth Actions */}
        <div className="flex-1 flex justify-end items-center gap-[10px]">
          
          <div className="items-center hidden gap-[10px] md:flex">
            {user ? (
              <>
                <Link to="/dashboard" className="text-[14px] font-medium text-[#7070a0] hover:text-[#f0f0f8] no-underline transition-colors duration-200 mr-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${baseBtnClass} bg-transparent text-[#7070a0] border border-[#2a2a38] hover:border-[#7c5cfc] hover:text-white`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Log In */}
                <Link 
                  to="/login" 
                  className={`${baseBtnClass} bg-transparent text-[#7070a0] border border-[#2a2a38] hover:border-[#7c5cfc] hover:text-white text-center no-underline`}
                >
                  Log in
                </Link>
                
                {/* Sign Up */}
                <Link 
                  to="/register" 
                  className={`${baseBtnClass} bg-[#7c5cfc] text-white hover:bg-[#6a4ae8] text-center no-underline shadow-lg shadow-[#7c5cfc]/10 hover:shadow-[#7c5cfc]/25`}
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#7070a0] hover:text-white focus:outline-none cursor-pointer p-1 line-none"
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
        <div className="md:hidden bg-[#0a0a0f]/95 border-b border-[#2a2a38] px-6 py-6 flex flex-col gap-6 backdrop-blur-lg mt-[18px]">
          <ul className="flex flex-col gap-5 text-lg text-[#7070a0] font-medium list-none p-0 m-0">
            <li><a href="#features-section" onClick={() => setIsOpen(false)} className="block py-1 no-underline hover:text-white">Features</a></li>
            <li><a href="#templates-section" onClick={() => setIsOpen(false)} className="block py-1 no-underline hover:text-white">Templates</a></li>
            <li><a href="#how-section" onClick={() => setIsOpen(false)} className="block py-1 no-underline hover:text-white">How it works</a></li>
          </ul>
          <div className="h-[1px] bg-[#2a2a38] w-full" />
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full text-center text-base text-[#7070a0] hover:text-white no-underline py-2">Dashboard</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full py-2.5 text-base border border-[#2a2a38] rounded-[8px] text-[#7070a0] hover:text-white">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 text-base border border-[#2a2a38] rounded-[8px] text-[#7070a0] hover:text-white no-underline">Log in</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2.5 text-base bg-[#7c5cfc] text-white rounded-[8px] font-medium no-underline">Sign up free</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;