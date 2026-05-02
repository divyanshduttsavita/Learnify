import { useState } from 'react';
import { COURSES } from '../utils/constants';

function getProgress(course, progress) {
  const p = progress[course.id];
  if (!p) return 0;
  const total = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  return total ? Math.round((p.completed.length / total) * 100) : 0;
}

export default function Courses({ learningState, openCourse }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? COURSES : COURSES.filter(c => c.category === filter);

  return (
    <div className="view active" id="view-courses">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">All Courses</h2>
        </div>
        <div className="filter-bar">
          {['all', 'programming', 'design', 'data', 'business'].map(cat => (
            <button
              key={cat}
              className={`filter-chip ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All' : cat === 'data' ? 'Data & AI' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="courses-grid">
          {filtered.map(c => {
            const enrolled = learningState.enrolled.includes(c.id);
            const prog = enrolled ? getProgress(c, learningState.progress) : 0;
            return (
              <div className="course-card" key={c.id} onClick={() => openCourse(c)}>
                <div className="course-thumb" style={{ background: c.bg }}>
                  <span style={{ fontSize: '3.5rem' }}>{c.emoji}</span>
                  {c.tag && <div className="course-thumb-tag">{c.tag}</div>}
                </div>
                <div className="course-body">
                  <div className="course-meta">
                    <span className={`course-level level-${c.level}`}>{c.level}</span>
                    <span className="course-duration">⏱ {c.duration}</span>
                  </div>
                  <h3 className="course-title">{c.title}</h3>
                  <p className="course-desc">{c.desc}</p>
                  {enrolled && (
                    <div className="progress-wrap">
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${prog}%` }} />
                      </div>
                      <div className="progress-text">{prog}% complete</div>
                    </div>
                  )}
                  <div className="course-footer">
                    <div className="course-rating"><span className="stars">★★★★★</span>{c.rating} ({c.reviews})</div>
                    <button
                      className={`btn btn-sm ${enrolled ? 'btn-outline' : 'btn-primary'}`}
                      onClick={e => { e.stopPropagation(); openCourse(c); }}
                    >
                      {enrolled ? 'Continue' : 'Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
