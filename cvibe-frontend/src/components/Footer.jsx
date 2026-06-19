import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#2a2a38] pt-[60px] pb-[40px] px-6 md:px-[48px] flex flex-col items-center gap-5 text-center font-sans">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center gap-5">
        
       
        <Link to="/" className="inline-block no-underline transition-transform duration-200 hover:scale-105">
          <div className="font-['Bebas_Neue',sans-serif] text-[32px] tracking-[3px] text-[#f0f0f8]">
            CV<span className="text-[#7c5cfc]">ibe</span>
          </div>
        </Link>
        
       
        <p className="text-[14px] text-[#7070a0] max-w-md md:max-w-xl font-normal m-0 leading-relaxed">
          Level up your career with AI-driven precision and smart automation.
        </p>
        
      
        <div className="flex flex-wrap justify-center gap-8 mt-1">
          <a href="#features-section" className="text-[13px] text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] cursor-pointer">
            Features
          </a>
          <a href="#templates-section" className="text-[13px] text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] cursor-pointer">
            Templates
          </a>
          <a href="#how-section" className="text-[13px] text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8] cursor-pointer">
            How it works
          </a>
          <Link to="/login" className="text-[13px] text-[#7070a0] no-underline transition-colors duration-200 hover:text-[#f0f0f8]">
            Login
          </Link>
        </div>
        
   
        <div className="text-[12px] text-[#3a3a5a] mt-2 font-normal tracking-wide">
          CVibe — Software Engineering Lab, CSE-3642, IIUC Spring 2026
        </div>

      </div>
    </footer>
  );
};

export default Footer;