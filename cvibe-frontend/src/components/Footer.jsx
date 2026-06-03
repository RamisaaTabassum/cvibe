const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#2a2a38] text-[#a5a5d6] font-sans">
      {/* Grid Bounds */}
      <div className="w-full max-w-[1600px] px-8 py-10 mx-auto md:px-16">
        <div className="flex flex-col items-center justify-between w-full gap-8 md:flex-row">
          
          {/* LEFT - BRAND */}
          <div className="text-center md:text-left md:flex-1">
            <div className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-[#f0f0f8]">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
            <p className="text-sm text-[#7070a0] mt-1 font-normal">
              Build professional resumes with AI
            </p>
          </div>
          
          {/* MIDDLE - LINKS */}
          <div className="flex flex-wrap justify-center gap-8 text-base text-[#7070a0] font-medium flex-none">
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">About</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Privacy</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Contact</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Support</a>
          </div>
          
          {/* RIGHT - SOCIAL */}
          <div className="flex gap-3 text-[#7070a0] md:flex-1 justify-center md:justify-end w-full md:w-auto">
            {["f", "in", "x"].map((social) => (
              <a 
                key={social}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111118] border border-[#2a2a38] hover:border-[#7c5cfc] hover:text-white transition text-sm font-medium cursor-pointer"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        {/* BOTTOM */}
        <div className="mt-8 pt-6 border-t border-[#2a2a38] text-center text-sm text-[#7070a0] font-normal">
          © 2026 CVibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;