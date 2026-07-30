import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); 

  const [filter, setFilter] = useState("All");
  const tabs = ["All", "Fresh Graduate", "Professional", "Coach / Frequent"];

  const bounceTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  const handleCTA = () => {
    if (loading) return; 

    if (user) {
      if (user.role === 'admin') {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="w-full bg-[#0a0a0f] text-[#f0f0f8] font-sans flex flex-col">
      
      {/* ── LANDING HERO SECTION ── */}
      <section
        id="landing"
        className="relative flex-1 w-full flex flex-col items-center justify-center text-center px-6 md:px-[48px] pt-[120px] pb-12 overflow-hidden min-h-[calc(100vh-80px)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 bg-[#7c5cfc]/10 border border-[#7c5cfc]/30 text-[#7c5cfc] text-[12px] font-medium py-1.5 px-4 rounded-full tracking-[0.08em] uppercase mb-6 md:mb-8 select-none">
            ✦ AI-Powered CV Builder
          </div>

          <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(68px,11vw,140px)] leading-[0.95] tracking-[3px] text-[#f0f0f8] m-0 mb-6 uppercase flex flex-col items-center select-none">
            <div>LEVEL UP</div>
            <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
              <span className="text-transparent [text-stroke:1px_rgba(255,255,255,0.3)] [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
                YOUR
              </span>
              <span className="text-[#7c5cfc]">CAREER</span>
            </div>
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#7070a0] max-w-[540px] leading-[1.7] m-0 mb-10 md:mb-12 px-3">
            AI-driven precision, smart keyword suggestions, live preview, and beautiful templates. Your dream job starts here.
          </p>

          <div className="flex flex-wrap gap-[14px] justify-center items-center w-full px-4">
            <button
              onClick={handleCTA}
              disabled={loading}
              className={`w-full sm:w-auto py-3.5 px-8 text-[15px] font-semibold rounded-[10px] bg-[#7c5cfc] text-white border-none shadow-lg shadow-[#7c5cfc]/10 hover:shadow-[#7c5cfc]/25 cursor-pointer ${bounceTransition} disabled:opacity-50`}
            >
              {loading ? "Checking Session..." : "Build My CV Free ↗"}
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("templates-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`w-full sm:w-auto py-3.5 px-8 text-[15px] font-medium rounded-[10px] bg-transparent text-[#f0f0f8] border-[1.5px] border-[#2a2a38] hover:border-[#7c5cfc] hover:text-[#7c5cfc] cursor-pointer ${bounceTransition}`}
            >
              View Templates
            </button>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 mt-[64px] md:mt-[72px] justify-center items-center border-t border-[#2a2a38]/40 pt-7 w-full max-w-[850px]">
            {[
              ["3", "User Types"],
              ["12+", "Templates"],
              ["AI", "Powered"],
              ["FREE", "PDF Export"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="text-center min-w-[90px] sm:min-w-[110px] flex-1 sm:flex-none"
              >
                <div className="font-['Bebas_Neue',sans-serif] text-[clamp(38px,4vw,48px)] text-[#f0f0f8] tracking-[1px] leading-none">
                  {num}
                </div>
                <div className="text-[11px] text-[#7070a0] mt-1.5 tracking-[0.06em] uppercase font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features-section" style={{ padding: "100px 48px", background: "#0d0d14" }}>
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 64px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cfc", marginBottom: 16, display: "block" }}>What we offer</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: 2, marginBottom: 16, lineHeight: 1, color: "#f0f0f8" }}>EVERYTHING YOUR<br />CV NEEDS</h2>
          <p style={{ fontSize: 16, color: "#7070a0", lineHeight: 1.7 }}>Smart AI tools meet beautiful design — everything to get your CV noticed.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, maxWidth: 1100, margin: "0 auto", border: "1px solid #2a2a38", borderRadius: 16, overflow: "hidden" }}>
          {[
            ["🎯","Keyword Suggestions","Paste a job description and get AI-powered keywords specific to that role. Know exactly what recruiters scan for."],
            ["✍️","Grammar Fix","Real-time grammar correction and professional phrasing. Turn weak bullets into powerful impact statements."],
            ["👁️","Live Preview","Watch your CV update in real time as you type. No more download → check → repeat frustration."],
            ["📄","Free PDF Export","Clean, watermark-free PDF. What you see is exactly what you get. No hidden fees, no credit card."],
            ["📊","Completeness Score","Smart progress tracker shows which sections need work and what to add to strengthen your CV."],
            ["🗂️","Role-Based Templates","Templates grouped by user type — fresh graduate, professional, or frequent applicant."],
          ].map(([icon,title,desc], i) => (
            <div key={title} style={{ background: "#0d0d14", padding: "36px 32px", borderRight: i%3===2 ? "none" : "1px solid #2a2a38", borderBottom: i<3 ? "1px solid #2a2a38" : "none" }}>
              <div style={{ fontSize: 28, marginBottom: 20 }}>{icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: "#f0f0f8" }}>{title}</div>
              <div style={{ fontSize: 14, color: "#7070a0", lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEMPLATES SECTION ── */}
      <section id="templates-section" style={{ padding: "100px 48px", background: "#0a0a0f" }}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cfc", marginBottom: 16, display: "block" }}>Templates</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: 2, marginBottom: 16, lineHeight: 1, color: "#f0f0f8" }}>PICK YOUR STYLE</h2>
          <p style={{ fontSize: 16, color: "#7070a0", lineHeight: 1.7 }}>Every template is ATS-friendly and optimize for your profile type.<br />Switch anytime.</p>
        </div>

        {/* Filter Tabs */}
        <div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setFilter(tab)} 
                style={{ padding: "8px 20px", borderRadius: 20, border: "1px solid #2a2a38", background: filter===tab ? "#7c5cfc" : "transparent", color: filter===tab ? "#fff" : "#7070a0", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {[ ["Dark","Fresh Graduate","linear-gradient(135deg,#1a1e2e,#1b2637)","#141423"],
              ["Purple","Fresh Graduate","linear-gradient(135deg,#1a1a2e,#16213e)","#7c5cfc"],
              ["Pro Green","Professional","linear-gradient(135deg,#1a2e1a,#162116)","#5cfc9a"],
              ["Bold Red","Coach / Frequent","linear-gradient(135deg,#2e1a1a,#211616)","#fc5c7d"],   
               ["Bold ","Coach / Frequent","linear-gradient(135deg,#2e1a1a,#211616)","#7e4242"]

            ].filter(([,type]) => filter==="All" || type===filter).map(([name,type,bg,color]) => (
              <div 
                key={name} 
                onClick={handleCTA} 
                style={{ border: "1px solid #2a2a38", borderRadius: 16, overflow: "hidden", cursor: "pointer", background: "#111118" }}
              >
                <div style={{ height: 160, background: bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                  <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 12 }}>
                    <div style={{ height: 18, borderRadius: 4, background: color, marginBottom: 10 }} />
                    <div style={{ height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)", marginBottom: 6 }} />
                    <div style={{ height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)", marginBottom: 6, width: "80%" }} />
                    <div style={{ height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)", width: "60%" }} />
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f8" }}>{name}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, background: "rgba(124,92,252,0.15)", color: "#7c5cfc", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.05em" }}>ATS</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#7070a0" }}>{type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section id="how-section" style={{ padding: "100px 48px", background: "#0d0d14" }}>
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7c5cfc", marginBottom: 16, display: "block" }}>Process</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: 2, marginBottom: 16, lineHeight: 1, color: "#f0f0f8" }}>HOW IT WORKS</h2>
          <p style={{ fontSize: 16, color: "#7070a0", lineHeight: 1.7 }}>From blank page to polished PDF in 4 simple steps.</p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", maxWidth: 1000, margin: "0 auto" }}>
          {[
            ["01","Choose template","Pick a template suited to your profile type."],
            ["02","Fill your details","Complete the guided form with helper prompts in every field."],
            ["03","Use AI tools","Get keywords from job descriptions and fix grammar instantly."],
            ["04","Download PDF","Export a clean, watermark-free PDF ready to send."],
          ].map(([num,title,desc], i) => (
            <div key={num} style={{ display: "flex", flex: 1, alignItems: "center" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 16px" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: "#2a2a38", lineHeight: 1, marginBottom: 20 }}>{num}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#f0f0f8" }}>{title}</div>
                <div style={{ fontSize: 13, color: "#7070a0", lineHeight: 1.7 }}>{desc}</div>
              </div>
              {i < 3 && <div style={{ paddingTop: 24, color: "#2a2a38", fontSize: 20 }}>→</div>}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}