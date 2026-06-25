import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [cvs, setCvs] = useState([]);

  const userName = user?.name || "User";

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner text="Loading your dashboard..." />
    </div>
  );
}


  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  return (
    <div id="user-dashboard" className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-['DM_Sans',sans-serif] flex flex-col antialiased">
      
      {/* 🧭 MATCHING FIXED NAVBAR */}
      <nav className="dashboard-nav fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* .dash-logo */}
          <div 
            onClick={() => navigate("/")}
            className="dash-logo font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-[var(--text)] cursor-pointer select-none leading-none"
          >
            CV<span className="text-[var(--accent)]">ibe</span>
          </div>
          
          {/* Right Action Controls */}
          <div className="flex items-center gap-[12px]">
            <button 
              onClick={() => navigate("/builder")} 
              className={`${baseBtnClass} bg-[var(--accent)] text-white hover:bg-[#6a4ae8] py-2 px-4 shadow-lg shadow-[#7c5cfc]/10`}
            >
              + New CV
            </button>
            
            {/* .user-info */}
            <div className="flex items-center gap-[12px] user-info">
              {/* .user-avatar */}
              <div className="user-avatar w-[36px] h-[36px] rounded-full bg-[var(--accent)] flex items-center justify-center text-[14px] font-semibold text-white uppercase font-['DM_Sans',sans-serif]">
                {userName[0]}
              </div>
              {/* .user-name */}
              <span className="user-name text-[14px] font-medium text-[var(--text)] hidden sm:inline font-['DM_Sans',sans-serif]">{userName}</span>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="py-2 px-3.5 border border-[#2a2a38] rounded-[8px] text-[var(--muted)] text-[13px] font-medium hover:text-[var(--text)] hover:border-[var(--text)] transition duration-200 cursor-pointer ml-1 font-['DM_Sans',sans-serif]"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* 📊 .dashboard-body (Strictly 1600px limits & side padding) */}
      <main className="dashboard-body pt-[110px] pb-12 px-6 sm:px-12 md:px-16 lg:px-24 w-full max-w-[1600px] mx-auto flex-grow">
        
        {/* .dash-welcome */}
        <div className="mb-10 dash-welcome">
          <h1 className="font-['Bebas_Neue',sans-serif] text-[42px] sm:text-[46px] md:text-[52px] tracking-[2px] mb-2 text-[var(--text)] uppercase leading-none">
            WELCOME BACK, <span className="text-[var(--accent)]">{userName}</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[var(--muted)] font-['DM_Sans',sans-serif]">Here's an overview of your CV activity and quick actions.</p>
        </div>

        {/* 📈 .dash-stats */}
        <div className="grid grid-cols-2 gap-4 mb-10 dash-stats lg:grid-cols-4">
          {[
            { icon: "📄", num: cvs.length, label: "CVs Created" },
            { icon: "⬇️", num: "0", label: "Downloads" },
            { icon: "✦", num: "0", label: "AI Uses" },
            { icon: "🎯", num: "0%", label: "Best Score" }
          ].map((stat, idx) => (
            <div key={idx} className="dstat bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5 flex flex-col items-start justify-between">
              <div className="dstat-icon text-[22px] mb-2">{stat.icon}</div>
              <div>
                <div className="dstat-num font-['Bebas_Neue',sans-serif] text-[34px] md:text-[38px] tracking-[1px] text-[var(--text)] leading-none">
                  {stat.num}
                </div>
                <div className="dstat-label text-[13px] text-[var(--muted)] mt-1 font-['DM_Sans',sans-serif]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 🗂️ .dash-grid */}
        <div className="dash-grid grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6 items-start">

          {/* Left Block Panel: Your CVs */}
          <div className="dash-panel bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-5 md:p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              {/* .panel-hdr */}
              <div className="flex items-center justify-between mb-5 panel-hdr">
                <h3 className="panel-title text-[15px] font-semibold text-[var(--text)] font-['DM_Sans',sans-serif]">Your CVs</h3>
                <button 
                  onClick={() => navigate("/builder")} 
                  className="px-4 py-1.5 rounded-[6px] bg-[var(--accent)] text-white text-[12px] font-medium hover:opacity-90 transition font-['DM_Sans',sans-serif]"
                >
                  + New
                </button>
              </div>
              
              {/* Baseline Empty State view */}
                  {cvs.length === 0 ? (
                  <EmptyState
                    icon="📄"
                    title="No CVs found"
                    description="Create your first document to get started."
                  />
                ) : (
                <div className="space-y-3">
                  {cvs.map((cv) => (
                    <div 
                      key={cv.id} 
                      className="cv-card flex flex-col sm:flex-row sm:items-center justify-between p-[14px] bg-[var(--surface2)] rounded-[12px] border border-[var(--border)] transition-colors duration-200 gap-3 sm:gap-4"
                    >
                      <div className="cv-info flex items-center gap-[16px] min-w-0 flex-1">
                        <div className={`cv-thumb w-10 h-[50px] rounded-[6px] flex items-center justify-center text-[18px] flex-shrink-0 ${
                          cv.colorVariant === 'purple' ? 'bg-[#7c5cfc]/20' : 
                          cv.colorVariant === 'pink' ? 'bg-[#fc5c7d]/20' : 'bg-[#5cfcba]/20'
                        }`}>
                          📄
                        </div>
                        <div className="min-w-0">
                          <h4 className="cv-name-txt text-[14px] font-medium text-[var(--text)] mb-0.5 truncate font-['DM_Sans',sans-serif]">{cv.title}</h4>
                          <p className="cv-meta text-[12px] text-[var(--muted)] truncate font-['DM_Sans',sans-serif]">{cv.meta}</p>
                        </div>
                      </div>

                      <div className="cv-actions flex gap-[6px] self-end sm:self-auto">
                        <button onClick={() => navigate(`/builder/${cv.id}`)} className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]" title="Edit">✏️</button>
                        <button className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]" title="Download">⬇️</button>
                        <button className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-red-500 hover:text-red-500" title="Delete">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate("/builder")} 
              className="w-full mt-6 py-3 text-center bg-transparent border border-[var(--border)] rounded-xl text-[13px] font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition cursor-pointer font-['DM_Sans',sans-serif]"
            >
              + Create New CV
            </button>
          </div>

          {/* Right Block Panel: Quick Actions */}
          <div className="dash-panel bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-5 md:p-6">
            <h3 className="panel-title text-[15px] font-semibold text-[var(--text)] mb-5 font-['DM_Sans',sans-serif]">Quick Actions</h3>
            
            <div className="quick-actions flex flex-col gap-[10px]">
              {[
                { icon: "✦", title: "Build New CV", desc: "Start from a template", iconClass: "bg-[#7c5cfc]/20 text-[#7c5cfc]", active: true },
                { icon: "🎯", title: "Keyword Check", desc: "Analyse a job description", iconClass: "bg-[#fc5c7d]/20 text-[#fc5c7d]", active: false },
                { icon: "✍️", title: "Grammar Fix", desc: "Improve your writing", iconClass: "bg-[#5cfcba]/20 text-[#5cfcba]", active: false },
                { icon: "📊", title: "CV Score", desc: "Check completeness", iconClass: "bg-[#7c5cfc]/20 text-[#7c5cfc]", active: false },
              ].map((action, idx) => (
                <div 
                  key={idx} 
                  onClick={() => action.active && navigate("/builder")} 
                  className="qa-btn flex items-center gap-[12px] p-[14px_16px] bg-[var(--surface2)] border border-[var(--border)] rounded-[12px] transition-all duration-200 text-left hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 cursor-pointer"
                >
                  <div className={`qa-icon w-9 h-9 rounded-[10px] flex items-center justify-center text-[16px] flex-shrink-0 ${action.iconClass}`}>
                    {action.icon}
                  </div>
                  <div>
                    <div className="qa-title text-[13px] font-medium text-[var(--text)] font-['DM_Sans',sans-serif]">{action.title}</div>
                    <div className="qa-desc text-[11px] text-[var(--muted)] font-['DM_Sans',sans-serif]">{action.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}