const allQuestions = [
  { 
    question: "How often do you feel down, depressed, or hopeless?", 
    validAnswers: ["Always", "Sometimes", "Rarely", "Never"],
    category: "depression"
  },
  { 
    question: "How often do you feel nervous, anxious, or on edge?", 
    validAnswers: ["Always", "Sometimes", "Rarely", "Never"],
    category: "anxiety"
  },
  { 
    question: "Do you find it hard to enjoy activities you used to like?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you feel tired or lack energy often?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "How often do you have trouble sleeping or staying awake?", 
    validAnswers: ["Always", "Sometimes", "Rarely", "Never"],
    category: "anxiety"
  },
  { 
    question: "Do you find it difficult to concentrate or make decisions?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "Do you feel irritable or restless frequently?", 
    validAnswers: ["Yes", "No"],
    category: "anxiety"
  },
  { 
    question: "Have you noticed changes in your appetite or weight recently?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you experience sudden mood swings or emotional outbursts?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "Do you ever feel overwhelmed by responsibilities or tasks?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "How often do you feel disconnected from others or isolated?", 
    validAnswers: ["Always", "Sometimes", "Rarely", "Never"],
    category: "depression"
  },
  { 
    question: "Do you have recurring negative thoughts or feelings?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you often feel that you're not good enough?", 
    validAnswers: ["Yes", "No"],
    category: "anxiety"
  },
  // Additional questions (Total 22 questions)
  { 
    question: "Do you feel hopeless about the future?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "How often do you find yourself feeling restless or uneasy?", 
    validAnswers: ["Always", "Sometimes", "Rarely", "Never"],
    category: "anxiety"
  },
  { 
    question: "Do you have trouble relaxing or unwinding?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "Have you noticed a decline in your social interactions?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you often find it hard to get out of bed in the morning?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you frequently feel overwhelmed by small tasks?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "Do you experience racing thoughts or overthinking?", 
    validAnswers: ["Yes", "No"],
    category: "anxiety"
  },
  { 
    question: "Do you struggle with making decisions, even simple ones?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  },
  { 
    question: "Do you feel that you are losing interest in activities that once brought you joy?", 
    validAnswers: ["Yes", "No"],
    category: "depression"
  },
  { 
    question: "Do you find it hard to focus on tasks for long periods of time?", 
    validAnswers: ["Yes", "No"],
    category: "stress"
  }
];


let currentQuestionIndex = 0;
let userResponses = [];
let askedQuestions = [];
let randomQuestions = []; // Store the random questions to use one by one

// Get 7 random questions (only once)
function getRandomQuestions() {
  const selectedQuestions = [];
  while (selectedQuestions.length < 7) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    if (!askedQuestions.includes(randomIndex)) {
      askedQuestions.push(randomIndex);
      selectedQuestions.push(allQuestions[randomIndex]);
    }
  }
  return selectedQuestions;
}

// Initialize random questions
randomQuestions = getRandomQuestions();

// Function to append messages to chatbox
function appendMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.innerHTML = text;
  const chatbox = document.getElementById("chatbox");
  chatbox.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to ask the next question
function askNextQuestion() {
  if (currentQuestionIndex < randomQuestions.length) {
    const currentQuestionData = randomQuestions[currentQuestionIndex];
    appendMessage(`<strong>${currentQuestionData.question}</strong><br><br><strong>Options:</strong><br>${currentQuestionData.validAnswers.join("<br>")}`, "bot");
  } else {
    analyzeResponses();
  }
}

// Analyze user responses after all questions have been answered
function analyzeResponses() {
  const analysis = {
    depression: 0,
    anxiety: 0,
    stress: 0,
  };

  userResponses.forEach((response, index) => {
    const currentQuestionData = randomQuestions[index];
    const category = currentQuestionData.category;
    const responseScore = getResponseScore(response, currentQuestionData.validAnswers);

    if (category === "depression") {
      analysis.depression += responseScore;
    } else if (category === "anxiety") {
      analysis.anxiety += responseScore;
    } else if (category === "stress") {
      analysis.stress += responseScore;
    }
  });

  const suggestions = [];
  if (analysis.depression > 6) suggestions.push("Consider talking to a counselor about feelings of depression.");
  if (analysis.anxiety > 6) suggestions.push("Practice relaxation techniques like deep breathing or meditation.");
  if (analysis.stress > 4) suggestions.push("Try organizing tasks into manageable steps to reduce overwhelm.");

  const resultMessage = `
    <div style="font-weight: bold;">Assessment Results:</div>
    <ul>
      <li><strong>Depression Risk:</strong> ${analysis.depression > 6 ? "High" : (analysis.depression > 3 ? "Moderate" : "Low")}</li>
      <li><strong>Anxiety Risk:</strong> ${analysis.anxiety > 6 ? "High" : (analysis.anxiety > 3 ? "Moderate" : "Low")}</li>
      <li><strong>Stress Risk:</strong> ${analysis.stress > 4 ? "Moderate" : "Low"}</li>
    </ul>
    <div style="font-weight: bold;">Suggestions:</div>
    <ul>
      ${suggestions.length > 0 ? suggestions.map(s => `<li>${s}</li>`).join("") : "<li>You're doing well! Keep up the good work.</li>"}
    </ul>
    <div>
      <strong>Do you want to retake the test or exit?</strong><br>
      <strong>Type <em>retake</em> to retake or <em>exit</em> to quit the assessment.</strong>
    </div>
  `;
  appendMessage(resultMessage, "bot");
}

// Get score based on response
function getResponseScore(response, validAnswers) {
  // Check for "Yes" and "No" based on the question category
  if (response === "Yes" || response === "yes") {
    return 3; // High score for "Yes" (problematic answer)
  } else if (response === "No" || response === "no") {
    return 0; // Low score for "No" (healthy answer)
  }

  // For frequency-based answers (e.g., "Always", "Sometimes", etc.)
  if (validAnswers.includes("Always") && (response === "Always" || response === "always")) {
    return 3; // High score for "Always"
  } else if (validAnswers.includes("Sometimes") && (response === "Sometimes" || response === "sometimes")) {
    return 2; // Moderate score for "Sometimes"
  } else if (validAnswers.includes("Rarely") && (response === "Rarely" || response === "rarely")) {
    return 1; // Low score for "Rarely"
  } else if (validAnswers.includes("Never") && (response === "Never" || response === "never")) {
    return 0; // Low score for "Never"
  }

  return 0; // Default score in case of an unexpected response
}

// Event listener for sending messages
document.getElementById("sendBtn").addEventListener("click", () => {
  sendUserMessage();
});

document.getElementById("userInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendUserMessage();
  }
});

// Send the user's response and validate the input
function sendUserMessage() {
  const userInput = document.getElementById("userInput").value.trim().toLowerCase();
  if (!userInput) return;

  // Handle retake or exit commands
  if (userInput === "retake") {
    window.location.href = "testdashboard.html"; // Redirect to the dashboard.html for retake
    return;
  } else if (userInput === "exit") {
    appendMessage("Thank you for using the assessment. Goodbye!", "bot");
    window.location.href = "\docs\index.html"; // Redirect to a dummy HTML page
    return;
  }

  // Validate the user input against the valid answers
  const currentQuestionData = randomQuestions[currentQuestionIndex];
  if (!currentQuestionData.validAnswers.map(ans => ans.toLowerCase()).includes(userInput)) {
    appendMessage(`Please enter a valid answer: <br><strong>${currentQuestionData.validAnswers.join("<br>")}</strong>`, "bot");
    return;
  }

  appendMessage(userInput, "user");
  userResponses.push(userInput);
  document.getElementById("userInput").value = "";
  currentQuestionIndex++;

  setTimeout(askNextQuestion, 500); // Wait before showing the next question
}

// Start the chatbot
askNextQuestion();
