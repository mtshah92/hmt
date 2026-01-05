/**
 * Quiz Questions Database
 * Organized by day number (days until Pratistha event)
 * Each day has 3 questions about Jainism, Shantinath Bhagwan, and Panchkalyanka
 */

export const QUIZ_QUESTIONS = [
  // Day 1 - Introduction to Shantinath Bhagwan
  {
    day: 1,
    questions: [
      {
        id: 1,
        question: "શાંતિનાથ ભગવાન કયા તીર્થંકર છે?",
        questionEn: "Which Tirthankara is Shantinath Bhagwan?",
        options: [
          "16મા તીર્થંકર",
          "17મા તીર્થંકર",
          "18મા તીર્થંકર",
          "19મા તીર્થંકર"
        ],
        correctAnswer: 0,
        explanation: "શાંતિનાથ ભગવાન 16મા તીર્થંકર છે. તેઓ શાંતિ અને શાંતિના પ્રતીક છે.",
        explanationEn: "Shantinath Bhagwan is the 16th Tirthankara. He is a symbol of peace and tranquility.",
        points: 10
      },
      {
        id: 2,
        question: "પંચ કલ્યાણકમાં કેટલા કલ્યાણક આવે છે?",
        questionEn: "How many Kalyanaks are there in Panch Kalyanak?",
        options: [
          "3 કલ્યાણક",
          "4 કલ્યાણક",
          "5 કલ્યાણક",
          "6 કલ્યાણક"
        ],
        correctAnswer: 2,
        explanation: "પંચ કલ્યાણકમાં 5 કલ્યાણક આવે છે: ગર્ભ, જન્મ, તપ, કેવળ જ્ઞાન અને મોક્ષ કલ્યાણક.",
        explanationEn: "Panch Kalyanak consists of 5 Kalyanaks: Garbha, Janma, Tap, Keval Gyan, and Moksha Kalyanak.",
        points: 10
      },
      {
        id: 3,
        question: "શાંતિનાથ ભગવાનનું ચિહ્ન કયું છે?",
        questionEn: "What is the symbol of Shantinath Bhagwan?",
        options: [
          "હરિણ (Deer)",
          "સર્પ (Snake)",
          "કમળ (Lotus)",
          "ચક્ર (Wheel)"
        ],
        correctAnswer: 0,
        explanation: "શાંતિનાથ ભગવાનનું ચિહ્ન હરિણ (Deer) છે, જે શાંતિ અને નમ્રતાનું પ્રતીક છે.",
        explanationEn: "The symbol of Shantinath Bhagwan is Deer (Harin), which represents peace and humility.",
        points: 10
      }
    ]
  },
  
  // Day 2 - Garbha Kalyanak
  {
    day: 2,
    questions: [
      {
        id: 1,
        question: "ગર્ભ કલ્યાણક શું છે?",
        questionEn: "What is Garbha Kalyanak?",
        options: [
          "જન્મની ઘટના",
          "ગર્ભાધાનની ઘટના",
          "તપસ્યાની ઘટના",
          "મોક્ષની ઘટના"
        ],
        correctAnswer: 1,
        explanation: "ગર્ભ કલ્યાણક એ ગર્ભાધાનની ઘટના છે, જ્યારે ભગવાનનો આત્મા માતાના ગર્ભમાં પ્રવેશ કરે છે.",
        explanationEn: "Garbha Kalyanak is the event of conception, when the soul of Bhagwan enters the mother's womb.",
        points: 10
      },
      {
        id: 2,
        question: "ગર્ભ કલ્યાણક ક્યારે થાય છે?",
        questionEn: "When does Garbha Kalyanak occur?",
        options: [
          "જન્મ પહેલાં",
          "જન્મ પછી",
          "તપસ્યા પહેલાં",
          "મોક્ષ પહેલાં"
        ],
        correctAnswer: 0,
        explanation: "ગર્ભ કલ્યાણક જન્મ પહેલાં થાય છે, જ્યારે ભગવાનનો આત્મા ગર્ભમાં પ્રવેશ કરે છે.",
        explanationEn: "Garbha Kalyanak occurs before birth, when the soul of Bhagwan enters the womb.",
        points: 10
      },
      {
        id: 3,
        question: "ગર્ભ કલ્યાણકમાં કયું ચિહ્ન દેખાય છે?",
        questionEn: "What sign appears in Garbha Kalyanak?",
        options: [
          "સ્વપ્ન",
          "ચિહ્ન",
          "આશીર્વાદ",
          "આકાશી ઘટના"
        ],
        correctAnswer: 0,
        explanation: "ગર્ભ કલ્યાણકમાં માતાને ખાસ સ્વપ્ન આવે છે, જે ભવિષ્યના ભગવાનની સૂચના આપે છે.",
        explanationEn: "In Garbha Kalyanak, the mother has special dreams that indicate the future Bhagwan.",
        points: 10
      }
    ]
  },
  
  // Day 3 - Janma Kalyanak
  {
    day: 3,
    questions: [
      {
        id: 1,
        question: "જન્મ કલ્યાણક શું છે?",
        questionEn: "What is Janma Kalyanak?",
        options: [
          "ગર્ભાધાન",
          "જન્મ",
          "તપસ્યા",
          "મોક્ષ"
        ],
        correctAnswer: 1,
        explanation: "જન્મ કલ્યાણક એ ભગવાનના જન્મની ઘટના છે.",
        explanationEn: "Janma Kalyanak is the event of the birth of Bhagwan.",
        points: 10
      },
      {
        id: 2,
        question: "જન્મ કલ્યાણકમાં કયું ચિહ્ન દેખાય છે?",
        questionEn: "What sign appears in Janma Kalyanak?",
        options: [
          "આકાશમાં દેવો",
          "ધરતીમાં ફૂલો",
          "સમુદ્રમાં તરંગો",
          "વાયુમાં સુગંધ"
        ],
        correctAnswer: 0,
        explanation: "જન્મ કલ્યાણકમાં આકાશમાં દેવો દેખાય છે અને આશીર્વાદ આપે છે.",
        explanationEn: "In Janma Kalyanak, gods appear in the sky and give blessings.",
        points: 10
      },
      {
        id: 3,
        question: "જન્મ કલ્યાણક કયા ક્રમમાં આવે છે?",
        questionEn: "In what order does Janma Kalyanak come?",
        options: [
          "પહેલું",
          "બીજું",
          "ત્રીજું",
          "ચોથું"
        ],
        correctAnswer: 1,
        explanation: "જન્મ કલ્યાણક પંચ કલ્યાણકમાં બીજા ક્રમમાં આવે છે, ગર્ભ કલ્યાણક પછી.",
        explanationEn: "Janma Kalyanak comes second in Panch Kalyanak, after Garbha Kalyanak.",
        points: 10
      }
    ]
  },
  
  // Day 4 - Tap Kalyanak
  {
    day: 4,
    questions: [
      {
        id: 1,
        question: "તપ કલ્યાણક શું છે?",
        questionEn: "What is Tap Kalyanak?",
        options: [
          "જન્મ",
          "તપસ્યા/સંન્યાસ",
          "જ્ઞાન",
          "મોક્ષ"
        ],
        correctAnswer: 1,
        explanation: "તપ કલ્યાણક એ ભગવાનના તપસ્યા અને સંન્યાસ લેવાની ઘટના છે.",
        explanationEn: "Tap Kalyanak is the event of Bhagwan taking up penance and renunciation.",
        points: 10
      },
      {
        id: 2,
        question: "તપ કલ્યાણકમાં ભગવાન શું કરે છે?",
        questionEn: "What does Bhagwan do in Tap Kalyanak?",
        options: [
          "ઘર છોડે છે",
          "તપસ્યા કરે છે",
          "જ્ઞાન મેળવે છે",
          "બંને A અને B"
        ],
        correctAnswer: 3,
        explanation: "તપ કલ્યાણકમાં ભગવાન ઘર છોડીને તપસ્યા કરે છે.",
        explanationEn: "In Tap Kalyanak, Bhagwan leaves home and performs penance.",
        points: 10
      },
      {
        id: 3,
        question: "તપ કલ્યાણક કયા ક્રમમાં આવે છે?",
        questionEn: "In what order does Tap Kalyanak come?",
        options: [
          "પહેલું",
          "બીજું",
          "ત્રીજું",
          "ચોથું"
        ],
        correctAnswer: 2,
        explanation: "તપ કલ્યાણક પંચ કલ્યાણકમાં ત્રીજા ક્રમમાં આવે છે.",
        explanationEn: "Tap Kalyanak comes third in Panch Kalyanak.",
        points: 10
      }
    ]
  },
  
  // Day 5 - Keval Gyan Kalyanak
  {
    day: 5,
    questions: [
      {
        id: 1,
        question: "કેવળ જ્ઞાન કલ્યાણક શું છે?",
        questionEn: "What is Keval Gyan Kalyanak?",
        options: [
          "તપસ્યા",
          "સર્વજ્ઞતા/પૂર્ણ જ્ઞાન",
          "જન્મ",
          "મોક્ષ"
        ],
        correctAnswer: 1,
        explanation: "કેવળ જ્ઞાન કલ્યાણક એ ભગવાનને સર્વજ્ઞતા (પૂર્ણ જ્ઞાન) પ્રાપ્ત થવાની ઘટના છે.",
        explanationEn: "Keval Gyan Kalyanak is the event when Bhagwan attains omniscience (complete knowledge).",
        points: 10
      },
      {
        id: 2,
        question: "કેવળ જ્ઞાન પ્રાપ્ત કર્યા પછી ભગવાન શું કરે છે?",
        questionEn: "What does Bhagwan do after attaining Keval Gyan?",
        options: [
          "તપસ્યા કરે છે",
          "ધર્મ ઉપદેશ આપે છે",
          "ઘરે જાય છે",
          "મોક્ષ પામે છે"
        ],
        correctAnswer: 1,
        explanation: "કેવળ જ્ઞાન પ્રાપ્ત કર્યા પછી ભગવાન ધર્મનો ઉપદેશ આપે છે.",
        explanationEn: "After attaining Keval Gyan, Bhagwan preaches dharma.",
        points: 10
      },
      {
        id: 3,
        question: "કેવળ જ્ઞાન કલ્યાણક કયા ક્રમમાં આવે છે?",
        questionEn: "In what order does Keval Gyan Kalyanak come?",
        options: [
          "ત્રીજું",
          "ચોથું",
          "પાંચમું",
          "બીજું"
        ],
        correctAnswer: 1,
        explanation: "કેવળ જ્ઞાન કલ્યાણક પંચ કલ્યાણકમાં ચોથા ક્રમમાં આવે છે.",
        explanationEn: "Keval Gyan Kalyanak comes fourth in Panch Kalyanak.",
        points: 10
      }
    ]
  },
  
  // Day 6 - Moksha Kalyanak
  {
    day: 6,
    questions: [
      {
        id: 1,
        question: "મોક્ષ કલ્યાણક શું છે?",
        questionEn: "What is Moksha Kalyanak?",
        options: [
          "જન્મ",
          "તપસ્યા",
          "મોક્ષ/નિર્વાણ",
          "જ્ઞાન"
        ],
        correctAnswer: 2,
        explanation: "મોક્ષ કલ્યાણક એ ભગવાનના મોક્ષ (નિર્વાણ) પામવાની ઘટના છે.",
        explanationEn: "Moksha Kalyanak is the event when Bhagwan attains moksha (nirvana).",
        points: 10
      },
      {
        id: 2,
        question: "મોક્ષ પછી ભગવાન ક્યાં જાય છે?",
        questionEn: "Where does Bhagwan go after Moksha?",
        options: [
          "સ્વર્ગ",
          "સિદ્ધક્ષેત્ર",
          "પૃથ્વી",
          "અન્ય લોક"
        ],
        correctAnswer: 1,
        explanation: "મોક્ષ પછી ભગવાન સિદ્ધક્ષેત્રમાં જાય છે, જ્યાં તેઓ સિદ્ધ બને છે.",
        explanationEn: "After Moksha, Bhagwan goes to Siddhakshetra, where they become Siddha.",
        points: 10
      },
      {
        id: 3,
        question: "મોક્ષ કલ્યાણક કયા ક્રમમાં આવે છે?",
        questionEn: "In what order does Moksha Kalyanak come?",
        options: [
          "ચોથું",
          "પાંચમું",
          "ત્રીજું",
          "બીજું"
        ],
        correctAnswer: 1,
        explanation: "મોક્ષ કલ્યાણક પંચ કલ્યાણકમાં પાંચમા અને અંતિમ ક્રમમાં આવે છે.",
        explanationEn: "Moksha Kalyanak comes fifth and last in Panch Kalyanak.",
        points: 10
      }
    ]
  }
];

/**
 * Get questions for a specific day based on current date
 * All users will see the same questions on the same day
 */
export const getQuestionsForDay = (day) => {
  // Calculate which day of questions to show based on current date
  const today = new Date();
  const startDate = new Date('2025-01-01'); // Quiz start date
  const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  // Use the calculated day or fallback to day 1
  const questionDay = daysDiff > 0 && daysDiff <= QUIZ_QUESTIONS.length ? daysDiff : 1;
  
  const dayData = QUIZ_QUESTIONS.find(d => d.day === questionDay);
  if (dayData) {
    return dayData.questions;
  }
  
  // If day doesn't exist, return day 1 questions (fallback)
  return QUIZ_QUESTIONS[0].questions;
};

/**
 * Get current quiz day based on today's date
 * All users will be on the same day
 */
export const getCurrentQuizDay = () => {
  const today = new Date();
  const startDate = new Date('2025-01-01'); // Quiz start date
  const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
  
  return daysDiff > 0 && daysDiff <= QUIZ_QUESTIONS.length ? daysDiff : 1;
};

/**
 * Get total number of days with questions
 */
export const getTotalDays = () => {
  return QUIZ_QUESTIONS.length;
};

/**
 * Check if a day has questions
 */
export const hasQuestionsForDay = (day) => {
  return QUIZ_QUESTIONS.some(d => d.day === day);
};

