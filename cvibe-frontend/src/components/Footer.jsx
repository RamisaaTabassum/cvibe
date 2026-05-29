const Footer = () => {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[#1f1f2a] text-[#a5a5d6] font-sans">
      {/* Inner grid bounds matching Hero/Navbar exactly */}
      <div className="w-full max-w-6xl px-6 py-8 mx-auto md:px-12">
        <div className="flex flex-col items-center justify-between w-full gap-8 md:flex-row">
          
          {/* LEFT - BRAND (Takes 1/3 width on desktop to maintain center balance) */}
          <div className="text-center md:text-left md:flex-1">
            <div className="font-['Bebas_Neue',sans-serif] text-[24px] tracking-[2px] text-[#f0f0f8]">
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
            <p className="text-xs text-[#5f5e5a] mt-1 font-normal">
              Build professional resumes with AI
            </p>
          </div>
          
          {/* MIDDLE - LINKS (Perfectly centered, aligning with Navbar & Hero text) */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#7070a0] font-medium flex-none">
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">About</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Privacy</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Contact</a>
            <a className="hover:text-[#f0f0f8] transition cursor-pointer">Support</a>
          </div>
          
          {/* RIGHT - SOCIAL (Takes 1/3 width on desktop and aligns items to the right) */}
          <div className="flex gap-3 text-[#7070a0] md:flex-1 justify-center md:justify-end w-full md:w-auto">
            {["f", "in", "x"].map((social) => (
              <a 
                key={social}
                className="w-9 h-9 flex items-center justify-center rounded-md bg-[#111118] border border-[#1f1f2a] hover:border-[#7c5cfc] hover:text-white transition text-xs cursor-pointer"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        {/* BOTTOM */}
        <div className="mt-6 pt-4 border-t border-[#1f1f2a] text-center text-xs text-[#5f5e5a] font-normal">
          © 2026 CVibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;