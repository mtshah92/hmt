/**
 * Quiz Storage Utilities
 * Manages user progress, points, streaks, and badges using localStorage
 */

export const getOrCreateUserId = () => {
  if (typeof window === 'undefined') return null;
  
  let userId = localStorage.getItem('quiz_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem('quiz_user_id', userId);
  }
  return userId;
};

export const getDefaultProgress = (userId) => {
  return {
    userId: userId,
    displayName: null,
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedDays: [],
    answers: {}, // Format: { "day-1-q-1": { correct: true, points: 10, timestamp: "..." } }
    badges: [],
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString()
  };
};

export const getUserProgress = () => {
  if (typeof window === 'undefined') return null;
  
  const userId = getOrCreateUserId();
  if (!userId) return null;
  
  const key = `quiz_progress_${userId}`;
  const stored = localStorage.getItem(key);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultProgress = getDefaultProgress(userId);
  saveUserProgress(defaultProgress);
  return defaultProgress;
};

export const saveUserProgress = (progress) => {
  if (typeof window === 'undefined' || !progress) return;
  
  progress.lastActive = new Date().toISOString();
  const key = `quiz_progress_${progress.userId}`;
  localStorage.setItem(key, JSON.stringify(progress));
};

export const updateUserDisplayName = (displayName) => {
  const progress = getUserProgress();
  if (progress) {
    progress.displayName = displayName;
    saveUserProgress(progress);
  }
};

export const submitAnswer = (day, questionId, isCorrect, points, selectedIndex = null) => {
  const progress = getUserProgress();
  if (!progress) return null;
  
  const answerKey = `day-${day}-q-${questionId}`;
  
  // Don't allow re-answering the same question
  if (progress.answers[answerKey]) {
    return progress;
  }
  
  // Save answer with selected index
  progress.answers[answerKey] = {
    correct: isCorrect,
    points: isCorrect ? points : 0,
    selectedIndex: selectedIndex, // Store which option was selected
    timestamp: new Date().toISOString()
  };
  
  // Update points
  if (isCorrect) {
    progress.totalPoints += points;
  }
  
  saveUserProgress(progress);
  return progress;
};

export const checkDayCompletion = (day, totalQuestions) => {
  const progress = getUserProgress();
  if (!progress) return false;
  
  // Check if all questions for this day are answered
  const dayAnswers = [];
  for (let i = 1; i <= totalQuestions; i++) {
    const answerKey = `day-${day}-q-${i}`;
    if (progress.answers[answerKey]) {
      dayAnswers.push(progress.answers[answerKey]);
    }
  }
  
  return dayAnswers.length === totalQuestions;
};

export const markDayCompleted = (day) => {
  const progress = getUserProgress();
  if (!progress) return;
  
  if (!progress.completedDays.includes(day)) {
    progress.completedDays.push(day);
    updateStreak(progress);
    checkBadges(progress);
    saveUserProgress(progress);
  }
};

export const updateStreak = (progress) => {
  if (!progress) return;
  
  // Get sorted completed days (highest first - most recent days first)
  // Day numbers decrease as we approach the event, so higher number = more recent
  const sortedDays = [...progress.completedDays].sort((a, b) => b - a);
  
  if (sortedDays.length === 0) {
    progress.currentStreak = 0;
  } else if (sortedDays.length === 1) {
    progress.currentStreak = 1;
  } else {
    // Check if days are consecutive
    // Since day numbers decrease (100, 99, 98...), consecutive days mean
    // the difference between consecutive sorted days is 1
    let consecutiveCount = 1;
    for (let i = 0; i < sortedDays.length - 1; i++) {
      if (sortedDays[i] - sortedDays[i + 1] === 1) {
        consecutiveCount++;
      } else {
        // Streak broken, stop counting
        break;
      }
    }
    progress.currentStreak = consecutiveCount;
  }
  
  // Update longest streak
  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }
};

export const checkBadges = (progress) => {
  if (!progress) return [];
  
  const newBadges = [];
  const totalDays = progress.completedDays.length;
  const streak = progress.currentStreak;
  const totalPoints = progress.totalPoints;
  
  // First Quiz
  if (totalDays >= 1 && !progress.badges.includes('first_quiz')) {
    newBadges.push({
      id: 'first_quiz',
      name: 'First Steps',
      description: 'Completed your first quiz!',
      icon: '🎯'
    });
  }
  
  // Week Warrior
  if (streak >= 7 && !progress.badges.includes('week_warrior')) {
    newBadges.push({
      id: 'week_warrior',
      name: 'Week Warrior',
      description: '7 day streak!',
      icon: '🔥'
    });
  }
  
  // Month Master
  if (streak >= 30 && !progress.badges.includes('month_master')) {
    newBadges.push({
      id: 'month_master',
      name: 'Month Master',
      description: '30 day streak!',
      icon: '👑'
    });
  }
  
  // Knowledge Seeker
  if (totalDays >= 10 && !progress.badges.includes('knowledge_seeker')) {
    newBadges.push({
      id: 'knowledge_seeker',
      name: 'Knowledge Seeker',
      description: 'Completed 10 quizzes!',
      icon: '📚'
    });
  }
  
  // Perfect Week (all correct for 7 days)
  if (totalDays >= 7 && !progress.badges.includes('perfect_week')) {
    // Check if last 7 days were all correct
    const sortedDays = [...progress.completedDays].sort((a, b) => b - a); // Highest first
    const recentDays = sortedDays.slice(0, 7); // Get most recent 7 days
    const allCorrect = recentDays.every(completedDay => {
      // Check all answers for this day
      const dayAnswers = Object.keys(progress.answers)
        .filter(key => key.startsWith(`day-${completedDay}-q-`))
        .map(key => progress.answers[key]);
      return dayAnswers.length > 0 && dayAnswers.every(ans => ans.correct);
    });
    
    if (allCorrect) {
      newBadges.push({
        id: 'perfect_week',
        name: 'Perfect Week',
        description: '100% accuracy for 7 days!',
        icon: '⭐'
      });
    }
  }
  
  // Point Master
  if (totalPoints >= 100 && !progress.badges.includes('point_master')) {
    newBadges.push({
      id: 'point_master',
      name: 'Point Master',
      description: 'Earned 100 points!',
      icon: '💎'
    });
  }
  
  // Add new badges to progress
  newBadges.forEach(badge => {
    if (!progress.badges.includes(badge.id)) {
      progress.badges.push(badge.id);
    }
  });
  
  return newBadges;
};

export const getDayAccuracy = (day) => {
  const progress = getUserProgress();
  if (!progress) return 0;
  
  const dayAnswers = Object.keys(progress.answers)
    .filter(key => key.startsWith(`day-${day}-q-`))
    .map(key => progress.answers[key]);
  
  if (dayAnswers.length === 0) return 0;
  
  const correctAnswers = dayAnswers.filter(ans => ans.correct).length;
  return Math.round((correctAnswers / dayAnswers.length) * 100);
};

