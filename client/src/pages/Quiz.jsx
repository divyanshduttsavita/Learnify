import { useState, useEffect } from 'react';

export default function Quiz({ user, learningState, setLearningState, currentCourse, showView, showToast, syncToDB }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (!currentCourse) return null;
  const c = currentCourse;
  const quiz = c.quiz;
  const q = quiz[current];
  const pct = (current / quiz.length) * 100;

  const selectOption = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === q.ans;
    setAnswers(prev => [...prev, correct]);
  };

  const nextQuestion = () => {
    if (current + 1 >= quiz.length) {
      // show results
      const correct = [...answers].filter(Boolean).length + (answers.length < quiz.length ? 0 : 0);
      setShowResult(true);
      const xpEarned = answers.filter(Boolean).length * 30 + (selected === q.ans ? 30 : 0);
      setLearningState(prev => {
        const updated = { ...prev, quizzesPassed: prev.quizzesPassed + 1, xp: prev.xp + xpEarned };
        if (user) syncToDB(user.email, updated);
        return updated;
      });
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const restart = () => {
    setCurrent(0); setAnswers([]); setSelected(null); setAnswered(false); setShowResult(false);
  };

  if (showResult) {
    const total = quiz.length;
    const correctCount = answers.filter(Boolean).length;
    const score = Math.round((correctCount / total) * 100);
    const xpEarned = correctCount * 30;
    let emoji = '😐', msg = 'Keep practicing!';
    if (score >= 80) { emoji = '🎉'; msg = "Excellent work! You've mastered this module."; }
    else if (score >= 60) { emoji = '👏'; msg = 'Good job! Review the concepts you missed.'; }

    return (
      <div className="view active">
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="quiz-progress-wrap">
              <div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: '100%' }} /></div>
              <span className="quiz-counter">{total} / {total}</span>
            </div>
          </div>
          <div className="quiz-result">
            <span className="result-emoji">{emoji}</span>
            <div className="result-score">{score}%</div>
            <p className="result-msg">{correctCount} out of {total} correct — {msg}</p>
            <div className="result-xp">⚡ +{xpEarned} XP earned</div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={restart}>Retry Quiz</button>
              <button className="btn btn-primary" onClick={() => showView('courses')}>Browse More Courses</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view active">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress-wrap">
            <div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: `${pct}%` }} /></div>
            <span className="quiz-counter">{current + 1} / {quiz.length}</span>
          </div>
        </div>

        <div className="question-card">
          <div className="question-num">Question {current + 1}</div>
          <div className="question-text">{q.q}</div>
          <div className="quiz-options">
            {q.opts.map((opt, i) => {
              let cls = '';
              if (answered) {
                if (i === q.ans) cls = 'correct';
                else if (i === selected && i !== q.ans) cls = 'wrong';
              }
              return (
                <button
                  key={i}
                  className={`quiz-option ${cls}`}
                  onClick={() => selectOption(i)}
                  disabled={answered}
                >
                  <div className="option-letter">{['A', 'B', 'C', 'D'][i]}</div>
                  {opt}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className={`quiz-feedback show ${selected === q.ans ? 'correct' : 'wrong'}`}>
              {selected === q.ans ? '✓ Correct! ' : '✗ Not quite. '}{q.expl}
            </div>
          )}
        </div>

        {answered && (
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextQuestion}>
            {current === quiz.length - 1 ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
