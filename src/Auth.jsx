import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Film } from 'lucide-react';
import { loginUser, signupUser } from './api';
import logoSrc from './assets/logo.png';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = isLogin
        ? await loginUser({ email: formData.email, password: formData.password })
        : await signupUser(formData);

      if (res.status === 'success') {
        login(res.user, res.token);
        navigate(res.user.role === 'admin' ? '/admin' : '/');
      } else {
        setError(res.message || (isLogin ? 'Invalid email or password.' : 'Signup failed. Please try again.'));
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0d0f12 0%, #1a0a0a 50%, #0d0f12 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background decorative circles */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-60px',
        width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(229,9,20,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 36, zIndex: 1 }}>
        <img src={logoSrc} alt="MovieZone" style={{ height: 52, objectFit: 'contain', marginBottom: 16 }}
          onError={e => { e.target.style.display = 'none'; }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <Film size={18} color="var(--primary-red)" />
          <span style={{ fontSize: 13, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>
            Stream · Download · Enjoy
          </span>
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 400,
        background: 'rgba(26, 28, 34, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        padding: '32px 28px',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(229,9,20,0.08)',
        zIndex: 1,
      }}>

        {/* Tab toggle */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.05)',
          borderRadius: 14, padding: 4, marginBottom: 28,
        }}>
          {['Sign In', 'Sign Up'].map((label, i) => {
            const active = (i === 0) === isLogin;
            return (
              <button key={label} onClick={() => { setIsLogin(i === 0); setError(''); setFormData({ name: '', email: '', password: '' }); }}
                style={{
                  flex: 1, padding: '10px 0', border: 'none', borderRadius: 11, cursor: 'pointer',
                  fontWeight: 700, fontSize: 14, transition: 'all 0.25s',
                  background: active ? 'var(--primary-red)' : 'transparent',
                  color: active ? '#fff' : '#888',
                  boxShadow: active ? '0 4px 16px rgba(229,9,20,0.35)' : 'none',
                }}>
                {label}
              </button>
            );
          })}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: '#fff' }}>
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>
          {isLogin ? 'Sign in to continue watching' : 'Join MovieZone for free today'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {!isLogin && (
            <InputField
              icon={<User size={16} />}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <InputField
            icon={<Mail size={16} />}
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <InputField
            icon={<Lock size={16} />}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            rightSlot={
              <button type="button" onClick={() => setShowPassword(v => !v)}
                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          {isLogin && (
            <div style={{ textAlign: 'right', marginTop: -6 }}>
              <span style={{ fontSize: 12, color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 600 }}>
                Forgot password?
              </span>
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.25)',
              borderRadius: 10, padding: '10px 14px',
              color: '#ff6b6b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span> {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{
              marginTop: 8,
              width: '100%', padding: '15px',
              borderRadius: 14, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#333' : 'linear-gradient(135deg, #e50914, #b00710)',
              color: '#fff', fontWeight: 700, fontSize: 15,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 8px 24px rgba(229,9,20,0.4)',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1,
            }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="auth-spinner" /> {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 20px' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: 12, color: '#555', fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Guest access */}
        <button onClick={() => navigate('/')}
          style={{
            width: '100%', padding: '13px',
            borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: '#aaa',
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
          Continue as Guest
        </button>
      </div>

      {/* Switch mode text */}
      <p style={{ marginTop: 20, fontSize: 14, color: '#666', zIndex: 1 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span onClick={switchMode}
          style={{ color: 'var(--primary-red)', fontWeight: 700, cursor: 'pointer' }}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </p>

      <style>{`
        .auth-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: auth-spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes auth-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function InputField({ icon, rightSlot, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: '#555', display: 'flex', alignItems: 'center', pointerEvents: 'none',
      }}>
        {icon}
      </div>
      <input {...props}
        style={{
          width: '100%',
          padding: rightSlot ? '15px 44px 15px 40px' : '15px 16px 15px 40px',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.05)',
          color: '#fff', fontSize: 15,
          outline: 'none',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onFocus={e => { e.target.style.borderColor = 'rgba(229,9,20,0.5)'; e.target.style.background = 'rgba(229,9,20,0.06)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
      />
      {rightSlot && (
        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>
          {rightSlot}
        </div>
      )}
    </div>
  );
}
