"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/Header';
import { getQuizStatistics, getAllUsers, downloadStatistics } from '../../../utils/quizAdmin';
import { getAllRegistrations } from '../../../utils/quizRegistration';

export default function QuizAdminPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Simple password protection - change this to your desired password
  const ADMIN_PASSWORD = 'admin2026'; // Change this to your secure password
  
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      // Refresh data every 5 seconds
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);
  
  const loadData = async () => {
    const statistics = await getQuizStatistics();
    const allUsers = await getAllUsers();
    const allRegistrations = await getAllRegistrations();
    setStats(statistics);
    setUsers(allUsers);
    setRegistrations(allRegistrations);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };
  
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Quiz Admin - Pratistha Mahotsav</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-yellow-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              🔐 Admin Access
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/" className="text-orange-600 hover:text-orange-800 text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Quiz Admin Dashboard - Pratistha Mahotsav</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-yellow-50">
        <Header />
        
        <main className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
                  📊 Quiz Admin Dashboard
                </h1>
                <p className="text-gray-600">View all participants and statistics</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={async () => await downloadStatistics()}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  📥 Export Data
                </button>
                <Link href="/">
                  <span className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
                    ← Home
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Overall Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-1">{stats.totalParticipants}</div>
                <div className="text-sm text-gray-600 font-semibold">Total Participants</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">{Math.round(stats.totalPoints)}</div>
                <div className="text-sm text-gray-600 font-semibold">Total Points</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">{Math.round(stats.averageAccuracy)}%</div>
                <div className="text-sm text-gray-600 font-semibold">Average Accuracy</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totalBadges}</div>
                <div className="text-sm text-gray-600 font-semibold">Total Badges Earned</div>
              </div>
            </div>
            
            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Activity Statistics</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Questions Answered:</span>
                    <span className="font-bold text-gray-800">{stats.totalQuestionsAnswered}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Correct Answers:</span>
                    <span className="font-bold text-green-600">{stats.totalCorrectAnswers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Points per User:</span>
                    <span className="font-bold text-orange-600">{Math.round(stats.averagePoints)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Streak:</span>
                    <span className="font-bold text-red-600">{Math.round(stats.averageStreak)} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Longest Streak:</span>
                    <span className="font-bold text-purple-600">{stats.longestStreak} days</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Participation by Day</h2>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.keys(stats.usersByDay).length > 0 ? (
                    Object.entries(stats.usersByDay)
                      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                      .map(([day, count]) => (
                        <div key={day} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span className="text-gray-700">Day {day}:</span>
                          <span className="font-bold text-orange-600">{count} participants</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No day completions yet</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Top Users */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Top 10 Participants</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Rank</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Name</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">Points</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">Streak</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">Days</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">Badges</th>
                      <th className="text-right py-3 px-4 text-gray-700 font-semibold">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topUsers.map((user, index) => (
                      <tr key={user.userId} className="border-b border-gray-100 hover:bg-orange-50">
                        <td className="py-3 px-4">
                          <span className={`inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                            index === 1 ? 'bg-gray-300 text-gray-800' :
                            index === 2 ? 'bg-orange-300 text-orange-900' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">{user.displayName}</td>
                        <td className="py-3 px-4 text-right font-bold text-orange-600">{user.totalPoints}</td>
                        <td className="py-3 px-4 text-right font-semibold text-red-600">🔥 {user.currentStreak}</td>
                        <td className="py-3 px-4 text-right text-gray-600">{user.completedDays}</td>
                        <td className="py-3 px-4 text-right text-purple-600">🏅 {user.badges}</td>
                        <td className="py-3 px-4 text-right font-semibold text-blue-600">{Math.round(user.accuracy)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {stats.topUsers.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No participants yet</p>
                )}
              </div>
            </div>
            
            {/* Registered Users */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Registered Users ({registrations.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Name</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Email</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Phone</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">City</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">State</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Age</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations
                      .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
                      .map((reg) => (
                        <tr key={reg.userId} className="border-b border-gray-100 hover:bg-orange-50">
                          <td className="py-2 px-3 font-medium text-gray-800">{reg.name || 'Anonymous'}</td>
                          <td className="py-2 px-3 text-gray-600">{reg.email || '-'}</td>
                          <td className="py-2 px-3 text-gray-600">{reg.phone || '-'}</td>
                          <td className="py-2 px-3 text-gray-600">{reg.city || '-'}</td>
                          <td className="py-2 px-3 text-gray-600">{reg.state || '-'}</td>
                          <td className="py-2 px-3 text-gray-600">{reg.age || '-'}</td>
                          <td className="py-2 px-3 text-gray-500 text-xs">
                            {reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {registrations.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No registered users yet</p>
                )}
              </div>
            </div>
            
            {/* All Users */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">👥 All Participants ({users.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">User ID</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Name</th>
                      <th className="text-right py-2 px-3 text-gray-700 font-semibold">Points</th>
                      <th className="text-right py-2 px-3 text-gray-700 font-semibold">Streak</th>
                      <th className="text-right py-2 px-3 text-gray-700 font-semibold">Days</th>
                      <th className="text-right py-2 px-3 text-gray-700 font-semibold">Badges</th>
                      <th className="text-left py-2 px-3 text-gray-700 font-semibold">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
                      .map((user) => (
                        <tr key={user.userId} className="border-b border-gray-100 hover:bg-orange-50">
                          <td className="py-2 px-3 text-xs text-gray-500 font-mono">{user.userId.substring(0, 12)}...</td>
                          <td className="py-2 px-3 font-medium text-gray-800">{user.displayName || 'Anonymous'}</td>
                          <td className="py-2 px-3 text-right font-semibold text-orange-600">{user.totalPoints || 0}</td>
                          <td className="py-2 px-3 text-right text-red-600">🔥 {user.currentStreak || 0}</td>
                          <td className="py-2 px-3 text-right text-gray-600">{(user.completedDays || []).length}</td>
                          <td className="py-2 px-3 text-right text-purple-600">🏅 {(user.badges || []).length}</td>
                          <td className="py-2 px-3 text-gray-500 text-xs">
                            {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : '-'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {users.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No participants yet</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

