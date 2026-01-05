// Simple localStorage-based storage for quiz data

const STORAGE_KEYS = {
  USER_NAME: 'quiz_user_name',
  QUIZ_PROGRESS: 'quiz_progress'
};

// User registration
export const isUserRegistered = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.USER_NAME) !== null;
};

export const registerUser = (name) => {
  if (typeof window === 'undefined') return false;
  localStorage.setItem(STORAGE_KEYS.USER_NAME, name);
  return true;
};

export const getUserName = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.USER_NAME);
};

// Quiz progress
export const getUserProgress = () => {
  if (typeof window === 'undefined') return getDefaultProgress();
  
  const stored = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
  if (!stored) {
    const defaultProgress = getDefaultProgress();
    localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(defaultProgress));
    return defaultProgress;
  }
  
  return JSON.parse(stored);
};

export const saveUserProgress = (progress) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
};

export const submitAnswer = (day, questionId, isCorrect, points, selectedIndex) => {
  const progress = getUserProgress();
  const answerKey = `day-${day}-q-${questionId}`;
  
  progress.answers[answerKey] = {
    selectedIndex,
    isCorrect,
    points: isCorrect ? points : 0
  };
  
  if (isCorrect) {
    progress.totalPoints += points;
  }
  
  saveUserProgress(progress);
  return progress;
};

export const markDayCompleted = (day) => {
  const progress = getUserProgress();
  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day);
    progress.currentStreak = calculateStreak(progress.completedDays);
  }
  saveUserProgress(progress);
  return progress;
};

export const checkDayCompletion = (day, totalQuestions) => {
  const progress = getUserProgress();
  let answeredCount = 0;
  
  for (let i = 1; i <= totalQuestions; i++) {
    const answerKey = `day-${day}-q-${i}`;
    if (progress.answers[answerKey]) {
      answeredCount++;
    }
  }
  
  return answeredCount === totalQuestions;
};

const getDefaultProgress = () => ({
  totalPoints: 0,
  currentStreak: 0,
  completedDays: [],
  answers: {},
  badges: []
});

const calculateStreak = (completedDays) => {
  if (completedDays.length === 0) return 0;
  
  const sortedDays = [...completedDays].sort((a, b) => b - a);
  let streak = 1;
  
  for (let i = 1; i < sortedDays.length; i++) {
    if (sortedDays[i-1] - sortedDays[i] === 1) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};

export const checkBadges = (progress) => {
  const newBadges = [];
  
  if (progress.totalPoints >= 10 && !progress.badges.includes('first_quiz')) {
    newBadges.push({ name: 'First Steps', icon: '🎯', description: 'Completed first quiz' });
    progress.badges.push('first_quiz');
  }
  
  if (progress.currentStreak >= 7 && !progress.badges.includes('week_warrior')) {
    newBadges.push({ name: 'Week Warrior', icon: '🔥', description: '7 day streak' });
    progress.badges.push('week_warrior');
  }
  
  if (progress.totalPoints >= 100 && !progress.badges.includes('point_master')) {
    newBadges.push({ name: 'Point Master', icon: '💎', description: '100+ points' });
    progress.badges.push('point_master');
  }
  
  if (newBadges.length > 0) {
    saveUserProgress(progress);
  }
  
  return newBadges;
};