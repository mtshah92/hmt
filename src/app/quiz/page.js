"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import DailyQuiz from "../../components/DailyQuiz";

export default function QuizPage() {
  const targetDate = new Date("2026-01-27T00:00:00");

  return (
    <>
      <Head>
        <title>Aaya Panchkalyanak Mahaan - Quiz</title>
        <meta
          name="description"
          content="Test your knowledge about Shantinath Bhagwan and Panchkalyanka"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <main className="px-3 max-w-md mx-auto">
          <div className="flex items-center justify-between py-3 mb-4">
            <Link href="/">
              <span className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                ← Home
              </span>
            </Link>
            <h1 className="text-lg font-bold text-gray-800">
              Aaya Panchkalyanak Mahaan
            </h1>
          </div>

          <DailyQuiz targetDate={targetDate} />
        </main>

        <footer className="text-center py-3 text-gray-400 text-xs mt-6">
          <p>જય જિનેન્દ્ર</p>
        </footer>
      </div>
    </>
  );
}
