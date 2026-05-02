import { COURSES, BADGES } from '../utils/constants';

function getProgress(course, progress) {
  const p = progress[course.id];
  if (!p) return 0;
  const total = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  return total ? Math.round((p.completed.length / total) * 100) : 0;
}

export default function Dashboard({ user, learningState, openCourse, showView }) {
  const { xp, streak, lessonsCompleted, quizzesPassed, enrolled, progress } = learningState;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="view active" id="view-dashboard">
      <div className="dashboard">
        <div className="dashboard-main">
          <h1 className="dashboard-title">Welcome back{user?.name ? `, ${user.name}` : ''}! 👋</h1>
          <p className="dashboard-sub">You're on a roll. Keep it up!</p>
          <div className="stats-row">
            <div className="stat-card"><div className="stat-card-num">{lessonsCompleted}</div><div className="stat-card-lbl">Lessons Completed</div></div>
            <div className="stat-card"><div className="stat-card-num">{quizzesPassed}</div><div className="stat-card-lbl">Quizzes Passed</div></div>
            <div className="stat-card"><div className="stat-card-num">{xp}</div><div className="stat-card-lbl">XP Earned</div></div>
          </div>
          <div className="my-courses-section">
            <h3>My Enrolled Courses</h3>
            {enrolled.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>No courses enrolled yet.</p>
            ) : (
              enrolled.map(id => {
                const c = COURSES.find(x => x.id === id);
                if (!c) return null;
                const prog = getProgress(c, progress);
                return (
                  <div className="enrolled-card" key={id} onClick={() => openCourse(c)}>
                    <div className="enrolled-icon" style={{ background: c.bg }}>{c.emoji}</div>
                    <div className="enrolled-info">
                      <div className="enrolled-title">{c.title}</div>
                      <div className="enrolled-prog-text">{prog}% complete</div>
                      <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${prog}%` }} /></div>
                    </div>
                    <button className="btn btn-sm btn-outline">Continue</button>
                  </div>
                );
              })
            )}
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }} onClick={() => showView('courses')}>
              + Browse More Courses
            </button>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="streak-card">
            <span className="streak-num">{streak}</span>
            <div className="streak-lbl">🔥 Day Streak</div>
            <div className="streak-dots">
              {days.map((d, i) => {
                const cls = i < 5 ? 'done' : i === 5 ? 'today' : 'todo';
                return <div key={i} className={`streak-dot ${cls}`}>{d}</div>;
              })}
            </div>
          </div>
          <div className="achievement-section">
            <h3>Achievements</h3>
            <div className="badges-grid">
              {BADGES.map((b, i) => (
                <div key={i} className="badge-item">
                  <span className="badge-icon">{b.icon}</span>
                  <div className="badge-name">{b.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
