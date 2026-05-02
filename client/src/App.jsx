import { useState, useCallback } from 'react';
import Nav from './components/Nav';
import Toast from './components/Toast';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Courses from './pages/Courses';
import Lesson from './pages/Lesson';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import './App.css';

const API = '/api';

const defaultState = {
  xp: 0, streak: 0, lessonsCompleted: 0, quizzesPassed: 0,
  enrolled: [], progress: {},
};

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [learningState, setLearningState] = useState(defaultState);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const showView = useCallback((id) => {
    if (['dashboard', 'lesson', 'quiz'].includes(id) && !user) {
      showToast('Please log in to access this feature.');
      setView('login');
      return;
    }
    setView(id);
    window.scrollTo(0, 0);
  }, [user, showToast]);

  const addXP = useCallback((amount) => {
    setLearningState(prev => {
      const updated = { ...prev, xp: prev.xp + amount };
      if (user) syncToDB(user.email, updated);
      return updated;
    });
  }, [user]);

  const syncToDB = async (email, state) => {
    try {
      await fetch(`${API}/auth/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...state }),
      });
    } catch (e) { console.error('Sync error:', e); }
  };

  const applyUserData = (userData) => {
    setUser(userData);
    setLearningState({
      xp: userData.xp || 0,
      streak: userData.streak || 0,
      lessonsCompleted: userData.lessonsCompleted || 0,
      quizzesPassed: userData.quizzesPassed || 0,
      enrolled: userData.enrolled || [],
      progress: userData.progress || {},
    });
  };

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid credentials');
    applyUserData(data.user);
    showToast('Logged in successfully!');
    showView('dashboard');
  };

  const handleSignup = async (name, email, password) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error signing up');
    applyUserData(data.user);
    showToast('Account created successfully!');
    showView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setLearningState(defaultState);
    showToast('Logged out successfully!');
    setView('home');
  };

  const openCourse = useCallback((course) => {
    if (!user) {
      showToast('Please log in to enroll or view courses.');
      setView('login');
      return;
    }
    setLearningState(prev => {
      let updated = { ...prev };
      if (!prev.enrolled.includes(course.id)) {
        updated.enrolled = [...prev.enrolled, course.id];
        updated.progress = { ...prev.progress, [course.id]: { completed: [] } };
        showToast(`✅ Enrolled in ${course.title}!`);
        updated.xp = prev.xp + 50;
        if (user) syncToDB(user.email, updated);
      }
      return updated;
    });
    setCurrentCourse(course);
    setCurrentModuleIdx(0);
    setCurrentLessonIdx(0);
    setView('lesson');
  }, [user, showToast]);

  const sharedProps = {
    user, learningState, setLearningState,
    currentCourse, setCurrentCourse,
    currentModuleIdx, setCurrentModuleIdx,
    currentLessonIdx, setCurrentLessonIdx,
    showView, showToast, openCourse, addXP,
    syncToDB, API,
  };

  return (
    <>
      <Nav view={view} user={user} learningState={learningState} showView={showView} handleLogout={handleLogout} />
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} msg={t.msg} />)}
      </div>
      {view === 'home' && <Home showView={showView} />}
      {view === 'login' && <Auth handleLogin={handleLogin} handleSignup={handleSignup} showToast={showToast} />}
      {view === 'courses' && <Courses {...sharedProps} />}
      {view === 'lesson' && <Lesson {...sharedProps} />}
      {view === 'quiz' && <Quiz {...sharedProps} />}
      {view === 'dashboard' && <Dashboard {...sharedProps} />}
    </>
  );
}
