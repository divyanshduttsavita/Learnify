export default function Home({ showView }) {
  return (
    <div className="view active" id="view-home">
      <div className="hero">
        <div>
          <div className="hero-tag">✦ AI-Powered Learning</div>
          <h1>Master any skill with <em>guided</em> intelligence</h1>
          <p className="hero-desc">
            Learnify combines expert-crafted courses with an AI tutor that answers questions,
            explains concepts, and adapts to your pace — in real time.
          </p>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => showView('courses')}>Browse Courses →</button>
            <button className="btn btn-outline" onClick={() => showView('dashboard')}>My Dashboard</button>
          </div>
          <div className="hero-stats">
            <div><span className="stat-num">48</span><span className="stat-lbl">Expert Courses</span></div>
            <div><span className="stat-num">12k+</span><span className="stat-lbl">Learners</span></div>
            <div><span className="stat-num">4.9★</span><span className="stat-lbl">Avg Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          {[
            { bg: '#d4ede9', icon: '🐍', title: 'Python for Data Science', sub: 'Variables, loops, Pandas basics', pct: 65 },
            { bg: '#f5e4c0', icon: '🎨', title: 'UI/UX Fundamentals', sub: 'Color theory & typography', pct: 30 },
            { bg: '#f5e0e0', icon: '📈', title: 'Financial Modeling', sub: 'DCF, LBO, Valuation methods', pct: 10 },
          ].map((c, i) => (
            <div className="mini-course-card" key={i}>
              <div className="mini-icon" style={{ background: c.bg }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <h4>{c.title}</h4>
                <p>{c.sub}</p>
                <div className="mini-progress">
                  <div className="mini-progress-bar" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>Your AI tutor is ready</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid var(--border)', borderRadius: '999px', padding: '8px 16px', fontSize: '0.85rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              Ask me anything about your course...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
