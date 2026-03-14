// ================= QUESTIONS =================

const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
    explanation: "JavaScript runs directly in web browsers.",
  },

  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
    ],
    answer: "Cascading Style Sheets",
    explanation: "CSS stands for Cascading Style Sheets.",
  },

  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>",
    explanation: "The <script> tag includes JavaScript in HTML.",
  },

  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: "Netscape",
    explanation: "JavaScript was created at Netscape by Brendan Eich.",
  },

  {
    question: "Which property changes text color in CSS?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color",
    explanation: "The CSS 'color' property changes text color.",
  },

  {
    question: "Largest HTML heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: "<h1>",
    explanation: "<h1> is the largest heading element.",
  },

  {
    question: "Select element by ID in JavaScript?",
    options: [
      "getElementById()",
      "querySelectorAll()",
      "getElementsByClassName()",
      "getElement()",
    ],
    answer: "getElementById()",
    explanation: "document.getElementById() selects by ID.",
  },

  {
    question: "CSS layout using rows and columns?",
    options: ["Flexbox", "Grid", "Float", "Position"],
    answer: "Grid",
    explanation: "CSS Grid creates layouts with rows and columns.",
  },

  {
    question: "Single line comment in JavaScript?",
    options: ["//", "<!-- -->", "**", "##"],
    answer: "//",
    explanation: "// is used for single line comments.",
  },

  {
    question: "Keyword used to declare variable?",
    options: ["int", "var", "string", "define"],
    answer: "var",
    explanation: "var was traditionally used to declare variables.",
  },
];

// ================= STATE VARIABLES =================

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

// ================= DOM ELEMENTS =================

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

// ================= LOAD QUESTION =================

function loadQuestion() {
  nextBtn.style.display = "none";
  const q = questions[currentQuestion];

  document.getElementById("question-count").innerText =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

  questionEl.innerText = q.question;

  optionsEl.innerHTML = "";

  document.getElementById("explanation").innerText = "";

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => selectAnswer(option);

    optionsEl.appendChild(btn);
  });

  clearInterval(timer);
  startTimer();

  // progress bar

  const progressPercent = (currentQuestion / questions.length) * 100;

  document.getElementById("quizProgress").style.width = progressPercent + "%";
}

// ================= ANSWER SELECTION =================

function selectAnswer(option) {
  clearInterval(timer);

  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((btn) => {
    if (btn.innerText === questions[currentQuestion].answer) {
      btn.style.background = "#22c55e";
    } else {
      btn.style.background = "#ef4444";
    }

    btn.disabled = true;
  });

  if (option === questions[currentQuestion].answer) {
    score++;
  }

  document.getElementById("explanation").innerText =
    questions[currentQuestion].explanation;

  nextBtn.style.display = "block";
}

// ================= NEXT BUTTON =================

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
};

// ================= SHOW RESULT =================

function showResult() {
  document.getElementById("quiz-container").style.display = "none";

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("score").innerText = score + " / " + questions.length;

  let highScore = localStorage.getItem("quizHighScore") || 0;

  if (score > highScore) {
    localStorage.setItem("quizHighScore", score);
    highScore = score;
  }

  document.getElementById("highScore").innerText =
    "🏆 High Score: " + highScore;
}

// ================= START QUIZ =================

function startQuiz() {
  questions.sort(() => Math.random() - 0.5);

  document.getElementById("start-screen").style.display = "none";

  document.getElementById("quiz-container").classList.remove("hidden");

  loadQuestion();
}

// ================= RESTART QUIZ =================

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  document.getElementById("result").classList.add("hidden");

  document.getElementById("quiz-container").style.display = "block";

  loadQuestion();
}

// ================= TIMER =================

function startTimer() {
  timeLeft = 10;

  document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}
