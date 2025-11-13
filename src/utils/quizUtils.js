/**
 * Quiz Utility Functions
 * Helper functions for quiz operations
 */

import { calculateDaysLeft } from './dateUtils';

/**
 * Calculate the current day number based on countdown
 * Day 1 is the furthest day from the event
 */
export const getCurrentDayNumber = (targetDate) => {
  const daysLeft = calculateDaysLeft(targetDate);
  // If event has passed, return day 1
  if (daysLeft <= 0) {
    return 1;
  }
  // Return the number of days left (this becomes the day number)
  // Day 1 is the furthest day from the event
  return Math.max(1, daysLeft);
};

/**
 * Get today's date string in YYYY-MM-DD format
 */
export const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Check if a day's quiz has been completed
 */
export const isDayCompleted = (day, progress) => {
  if (!progress) return false;
  return progress.completedDays.includes(day);
};

/**
 * Check if a specific question has been answered
 */
export const isQuestionAnswered = (day, questionId, progress) => {
  if (!progress) return false;
  const answerKey = `day-${day}-q-${questionId}`;
  return !!progress.answers[answerKey];
};

/**
 * Get user's answer for a specific question
 */
export const getUserAnswer = (day, questionId, progress) => {
  if (!progress) return null;
  const answerKey = `day-${day}-q-${questionId}`;
  return progress.answers[answerKey] || null;
};

/**
 * Calculate total questions answered
 */
export const getTotalQuestionsAnswered = (progress) => {
  if (!progress) return 0;
  return Object.keys(progress.answers).length;
};

/**
 * Calculate total correct answers
 */
export const getTotalCorrectAnswers = (progress) => {
  if (!progress) return 0;
  return Object.values(progress.answers).filter(ans => ans.correct).length;
};

/**
 * Calculate overall accuracy percentage
 */
export const getOverallAccuracy = (progress) => {
  if (!progress) return 0;
  const total = getTotalQuestionsAnswered(progress);
  if (total === 0) return 0;
  const correct = getTotalCorrectAnswers(progress);
  return Math.round((correct / total) * 100);
};

/**
 * Get streak multiplier for bonus points
 */
export const getStreakMultiplier = (streak) => {
  if (streak >= 30) return 1.5; // 50% bonus
  if (streak >= 14) return 1.3; // 30% bonus
  if (streak >= 7) return 1.2; // 20% bonus
  return 1.0; // No bonus
};

/**
 * Calculate points with streak bonus
 */
export const calculatePointsWithBonus = (basePoints, streak) => {
  const multiplier = getStreakMultiplier(streak);
  return Math.round(basePoints * multiplier);
};

