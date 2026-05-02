export default function Nav({ view, user, learningState, showView, handleLogout }) {
  return (
    <nav>
      <a className="nav-logo" onClick={() => showView('home')} style={{ cursor: 'pointer' }}>
        Learn<span>ify</span>
      </a>
      <div className="nav-links">
        <button className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => showView('home')}>Home</button>
        <button className={`nav-link ${view === 'courses' ? 'active' : ''}`} onClick={() => showView('courses')}>Courses</button>
        <button className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => showView('dashboard')}>My Learning</button>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <div className="progress-badge">
              <div className="xp-dot">⚡</div>
              <span>{learningState.xp} XP</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => showView('login')}>Log In</button>
        )}
      </div>
    </nav>
  );
}
