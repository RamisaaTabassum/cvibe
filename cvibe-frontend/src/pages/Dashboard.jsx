import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteCV, getDashboard, incrementDownloadCount } from "../utils/cvApi";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cvs, setCvs] = useState([]); 
  const [deletingId, setDeletingId] = useState(null);
  const [stats, setStats] = useState({
    cvsCreated: 0,
    downloads: 0,
    aiUses: 0,
    bestScore: 0
  });

  const userName = user?.name || "User";

  const fetchDashboardData = async () => {
    try {
      const res = await getDashboard();
      if (res.data?.success) {
        const fetchedCvs = res.data.cvs || [];
        setCvs(fetchedCvs);

        // ১. ফ্রন্টএন্ড ক্যালকুলেশন (Fallback Calculators)
        const calculatedCvsCreated = fetchedCvs.length;

        const calculatedBestScore = fetchedCvs.reduce((max, cv) => {
          const score = cv.atsScore || cv.score || cv.qualityScore || 0;
          return score > max ? score : max;
        }, 0);

        const calculatedDownloads = fetchedCvs.reduce((sum, cv) => {
          return sum + (cv.downloadCount || cv.downloads || 0);
        }, 0);

        const calculatedAiUses = fetchedCvs.reduce((sum, cv) => {
          return sum + (cv.aiUses || (cv.aiUsed ? 1 : 0));
        }, 0);

        // ২. API থেকে আসা ডাটা ও ফ্রন্টএন্ড ফলব্যাক মার্চ করা
        const apiStats = res.data.stats || {};

        setStats({
          cvsCreated: apiStats.cvsCreated ?? calculatedCvsCreated,
          downloads: apiStats.downloads ?? calculatedDownloads,
          aiUses: apiStats.aiUses ?? calculatedAiUses,
          bestScore: apiStats.bestScore ?? calculatedBestScore
        });
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [location.key]);

  const handleDownload = async (cvId, cvTitle) => {
    try {
      const cleanedTitle = (cvTitle || "My_CV").trim().replace(/\s+/g, "_");
      const defaultFilename = `${cleanedTitle}_CVibe.pdf`;

      if (window.showSaveFilePicker) {
        await window.showSaveFilePicker({
          suggestedName: defaultFilename,
          types: [{
            description: 'PDF Document',
            accept: { 'application/pdf': ['.pdf'] },
          }],
        });
        
        await incrementDownloadCount(cvId);
        fetchDashboardData(); 
      } else {
        navigate(`/builder/${cvId}`, { state: { triggerDownload: true, cvTitle } });
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log("User cancelled the save directory selection.");
      } else {
        console.error("Failed to process download from dashboard:", err);
        navigate(`/builder/${cvId}`);
      }
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteCV(id);
      if (res.data?.success || res.status === 200) {
        setCvs((prevCvs) => prevCvs.filter((cv) => cv._id !== id));
        setStats((prevStats) => ({
          ...prevStats,
          cvsCreated: Math.max(0, prevStats.cvsCreated - 1)
        }));
      } else {
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Failed to delete CV:", err);
      fetchDashboardData();
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleQuickAction = (actionTitle) => {
    if (cvs.length === 0) {
      navigate("/builder");
      return;
    }
    
    const latestCvId = cvs[0]._id;

    switch (actionTitle) {
      case "Build New CV":
        navigate("/builder");
        break;
      case "Keyword Check":
      case "Grammar Fix":
        navigate(`/builder/${latestCvId}`, { state: { openTab: "Personal" } });
        break;
      case "CV Score":
        navigate(`/builder/${latestCvId}`, { state: { openTab: "ATS Audit" } });
        break;
      default:
        navigate("/builder");
    }
  };

  const baseBtnClass = "py-[10px] px-[22px] rounded-[8px] font-['DM_Sans',sans-serif] text-[14px] font-medium cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  return (
    <div id="user-dashboard" className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-['DM_Sans',sans-serif] flex flex-col antialiased">
      
      <nav className="dashboard-nav fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-[16px] border-b border-[#2a2a38] py-[18px] px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
          <div onClick={() => navigate("/")} className="dash-logo font-['Bebas_Neue',sans-serif] text-[28px] tracking-[2px] text-[var(--text)] cursor-pointer select-none leading-none">
            CV<span className="text-[var(--accent)]">ibe</span>
          </div>
          <div className="flex items-center gap-[12px]">
            <button onClick={() => navigate("/builder")} className={`${baseBtnClass} bg-[var(--accent)] text-white hover:bg-[#6a4ae8] py-2 px-4 shadow-lg shadow-[#7c5cfc]/10`}>
              + New CV
            </button>
            <div className="flex items-center gap-[12px] user-info">
              <div className="user-avatar w-[36px] h-[36px] rounded-full bg-[var(--accent)] flex items-center justify-center text-[14px] font-semibold text-white uppercase font-['DM_Sans',sans-serif]">
                {userName[0]}
              </div>
              <span className="user-name text-[14px] font-medium text-[var(--text)] hidden sm:inline font-['DM_Sans',sans-serif]">{userName}</span>
            </div>
            <button onClick={handleLogout} className="py-2 px-3.5 border border-[#2a2a38] rounded-[8px] text-[var(--muted)] text-[13px] font-medium hover:text-[var(--text)] hover:border-[var(--text)] transition duration-200 cursor-pointer ml-1 font-['DM_Sans',sans-serif]">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-body pt-[110px] pb-12 px-6 sm:px-12 md:px-16 lg:px-24 w-full max-w-[1600px] mx-auto flex-grow">
        <div className="mb-10 dash-welcome">
          <h1 className="font-['Bebas_Neue',sans-serif] text-[42px] sm:text-[46px] md:text-[52px] tracking-[2px] mb-2 text-[var(--text)] uppercase leading-none">
            WELCOME BACK, <span className="text-[var(--accent)]">{userName}</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[var(--muted)] font-['DM_Sans',sans-serif]">Here's an overview of your CV activity and quick actions.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10 dash-stats lg:grid-cols-4">
          {[
            { icon: "📄", num: stats.cvsCreated, label: "CVs Created" },
            { icon: "⬇️", num: stats.downloads, label: "Downloads" },
            { icon: "✦", num: stats.aiUses, label: "AI Uses" },
            { icon: "🎯", num: `${stats.bestScore}%`, label: "Best Score" }
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

        <div className="dash-grid grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-6 items-start">
          <div className="dash-panel bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-5 md:p-6 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-5 panel-hdr">
                <h3 className="panel-title text-[15px] font-semibold text-[var(--text)] font-['DM_Sans',sans-serif]">Your CVs</h3>
                <button onClick={() => navigate("/builder")} className="px-4 py-1.5 rounded-[6px] bg-[var(--accent)] text-white text-[12px] font-medium hover:opacity-90 transition font-['DM_Sans',sans-serif]">
                  + New
                </button>
              </div>
              
              {cvs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-14 text-[var(--muted)]">
                  <div className="text-[40px] mb-2 opacity-20">📄</div>
                  <h4 className="text-[14px] font-semibold text-[#ffffff] font-['DM_Sans',sans-serif]">No CVs found</h4>
                  <p className="text-[12px] text-[var(--muted)] max-w-xs mt-1 font-['DM_Sans',sans-serif]">Create your first document to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cvs.map((cv) => (
                    <div 
                      key={cv._id} 
                      className={`cv-card flex flex-col sm:flex-row sm:items-center justify-between p-[14px] bg-[var(--surface2)] rounded-[12px] border border-[var(--border)] transition-all duration-300 gap-3 sm:gap-4 ${
                        deletingId === cv._id ? "opacity-40 scale-[0.98] pointer-events-none" : ""
                      }`}
                    >
                      <div className="cv-info flex items-center gap-[16px] min-w-0 flex-1">
                        <div className={`cv-thumb w-10 h-[50px] rounded-[6px] flex items-center justify-center text-[18px] flex-shrink-0 ${
                          cv.template === 'purple' ? 'bg-[#7c5cfc]/20' : 
                          cv.template === 'red' ? 'bg-[#fc5c7d]/20' : 'bg-[#5cfcba]/20'
                        }`}>
                          📄
                        </div>
                        <div className="min-w-0">
                          <h4 className="cv-name-txt text-[14px] font-medium text-[var(--text)] mb-0.5 truncate font-['DM_Sans',sans-serif]">{cv.title || "Untitled CV"}</h4>
                          <p className="cv-meta text-[12px] text-[var(--muted)] truncate font-['DM_Sans',sans-serif]">
                            Last Updated: {cv.updatedAt ? new Date(cv.updatedAt).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="cv-actions flex gap-[6px] self-end sm:self-auto">
                        <button onClick={() => navigate(`/builder/${cv._id}`)} className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]" title="Edit">✏️</button>
                        <button onClick={() => handleDownload(cv._id, cv.title)} className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]" title="Download">⬇️</button>
                        <button 
                          onClick={() => handleDelete(cv._id)} 
                          className="icon-btn w-8 h-8 rounded-[8px] border border-[var(--border)] bg-transparent text-[var(--muted)] flex items-center justify-center text-[14px] transition-all duration-200 hover:border-red-500 hover:text-red-500" 
                          title="Delete"
                        >
                          {deletingId === cv._id ? "⌛" : "🗑️"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => navigate("/builder")} className="w-full mt-6 py-3 text-center bg-transparent border border-[var(--border)] rounded-xl text-[13px] font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition cursor-pointer font-['DM_Sans',sans-serif]">
              + Create New CV
            </button>
          </div>

          <div className="dash-panel bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-5 md:p-6">
            <h3 className="panel-title text-[15px] font-semibold text-[var(--text)] mb-5 font-['DM_Sans',sans-serif]">Quick Actions</h3>
            <div className="quick-actions flex flex-col gap-[10px]">
              {[
                { icon: "✦", title: "Build New CV", desc: "Start from a template", iconClass: "bg-[#7c5cfc]/20 text-[#7c5cfc]" },
                { icon: "🎯", title: "Keyword Check", desc: "Analyze a job description", iconClass: "bg-[#fc5c7d]/20 text-[#fc5c7d]" },
                { icon: "✍️", title: "Grammar Fix", desc: "Improve your writing", iconClass: "bg-[#5cfcba]/20 text-[#5cfcba]" },
                { icon: "📊", title: "CV Score", desc: "Check completeness", iconClass: "bg-[#7c5cfc]/20 text-[#7c5cfc]" },
              ].map((action, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleQuickAction(action.title)} 
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