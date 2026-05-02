import { useState, useRef, useEffect } from 'react';

function getAllLessons(course) {
  return course.modules.flatMap(m => m.lessons);
}

function getCurrentGlobalIdx(course, moduleIdx, lessonIdx) {
  let idx = 0;
  for (let mi = 0; mi < moduleIdx; mi++) idx += course.modules[mi].lessons.length;
  return idx + lessonIdx;
}

function AIPanel({ course, moduleIdx, lessonIdx, showToast }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your AI tutor for this course. Ask me anything about the lesson — I'll explain concepts, answer questions, or give examples. 🎓" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: 'bot', text: "I'm ready to help with this lesson. Ask me anything! 🎓" }]);
  }, [moduleIdx, lessonIdx]);

  const askAI = async (msg) => {
    if (!msg.trim() || loading) return;
    const lesson = course?.modules[moduleIdx]?.lessons[lessonIdx];
    const lessonCtx = lesson ? `The student is studying: "${lesson.title}" in the course "${course?.title}".` : '';

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Learnify AI, a warm, encouraging, and knowledgeable online education tutor. ${lessonCtx} Answer questions clearly and concisely in 2-4 sentences. Use simple language. If showing code, keep it brief. Be encouraging and supportive. Do not use markdown headers — use plain text. If the student asks something unrelated to learning, gently redirect.`,
          messages: [{ role: 'user', content: msg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that. Try rephrasing!";
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting right now. Please try again in a moment! 🔄" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <div className="ai-avatar">✦</div>
        <div>
          <div className="ai-panel-title">Learnify AI</div>
          <div className="ai-panel-sub">Your personal tutor</div>
        </div>
      </div>
      <div className="ai-messages">
        {messages.map((m, i) => (
          <div key={i} className={`ai-msg ${m.role === 'user' ? 'user' : ''}`}>
            <div className={`ai-msg-avatar ${m.role === 'bot' ? 'bot' : 'user'}`}>{m.role === 'bot' ? '✦' : 'U'}</div>
            <div className={`ai-bubble ${m.role === 'user' ? 'user' : ''}`}
              dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br>') }} />
          </div>
        ))}
        {loading && (
          <div className="ai-msg">
            <div className="ai-msg-avatar bot">✦</div>
            <div className="ai-bubble">
              <div className="typing-indicator">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="ai-suggestions">
        {["Can you simplify this concept?", "Give me a real-world example", "What should I learn next?"].map((s, i) => (
          <button key={i} className="suggestion-chip" onClick={() => askAI(s)}>{s}</button>
        ))}
      </div>
      <div className="ai-input-wrap">
        <textarea
          className="ai-input"
          placeholder="Ask anything…"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); askAI(input); } }}
          disabled={loading}
        />
        <button className="ai-send-btn" onClick={() => askAI(input)} disabled={loading}>→</button>
      </div>
    </div>
  );
}

export default function Lesson({
  user, learningState, setLearningState,
  currentCourse, currentModuleIdx, setCurrentModuleIdx,
  currentLessonIdx, setCurrentLessonIdx,
  showView, showToast, addXP, syncToDB
}) {
  const [playing, setPlaying] = useState(false);

  if (!currentCourse) return null;

  const c = currentCourse;
  const mod = c.modules[currentModuleIdx];
  const lesson = mod.lessons[currentLessonIdx];
  const allLessons = getAllLessons(c);
  const prog = learningState.progress[c.id] || { completed: [] };
  const pct = allLessons.length ? Math.round((prog.completed.length / allLessons.length) * 100) : 0;
  const curIdx = getCurrentGlobalIdx(c, currentModuleIdx, currentLessonIdx);
  const isLastLesson = currentModuleIdx === c.modules.length - 1 && currentLessonIdx === mod.lessons.length - 1;

  // Mark lesson completed on mount
  useEffect(() => {
    setLearningState(prev => {
      const p = prev.progress[c.id] || { completed: [] };
      if (!p.completed.includes(curIdx)) {
        const updated = {
          ...prev,
          lessonsCompleted: prev.lessonsCompleted + 1,
          xp: prev.xp + 20,
          progress: { ...prev.progress, [c.id]: { ...p, completed: [...p.completed, curIdx] } }
        };
        showToast('🎉 Lesson complete! +20 XP');
        if (user) syncToDB(user.email, updated);
        return updated;
      }
      return prev;
    });
  }, [c.id, curIdx]);

  const gotoLesson = (mi, li) => { setCurrentModuleIdx(mi); setCurrentLessonIdx(li); setPlaying(false); };

  const nextLesson = () => {
    if (currentLessonIdx < mod.lessons.length - 1) { gotoLesson(currentModuleIdx, currentLessonIdx + 1); }
    else if (currentModuleIdx < c.modules.length - 1) { gotoLesson(currentModuleIdx + 1, 0); }
  };
  const prevLesson = () => {
    if (currentLessonIdx > 0) { gotoLesson(currentModuleIdx, currentLessonIdx - 1); }
    else if (currentModuleIdx > 0) {
      const prevMod = c.modules[currentModuleIdx - 1];
      gotoLesson(currentModuleIdx - 1, prevMod.lessons.length - 1);
    }
  };

  let globalIdx = 0;

  return (
    <div className="view active">
      <div className="lesson-layout">
        {/* Sidebar */}
        <div className="lesson-sidebar">
          <div className="sidebar-course-title">{c.title}</div>
          <div className="sidebar-progress-text">{prog.completed.length} of {allLessons.length} lessons</div>
          <div className="sidebar-progress-bar"><div className="sidebar-progress-fill" style={{ width: `${pct}%` }} /></div>
          {c.modules.map((m, mi) => {
            const section = (
              <div className="sidebar-section" key={mi}>
                <div className="sidebar-section-title">{m.title}</div>
                {m.lessons.map((l, li) => {
                  const gIdx = globalIdx++;
                  const isActive = mi === currentModuleIdx && li === currentLessonIdx;
                  const isDone = prog.completed.includes(gIdx);
                  return (
                    <div key={li} className={`lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`} onClick={() => gotoLesson(mi, li)}>
                      <div className="lesson-check">{isDone ? '✓' : ''}</div>
                      <div className="lesson-item-title">{l.title}</div>
                      <div className="lesson-item-dur">{l.dur}</div>
                    </div>
                  );
                })}
              </div>
            );
            return section;
          })}
        </div>

        {/* Main */}
        <div className="lesson-main">
          <div className="lesson-video-area">
            <div className="video-placeholder">
              <div className="play-btn-big" onClick={() => { setPlaying(p => !p); showToast('▶ Playing lesson video...'); }}>
                {playing ? '⏸' : '▶'}
              </div>
              <div style={{ fontSize: '0.85rem' }}>{lesson.title}</div>
            </div>
          </div>
          <div className="lesson-content-area">
            <div className="lesson-breadcrumb">{c.title} › {mod.title}</div>
            <h1 className="lesson-title">{lesson.title}</h1>
            <div className="lesson-body" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <div className="lesson-nav-btns">
              <button className="btn btn-outline" onClick={prevLesson}>← Previous</button>
              {!isLastLesson && <button className="btn btn-primary" onClick={nextLesson}>Next Lesson →</button>}
              {isLastLesson && (
                <button className="btn btn-amber" onClick={() => showView('quiz')}>Take Quiz 🎯</button>
              )}
            </div>
          </div>
        </div>

        {/* AI Panel */}
        <AIPanel course={c} moduleIdx={currentModuleIdx} lessonIdx={currentLessonIdx} showToast={showToast} />
      </div>
    </div>
  );
}
