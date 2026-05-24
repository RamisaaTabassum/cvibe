import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [modal, setModal] = useState(null);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 border-b bg-bg/80 backdrop-blur border-surface2">
        <span className="text-2xl tracking-widest font-display">
          CV<span className="text-accent">ibe</span>
        </span>

        {/* Navigation Links */}
        <div className="flex gap-12 text-sm text-muted">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#templates" className="hover:text-white">Templates</a>
          <a href="#builder" className="hover:text-white">Builder</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
        </div>

        <div className="flex gap-4">
          {user ? (
            <button onClick={logout}
              className="px-5 py-2 text-sm border rounded-lg text-muted border-surface2 hover:border-accent">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => setModal("login")}
                className="px-5 py-2 text-sm border rounded-lg text-muted border-surface2 hover:border-accent">
                Login
              </button>
              <button onClick={() => setModal("register")}
                className="px-5 py-2 text-sm rounded-lg bg-accent hover:bg-accent/80">
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {modal === "login" && (
        <LoginModal onClose={() => setModal(null)} onSwitch={() => setModal("register")} />
      )}
      {modal === "register" && (
        <RegisterModal onClose={() => setModal(null)} onSwitch={() => setModal("login")} />
      )}
    </>
  );
}