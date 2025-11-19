/**
 * Admin Utilities for Quiz
 * Functions to view all participants and statistics
 * Uses Firebase with localStorage fallback
 */

import { getAllUsersProgress, getAllRegistrations as getAllRegFromFirebase } from './firebaseStorage';

export const getAllUsers = async () => {
  // Try Firebase first
  let users = await getAllUsersProgress();
  
  // If Firebase returns empty, check localStorage
  if (users.length === 0 && typeof window !== 'undefined') {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('quiz_progress_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.userId) {
            users.push(userData);
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
  }
  
  return users;
};

export const getQuizStatistics = async () => {
  const users = await getAllUsers();
  
  if (users.length === 0) {
    return {
      totalParticipants: 0,
      totalPoints: 0,
      averagePoints: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      averageAccuracy: 0,
      totalStreak: 0,
      averageStreak: 0,
      longestStreak: 0,
      totalBadges: 0,
      usersByDay: {},
      topUsers: []
    };
  }
  
  let totalPoints = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrectAnswers = 0;
  let totalStreak = 0;
  let longestStreak = 0;
  let totalBadges = 0;
  const usersByDay = {};
  
  users.forEach(user => {
    totalPoints += user.totalPoints || 0;
    totalStreak += user.currentStreak || 0;
    
    if ((user.longestStreak || 0) > longestStreak) {
      longestStreak = user.longestStreak || 0;
    }
    
    totalBadges += (user.badges || []).length;
    
    // Count questions answered
    const answers = user.answers || {};
    const userQuestionsAnswered = Object.keys(answers).length;
    totalQuestionsAnswered += userQuestionsAnswered;
    
    // Count correct answers
    const userCorrectAnswers = Object.values(answers).filter(a => a.correct).length;
    totalCorrectAnswers += userCorrectAnswers;
    
    // Track users by completed days
    (user.completedDays || []).forEach(day => {
      if (!usersByDay[day]) {
        usersByDay[day] = 0;
      }
      usersByDay[day]++;
    });
  });
  
  // Calculate top users by points
  const topUsers = [...users]
    .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
    .slice(0, 10)
    .map(user => ({
      userId: user.userId,
      displayName: user.displayName || 'Anonymous',
      totalPoints: user.totalPoints || 0,
      currentStreak: user.currentStreak || 0,
      completedDays: (user.completedDays || []).length,
      badges: (user.badges || []).length,
      accuracy: calculateUserAccuracy(user),
      lastActive: user.lastActive,
      createdAt: user.createdAt
    }));
  
  return {
    totalParticipants: users.length,
    totalPoints,
    averagePoints: totalPoints / users.length,
    totalQuestionsAnswered,
    totalCorrectAnswers,
    averageAccuracy: totalQuestionsAnswered > 0 
      ? (totalCorrectAnswers / totalQuestionsAnswered) * 100 
      : 0,
    totalStreak,
    averageStreak: totalStreak / users.length,
    longestStreak,
    totalBadges,
    usersByDay,
    topUsers
  };
};

const calculateUserAccuracy = (user) => {
  const answers = user.answers || {};
  const total = Object.keys(answers).length;
  if (total === 0) return 0;
  
  const correct = Object.values(answers).filter(a => a.correct).length;
  return (correct / total) * 100;
};

export const exportUserData = async () => {
  const users = await getAllUsers();
  const stats = await getQuizStatistics();
  
  const data = {
    exportDate: new Date().toISOString(),
    statistics: stats,
    users: users.map(user => ({
      userId: user.userId,
      displayName: user.displayName || 'Anonymous',
      totalPoints: user.totalPoints || 0,
      currentStreak: user.currentStreak || 0,
      longestStreak: user.longestStreak || 0,
      completedDays: user.completedDays || [],
      badges: user.badges || [],
      totalQuestionsAnswered: Object.keys(user.answers || {}).length,
      totalCorrectAnswers: Object.values(user.answers || {}).filter(a => a.correct).length,
      accuracy: calculateUserAccuracy(user),
      createdAt: user.createdAt,
      lastActive: user.lastActive
    }))
  };
  
  return JSON.stringify(data, null, 2);
};

export const downloadStatistics = async () => {
  const data = await exportUserData();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-statistics-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

