
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: 1
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which method saves data in Local Storage?",
    options: [
      "localStorage.save()",
      "localStorage.setItem()",
      "localStorage.store()",
      "localStorage.add()"
    ],
    answer: 1
  },
  {
    question: "Which method reads data from Local Storage?",
    options: [
      "localStorage.getItem()",
      "localStorage.read()",
      "localStorage.fetch()",
      "localStorage.find()"
    ],
    answer: 0
  },
  {
    question: "Which method removes one item from Local Storage?",
    options: [
      "localStorage.deleteItem()",
      "localStorage.clearItem()",
      "localStorage.removeItem()",
      "localStorage.erase()"
    ],
    answer: 2
  },
  {
    question: "Which method removes all items from Local Storage for the current origin?",
    options: [
      "localStorage.remove()",
      "localStorage.clear()",
      "localStorage.reset()",
      "localStorage.delete()"
    ],
    answer: 1
  },
  {
    question: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.parse()",
      "JSON.convert()",
      "JSON.stringify()",
      "JSON.object()"
    ],
    answer: 2
  },
  {
    question: "Which method converts a JSON string into JavaScript data?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.read()",
      "JSON.decodeObject()"
    ],
    answer: 0
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<head>", "<heading>", "<h1>"],
    answer: 3
  },
  {
    question: "Which CSS property changes text color?",
    options: ["font-style", "background", "color", "text-size"],
    answer: 2
  },
  {
    question: "Which JavaScript method selects an element by its ID?",
    options: [
      "document.getElementById()",
      "document.getByClass()",
      "document.selectID()",
      "document.findElement()"
    ],
    answer: 0
  },
  {
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["const", "let", "fixed", "static"],
    answer: 1
  },
  {
    question: "Which event runs when a user clicks a button?",
    options: ["onload", "onchange", "onclick", "onhover"],
    answer: 2
  },
  {
    question: "What type of data does Local Storage store?",
    options: [
      "Only numbers",
      "Only arrays",
      "Only objects",
      "Strings"
    ],
    answer: 3
  },
  {
    question: "How long does Local Storage data normally remain?",
    options: [
      "Until the page refreshes",
      "Until the browser tab closes",
      "Until it is removed or browser data is cleared",
      "For exactly one hour"
    ],
    answer: 2
  },
  {
    question: "Which property gives the number of items in an array?",
    options: ["length", "size()", "count()", "total"],
    answer: 0
  },
  {
    question: "Which operator checks strict equality in JavaScript?",
    options: ["=", "===", "=>", "!="],
    answer: 1
  },
  {
    question: "Which HTML attribute connects a label to an input's ID?",
    options: ["name", "target", "for", "value"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");
const savedResults = document.getElementById("saved-results");
const clearBtn = document.getElementById("clear-btn");

// Load a question
function loadQuestion() {
  selectedAnswer = null;

  const current = questions[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1}`;
  progress.textContent = `${currentQuestion + 1} / ${questions.length}`;

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";
  feedback.textContent = "";
  nextBtn.disabled = true;

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "Finish Quiz"
      : "Next Question";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;
    button.className = "option";

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsElement.appendChild(button);
  });
}
function selectAnswer(index) {
  if (selectedAnswer !== null) return;
  selectedAnswer = index;

  const current = questions[currentQuestion];
  const buttons = optionsElement.querySelectorAll(".option");
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === current.answer) {
      button.classList.add("correct");
    }
    if (i === index && index !== current.answer) {
      button.classList.add("wrong");
    }
  });

  if (index === current.answer) {
    score++;
    feedback.textContent = "Correct answer!";
  } else {
    feedback.textContent =
      `Incorrect. Correct answer: ${current.options[current.answer]}`;
  }

  nextBtn.disabled = false;
}
nextBtn.addEventListener("click", () => {
  if (selectedAnswer === null) return;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});
function saveResult(finalScoreValue) {
  const results = JSON.parse(
    localStorage.getItem("quizResults") || "[]"
  );
  results.unshift({
    score: finalScoreValue,
    total: questions.length,
    date: new Date().toLocaleString()
  });
  localStorage.setItem(
    "quizResults",
    JSON.stringify(results.slice(0, 10))
  );
}
function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  finalScore.textContent =
    `Your Score: ${score} / ${questions.length}`;
  const percentage = (score / questions.length) * 100;
  if (percentage >= 80) {
    resultMessage.textContent = "Excellent work! Keep it up!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort! Keep practising.";
  } else {
    resultMessage.textContent = "Keep learning. You can do better!";
  }
  saveResult(score);
  displayResults();
}
function displayResults() {
  const results = JSON.parse(
    localStorage.getItem("quizResults") || "[]"
  );
  savedResults.innerHTML = "";
  if (results.length === 0) {
    savedResults.textContent = "No results saved yet.";
    return;
  }
  results.forEach((result) => {
    const item = document.createElement("p");
    item.textContent =
      `${result.score}/${result.total} marks — ${result.date}`;
    savedResults.appendChild(item);
  });
}
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  selectedAnswer = null;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});
clearBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear quiz history?")) {
    localStorage.removeItem("quizResults");
    displayResults();
  }
});
loadQuestion();
displayResults();
