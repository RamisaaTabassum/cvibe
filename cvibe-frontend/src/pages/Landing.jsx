import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight:'100vh',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      textAlign:'center',
      padding:'95px 48px 80px', // Badge-এর উপরের গ্যাপ কমাতে 120px থেকে 95px করা হয়েছে
      position:'relative',
      overflow:'hidden',
      background:'#0a0a0f'
    }}>
      {/* Glow */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 40%,rgba(124,92,252,0.12) 0%,transparent 70%)',pointerEvents:'none'}} />
      {/* Grid */}
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(#2a2a38 1px,transparent 1px),linear-gradient(90deg,#2a2a38 1px,transparent 1px)',backgroundSize:'60px 60px',opacity:0.3,pointerEvents:'none'}} />

      <div style={{position:'relative',zIndex:1,display:'flex',flexDirection:'column',alignItems:'center', width: '100%', maxWidth: '1200px'}}>

        {/* Badge — স্লাইটলি বড় করা হয়েছে */}
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(124,92,252,0.1)',border:'1px solid rgba(124,92,252,0.3)',color:'#7c5cfc',fontSize:'13px',fontWeight:500,padding:'7px 18px',borderRadius:'20px',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'28px'}}>
          ✦ AI-Powered CV Builder
        </div>

        {/* Title — clamp ভ্যালু বাড়িয়ে সাইজ আরও দানবীয় ও চওড়া করা হয়েছে */}
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(82px,13vw,155px)',lineHeight:.92,letterSpacing:'3px',marginBottom:'28px',color:'#f0f0f8', textTransform: 'uppercase'}}>
          LEVEL UP<br />
          <span style={{color:'transparent',WebkitTextStroke:'2px rgba(255,255,255,0.35)'}}>YOUR </span>
          <span style={{color:'#7c5cfc'}}>CAREER</span>
        </h1>

        {/* Description — ১৮পিক্সেল থেকে বাড়িয়ে ২০পিক্সেল করা হয়েছে */}
        <p style={{fontSize:'20px',color:'#7070a0',maxWidth:'560px',lineHeight:1.7,marginBottom:'48px'}}>
          AI-driven precision, smart keyword suggestions, live preview, and beautiful templates. Your dream job starts here.
        </p>

        {/* Buttons — লেখার সাইজ ও প্যাডিং বাড়ানো হয়েছে */}
        <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={() => navigate("/register")}
            style={{padding:'15px 36px',fontSize:'16px',borderRadius:'10px',border:'none',background:'#7c5cfc',color:'white',fontWeight:600,cursor:'pointer',transition:'all .2s'}}>
            Build My CV Free ↗
          </button>
          <button onClick={() => document.getElementById("templates-section")?.scrollIntoView({behavior:"smooth"})}
            style={{padding:'15px 36px',fontSize:'16px',borderRadius:'10px',border:'1.5px solid #2a2a38',background:'transparent',color:'#f0f0f8',fontWeight:500,cursor:'pointer',transition:'all .2s'}}>
            View Templates
          </button>
        </div>

        {/* Stats — সংখ্যা ৪২ থেকে ৪৮ এবং লেবেল ১২ থেকে ১৩ পিক্সেল করা হয়েছে */}
        <div style={{display:'flex',gap:'56px',marginTop:'80px',justifyContent:'center',flexWrap:'wrap',borderTop:'1px solid rgba(42,42,56,0.4)',paddingTop:'32px',width:'100%',maxWidth:'750px'}}>
          {[["3","User Types"],["12+","Templates"],["AI","Powered"],["FREE","PDF Export"]].map(([num,label]) => (
            <div key={label} style={{textAlign:'center', minWidth:'110px'}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'48px',letterSpacing:'1px',color:'#f0f0f8',lineHeight:'1.1'}}>{num}</div>
              <div style={{fontSize:'13px',color:'#7070a0',marginTop:'4px',letterSpacing:'.06em',textTransform:'uppercase'}}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}