import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px clamp(20px, 4vw, 60px) 40px",
        position: "relative",
        overflow: "hidden",
        background: "#0a0a0f",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,92,252,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#2a2a38 1px, transparent 1px), linear-gradient(90deg, #2a2a38 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(124,92,252,0.1)",
            border: "1px solid rgba(124,92,252,0.3)",
            color: "#7c5cfc",
            fontSize: "13px",
            fontWeight: 500,
            padding: "8px 18px",
            borderRadius: "999px",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          ✦ AI-Powered CV Builder
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(65px, 10vw, 150px)", // ডেস্কটপে ওভারফ্লো রোধ করতে এবং সুন্দর ফিট করতে সাইজ অ্যাডজাস্ট করা হয়েছে
            lineHeight: "0.95",
            letterSpacing: "2px",
            margin: 0,
            textTransform: "uppercase",
            color: "#f0f0f8",
          }}
        >
          <div>LEVEL UP</div>

          {/* Responsive Wrapper: মোবাইলে উপর-নিচ, ডেস্কটপে পাশাপাশি */}
          <div className="flex flex-col items-center justify-center md:flex-row md:gap-4">
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.25)",
              }}
            >
              YOUR
            </span>
            <span style={{ color: "#7c5cfc" }}>CAREER</span>
          </div>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(16px, 1.2vw, 20px)",
            color: "#7070a0",
            maxWidth: "700px",
            lineHeight: 1.7,
            marginTop: "24px",
            marginBottom: "40px",
            padding: "0 12px",
          }}
        >
          AI-driven precision, smart keyword suggestions, live preview, and
          beautiful templates. Your dream job starts here.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "15px 36px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "none",
              background: "#7c5cfc",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Build My CV Free ↗
          </button>

          <button
            onClick={() =>
              document
                .getElementById("templates-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "15px 36px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1.5px solid #2a2a38",
              background: "transparent",
              color: "#f0f0f8",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            View Templates
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "clamp(20px,4vw,60px)",
            marginTop: "60px",
            justifyContent: "center",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(42,42,56,.4)",
            paddingTop: "28px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {[
            ["3", "User Types"],
            ["12+", "Templates"],
            ["AI", "Powered"],
            ["FREE", "PDF Export"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                minWidth: "100px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(36px,3vw,56px)",
                  color: "#f0f0f8",
                  lineHeight: 1,
                }}
              >
                {num}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#7070a0",
                  marginTop: "6px",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}