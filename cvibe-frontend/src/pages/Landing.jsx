export default function Landing() {
  return (
    <div className="min-h-screen text-white bg-bg">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-4 border-b bg-bg/80 backdrop-blur border-surface2">
        <span className="text-2xl tracking-widest font-display">
          CV<span className="text-accent">ibe</span>
        </span>
        <div className="flex gap-4">
          <button className="px-5 py-2 text-sm border rounded-lg text-muted border-surface2 hover:border-accent">Login</button>
          <button className="px-5 py-2 text-sm rounded-lg bg-accent hover:bg-accent/80">Get Started</button>
        </div>
      </nav>

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
        <button className="px-8 py-4 text-base text-white bg-accent rounded-xl hover:bg-accent/80">
          Start Building →
        </button>
      </section>
    </div>
  );
}