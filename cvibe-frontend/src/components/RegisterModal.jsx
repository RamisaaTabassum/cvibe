import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterModal({ onClose, onSwitch }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(name, email, password);
      onClose();
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md p-10 border bg-surface border-surface2 rounded-2xl">
        <button onClick={onClose} className="absolute top-4 right-5 text-muted hover:text-white">✕</button>
        <h2 className="mb-1 text-2xl tracking-widest font-display">CV<span className="text-accent">ibe</span></h2>
        <h3 className="mb-2 text-xl font-semibold">Create account</h3>
        <p className="mb-6 text-sm text-muted">Join CVibe and build your perfect CV</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-xs font-semibold text-muted">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Your name" required
              className="w-full px-4 py-3 text-sm border bg-surface2 border-surface2 rounded-xl" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-muted">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required
              className="w-full px-4 py-3 text-sm border bg-surface2 border-surface2 rounded-xl" />
          </div>
          <div>
            <label className="block mb-1 text-xs font-semibold text-muted">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              className="w-full px-4 py-3 text-sm border bg-surface2 border-surface2 rounded-xl" />
          </div>
          {error && <p className="text-xs text-accent2">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-3 font-medium text-white bg-accent rounded-xl hover:bg-accent/80">
            {loading ? "Creating account..." : "Register →"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-muted">
          Already have an account?{" "}
          <button onClick={onSwitch} className="text-accent hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
}