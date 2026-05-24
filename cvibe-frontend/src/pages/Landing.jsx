import { useState } from "react";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

export default function Landing() {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen text-white bg-bg">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-8 pt-20 text-center">
        <span className="px-4 py-1 mb-8 text-xs tracking-widest uppercase border rounded-full text-accent border-accent/30 bg-accent/10">
          AI-Powered CV Builder
        </span>
        <h1 className="mb-6 leading-none tracking-widest font-display text-8xl">
          BUILD YOUR<br />
          <span className="text-accent">CAREER</span>
        </h1>
        <p className="max-w-md mb-10 text-lg text-muted">
          Create professional CVs with AI assistance. Stand out from the crowd.
        </p>
        <button onClick={() => setModal("register")}
          className="px-8 py-4 text-base text-white bg-accent rounded-xl hover:bg-accent/80">
          Start Building →
        </button>
      </section>

      {/* Modals */}
      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("register")}
        />
      )}
      {modal === "register" && (
        <RegisterModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("login")}
        />
      )}
    </div>
  );
}