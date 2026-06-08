import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0f'}}>
      <div style={{position:'relative',width:'100%',maxWidth:'440px',background:'#111118',border:'1px solid #2a2a38',borderRadius:'20px',padding:'40px'}}>
        
        <div style={{fontFamily:'Bebas Neue',fontSize:'24px',letterSpacing:'2px',marginBottom:'4px',color:'#f0f0f8'}}>
          CV<span style={{color:'#7c5cfc'}}>ibe</span>
        </div>
        <div style={{fontSize:'22px',fontWeight:600,marginBottom:'8px',color:'#f0f0f8'}}>Welcome back</div>
        <div style={{fontSize:'14px',color:'#7070a0',marginBottom:'28px',lineHeight:1.6}}>Login to your account to access your CVs and dashboard.</div>

        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div>
            <label htmlFor="email" style={{display:'block',fontSize:'12px',fontWeight:600,color:'#7070a0',marginBottom:'6px',letterSpacing:'.03em'}}>Email</label>
            <input id="email" name="email" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" required
              style={{width:'100%',padding:'11px 14px',border:'1.5px solid #2a2a38',borderRadius:'10px',fontSize:'14px',color:'#f0f0f8',background:'#1a1a24',outline:'none',boxSizing:'border-box'}}
            />
          </div>
          <div>
            <label htmlFor="password" style={{display:'block',fontSize:'12px',fontWeight:600,color:'#7070a0',marginBottom:'6px',letterSpacing:'.03em'}}>Password</label>
            <input id="password" name="password" type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{width:'100%',padding:'11px 14px',border:'1.5px solid #2a2a38',borderRadius:'10px',fontSize:'14px',color:'#f0f0f8',background:'#1a1a24',outline:'none',boxSizing:'border-box'}}
            />
          </div>
          {error && <p style={{fontSize:'12px',color:'#fc5c7d',margin:0}}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{width:'100%',padding:'13px',fontSize:'15px',borderRadius:'10px',border:'none',background:'#7c5cfc',color:'white',fontWeight:500,cursor:loading?'not-allowed':'pointer',opacity:loading?0.6:1,marginTop:'8px'}}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p style={{fontSize:'13px',color:'#7070a0',textAlign:'center',marginTop:'20px'}}>
          Don't have an account?{' '}
          <Link to="/register" style={{color:'#7c5cfc',textDecoration:'none'}}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;