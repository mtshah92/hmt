"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import DailyQuiz from '../../components/DailyQuiz';

export default function QuizPage() {
  const targetDate = new Date("2026-01-27T00:00:00");

  return (
    <>
      <Head>
        <title>Daily Quiz - Pratistha Mahotsav</title>
        <meta name="description" content="Test your knowledge about Shantinath Bhagwan and Panchkalyanka" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-pink-50 to-yellow-50">
        <Header />
        
        <main className="py-8 px-4 sm:px-6 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Back to Home */}
          <div className="max-w-4xl mx-auto mb-6 relative z-10">
            <Link href="/">
              <span className="inline-flex items-center gap-2 bg-white text-orange-600 hover:text-orange-800 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border-2 border-orange-200">
                ← Back to Home
              </span>
            </Link>
          </div>

          {/* Quiz Section */}
          <section className="max-w-4xl mx-auto relative z-10">
            <DailyQuiz targetDate={targetDate} />
          </section>

          {/* Info Section */}
          <section className="max-w-4xl mx-auto mt-12 mb-8 relative z-10">
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl border-2 border-orange-200 p-8 transform hover:scale-[1.01] transition-all">
              <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                🎮 How It Works
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-xl p-4 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl mb-2">📝</div>
                  <p className="font-semibold text-gray-800">Answer 3 questions daily about Shantinath Bhagwan and Panchkalyanka</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl mb-2">💎</div>
                  <p className="font-semibold text-gray-800">Earn points for correct answers and maintain your streak for bonus points!</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl mb-2">🏅</div>
                  <p className="font-semibold text-gray-800">Unlock amazing badges as you progress and level up!</p>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="font-semibold text-gray-800">New questions unlock each day until Pratistha Mahotsav!</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gradient-to-r from-orange-100 to-yellow-100 text-center py-8 text-orange-700 mt-12">
          <p
            className="text-lg font-medium"
            style={{
              fontFamily:
                "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              fontSize: "1.2rem",
            }}
          >
            જય જિનેન્દ્ર
          </p>
        </footer>
      </div>
    </>
  );
}

