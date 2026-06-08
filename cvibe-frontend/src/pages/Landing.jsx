import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#0a0a0f] text-[#f0f0f8] relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,252,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(#2a2a38_1px,transparent_1px),linear-gradient(90deg,#2a2a38_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs uppercase tracking-widest text-[#7c5cfc] bg-[#7c5cfc]/10 border border-[#7c5cfc]/30 rounded-full">
          ✦ AI-Powered CV Builder
        </div>

        {/* Title */}
        <h1 className="text-[clamp(48px,10vw,140px)] leading-[0.95] font-bold tracking-widest font-[Bebas_Neue]">
          LEVEL UP <br />
          <span className="text-[#7c5cfc]">YOUR CAREER</span>
        </h1>

        {/* Description */}
        <p className="mt-6 mb-12 text-lg text-[#7070a0] leading-relaxed max-w-xl mx-auto">
          AI-driven precision, smart keyword suggestions, live preview, and beautiful templates.
          Your dream job starts here.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-lg bg-[#7c5cfc] text-white font-medium hover:opacity-90 transition"
          >
            Build My CV Free ↗
          </button>

          <button
            onClick={() =>
              document
                .getElementById("templates-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 rounded-lg border border-[#2a2a38] text-[#f0f0f8] hover:bg-[#1a1a24] transition"
          >
            View Templates
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mt-20">
          {[
            ["3", "User Types"],
            ["12+", "Templates"],
            ["AI", "Powered"],
            ["FREE", "PDF Export"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold tracking-wide font-[Bebas_Neue]">
                {num}
              </div>
              <div className="text-xs uppercase tracking-wider text-[#7070a0] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}