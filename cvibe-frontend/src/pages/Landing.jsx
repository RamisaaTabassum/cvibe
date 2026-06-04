import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  // Premium Micro-bounce interaction
  const bounceTransition = "transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform hover:scale-[1.04] active:scale-[0.96]";

  return (
    <section
      id="landing"
      className="relative min-h-screen w-full bg-[#0a0a0f] flex flex-col items-center justify-center text-center px-6 md:px-[48px] pt-[72px] pb-12 overflow-hidden"
    >
      {/* Hero Glow Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(124,92,252,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Hero Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

      {/* Content Container (Optically Centered Wrapper) */}
      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center justify-center">
        
        {/* Tagline Badge (.hero-tag) */}
        <div className="inline-flex items-center gap-2 bg-[#7c5cfc]/10 border border-[#7c5cfc]/30 text-[#7c5cfc] text-[12px] font-medium py-1.5 px-4 rounded-full tracking-[0.08em] uppercase mb-6 md:mb-8 select-none">
          ✦ AI-Powered CV Builder
        </div>

        {/* Hero Title (.hero-title) */}
        <h1 className="font-['Bebas_Neue',sans-serif] text-[clamp(68px,11vw,140px)] leading-[0.95] tracking-[3px] text-[#f0f0f8] m-0 mb-6 uppercase flex flex-col items-center select-none">
          <div>LEVEL UP</div>
          {/* Responsive Layout */}
          <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
            <span className="text-transparent [text-stroke:1px_rgba(255,255,255,0.3)] [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
              YOUR
            </span>
            <span className="text-[#7c5cfc]">CAREER</span>
          </div>
        </h1>

        {/* Subtitle / Description (.hero-sub) */}
        <p className="text-[16px] md:text-[18px] text-[#7070a0] max-w-[540px] leading-[1.7] m-0 mb-10 md:mb-12 px-3">
          AI-driven precision, smart keyword suggestions, live preview, and beautiful templates. Your dream job starts here.
        </p>

        {/* Action Buttons (.hero-btns) */}
        <div className="flex flex-wrap gap-[14px] justify-center items-center w-full px-4">
          <button
            onClick={() => navigate("/register")}
            className={`w-full sm:w-auto py-3.5 px-8 text-[15px] font-semibold rounded-[10px] bg-[#7c5cfc] text-white border-none shadow-lg shadow-[#7c5cfc]/10 hover:shadow-[#7c5cfc]/25 cursor-pointer ${bounceTransition}`}
          >
            Build My CV Free ↗
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

        {/* Stats Grid (.hero-stats) */}
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
  );
}