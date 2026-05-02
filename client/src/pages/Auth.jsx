import { useState } from 'react';

export default function Auth({ handleLogin, handleSignup, showToast }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { showToast('Please enter both email and password.'); return; }
    setLoading(true);
    try { await handleLogin(email, password); }
    catch (err) { showToast(err.message); }
    finally { setLoading(false); }
  };

  const onSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) { showToast('Please fill in all fields.'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try { await handleSignup(name, email, password); }
    catch (err) { showToast(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="view active" id="view-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
            <p>{mode === 'login' ? 'Enter your details to access your account.' : 'Sign up to start learning today.'}</p>
          </div>

          {mode === 'login' ? (
            <form className="login-form" onSubmit={onLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="form-options">
                <label className="remember-me"><input type="checkbox" /> Remember me</label>
                <a href="#" className="forgot-pass" onClick={e => e.preventDefault()}>Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
                {loading ? 'Logging in…' : 'Log In'}
              </button>
              <div className="login-footer">
                Don't have an account? <a href="#" onClick={e => { e.preventDefault(); setMode('signup'); }}>Sign up</a>
              </div>
            </form>
          ) : (
            <form className="login-form" onSubmit={onSignup}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Jane Doe" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
                {loading ? 'Signing up…' : 'Sign Up'}
              </button>
              <div className="login-footer">
                Already have an account? <a href="#" onClick={e => { e.preventDefault(); setMode('login'); }}>Log in</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
