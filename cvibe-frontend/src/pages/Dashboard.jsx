import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f8] font-sans">

      {/* 🧭 NAV — Perfectly Matched with Website Navbar Layout */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#2a2a38]">
        <div className="flex items-center w-full max-w-6xl px-6 py-4 mx-auto md:px-12">
          
          {/* LEFT - Logo Container (flex-1 forces equal width) */}
          <div className="flex justify-start flex-1">
            <div 
              onClick={() => navigate("/")}
              className="font-['Bebas_Neue',sans-serif] text-[24px] tracking-[2px] cursor-pointer"
            >
              CV<span className="text-[#7c5cfc]">ibe</span>
            </div>
          </div>
          
          {/* MIDDLE - Links (Perfectly centered, matching main website) */}
          <ul className="hidden md:flex items-center gap-8 text-sm text-[#7070a0] font-sans font-medium justify-center flex-none">
            <li><a href="/#features-section" className="transition hover:text-white">Features</a></li>
            <li><a href="/#templates-section" className="transition hover:text-white">Templates</a></li>
            <li><a href="/#how-section" className="transition hover:text-white">How it works</a></li>
          </ul>
          
          {/* RIGHT - Controls (flex-1 forces equal width, keeping middle centered) */}
          <div className="flex items-center justify-end flex-1 gap-4">
            <button 
              onClick={() => navigate("/builder")} 
              className="hidden sm:block px-5 py-2 rounded-lg bg-[#7c5cfc] text-white text-[13px] font-medium cursor-pointer hover:bg-[#6a4ae8] transition"
            >
              + New CV
            </button>
            
            {/* User Profile Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#7c5cfc] flex items-center justify-center text-[14px] font-semibold text-white uppercase">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-[14px] font-medium hidden md:inline">{user?.name}</span>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-lg border border-[#2a2a38] text-[#7070a0] text-[13px] font-medium cursor-pointer hover:text-white hover:border-white transition"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* BODY WRAPPER — Perfectly Aligned with max-w-6xl */}
      <div className="max-w-6xl px-6 mx-auto md:px-12 pt-[120px] pb-10 w-full">

        {/* WELCOME SECTION */}
        <div className="mb-10">
          <h1 className="font-['Bebas_Neue',sans-serif] text-[40px] sm:text-[48px] tracking-[2px] mb-2 uppercase">
            WELCOME BACK, <span className="text-[#7c5cfc]">{user?.name?.toUpperCase()}</span>
          </h1>
          <p className="text-[15px] text-[#7070a0]">Here's an overview of your CV activity and quick actions.</p>
        </div>

        {/* STATS GRID — Responsive: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-4">
          {[
            ["📄", "0", "CVs Created"],
            ["⬇️", "0", "Downloads"],
            ["✦", "0", "AI Uses"],
            ["🎯", "—", "Best Score"]
          ].map(([icon, num, label]) => (
            <div key={label} className="bg-[#111118] border border-[#2a2a38] rounded-[14px] p-5">
              <div className="text-[22px] mb-2">{icon}</div>
              <div className="font-['Bebas_Neue',sans-serif] text-[32px] sm:text-[36px] tracking-[1px] text-white leading-none">{num}</div>
              <div className="text-[13px] text-[#7070a0] mt-1.5">{label}</div>
            </div>
          ))}
        </div>

        {/* MAIN PANEL GRID — Responsive: Stacks on mobile, 2fr 1fr on desktop */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* CVs Panel (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 bg-[#111118] border border-[#2a2a38] rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[15px] font-semibold">Your CVs</div>
              <button 
                onClick={() => navigate("/builder")} 
                className="px-4 py-1.5 rounded-lg bg-[#7c5cfc] text-white text-[12px] font-medium cursor-pointer hover:bg-[#6a4ae8] transition"
              >
                + New
              </button>
            </div>
            
            {/* Empty State */}
            <div className="text-center py-10 text-[#7070a0]">
              <div className="text-[40px] mb-3">📄</div>
              <p className="text-[14px] mb-5">No CVs yet. Create your first one!</p>
              <button 
                onClick={() => navigate("/builder")} 
                className="px-6 py-3 rounded-lg bg-[#7c5cfc] text-white text-[13px] font-medium cursor-pointer hover:bg-[#6a4ae8] transition"
              >
                + Create New CV
              </button>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-[#111118] border border-[#2a2a38] rounded-2xl p-6">
            <div className="text-[15px] font-semibold mb-5">Quick Actions</div>
            <div className="flex flex-col gap-3">
              {[
                ["rgba(124,92,252,0.15)", "✦", "Build New CV", "Start from a template", "/builder"],
                ["rgba(252,92,125,0.15)", "🎯", "Keyword Check", "Analyse a job description", null],
                ["rgba(92,252,184,0.15)", "✍️", "Grammar Fix", "Improve your writing", null],
                ["rgba(124,92,252,0.15)", "📊", "CV Score", "Check completeness", null],
              ].map(([bg, icon, title, desc, path]) => (
                <div 
                  key={title} 
                  onClick={() => path && navigate(path)} 
                  className={`flex items-center gap-3.5 p-3.5 bg-[#1a1a24] border border-[#2a2a38] rounded-xl transition ${
                    path ? "cursor-pointer hover:border-[#7c5cfc]/50" : "cursor-default opacity-70"
                  }`}
                >
                  <div 
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[16px] flex-shrink-0"
                    style={{ background: bg }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#f0f0f8]">{title}</div>
                    <div className="text-[11px] text-[#7070a0] mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}