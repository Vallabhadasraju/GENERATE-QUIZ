
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Quiz() {
//   const [quiz, setQuiz] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(30);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/quiz").then((res) => {
//       setQuiz(res.data);
//     });
//   }, []);

//   useEffect(() => {
//     if (submitted || quiz.length === 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           handleNextQuestion();
//           return 30;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentQuestion, submitted, quiz.length]);

//   const handleAnswer = (optionIndex) => {
//     setAnswers({
//       ...answers,
//       [currentQuestion]: optionIndex
//     });
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < quiz.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setTimer(30);
//     } else {
//       calculateScore();
//     }
//   };

//   const calculateScore = () => {
//     let finalScore = 0;
//     quiz.forEach((q, index) => {
//       if (answers[index] === q.answer) {
//         finalScore++;
//       }
//     });
//     setScore(finalScore);
//     setSubmitted(true);

//     axios.post("http://localhost:8080/api/results/submit", {
//       username: username,
//       score: finalScore,
//       timestamp: Date.now()
//     }).then(() => {
//       setTimeout(() => navigate("/ranking"), 2000);
//     });
//   };

//   if (quiz.length === 0) return <div className="center-container"><p>Loading quiz...</p></div>;

//   if (submitted) {
//     return (
//       <div className="center-container">
//         <div className="quiz-card">
//           <h2>Quiz Submitted!</h2>
//           <h1>{score}/{quiz.length}</h1>
//           <p>Redirecting to rankings...</p>
//         </div>
//       </div>
//     );
//   }

//   const q = quiz[currentQuestion];

//   return (
//     <div className="center-container">
//       <div className="quiz-card">
//         <div className="quiz-header">
//           <h3>Question {currentQuestion + 1}/{quiz.length}</h3>
//           <h3 className={`timer ${timer < 10 ? 'urgent' : ''}`}>⏱️ {timer}s</h3>
//         </div>

//         <h4>{q.q}</h4>

//         <div className="options">
//           {q.options.map((option, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleAnswer(idx)}
//               className={answers[currentQuestion] === idx ? 'selected' : ''}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         <div className="quiz-controls">
//           <button
//             onClick={() => {
//               if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//             }}
//             disabled={currentQuestion === 0}
//           >
//             ← Back
//           </button>

//           <button onClick={handleNextQuestion}>
//             {currentQuestion === quiz.length - 1 ? "Submit Quiz" : "Next →"}
//           </button>
//         </div>

//         <div className="progress">
//           Progress: {Object.keys(answers).length}/{quiz.length} answered
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Quiz() {
//   const [quiz, setQuiz] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(30);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/quiz")
//       .then((res) => {
//         console.log("✅ Quiz loaded:", res.data.length, "questions");
//         setQuiz(res.data);
//       })
//       .catch(err => console.error("❌ Quiz load error:", err));
//   }, []);

//   // Timer Logic
//   useEffect(() => {
//     if (submitted || quiz.length === 0) return;

//     const interval = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           handleNextQuestion();
//           return 30;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentQuestion, submitted, quiz.length]);

//   const handleAnswer = (optionIndex) => {
//     setAnswers({
//       ...answers,
//       [currentQuestion]: optionIndex
//     });
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < quiz.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setTimer(30);
//     } else {
//       calculateScore();
//     }
//   };

//   const calculateScore = async () => {
//     let finalScore = 0;
//     quiz.forEach((q, index) => {
//       if (answers[index] === q.answer) {
//         finalScore++;
//       }
//     });
    
//     console.log("🧮 Final Score:", finalScore, "- Username:", username);
//     setScore(finalScore);
//     setSubmitted(true);

//     // 🔥 CRITICAL: SAVE TO DATABASE
//     try {
//       console.log("📤 Sending to backend:", { username, score: finalScore });
//       const response = await axios.post("http://localhost:8080/api/results/submit", {
//         username: username,
//         score: finalScore
//       });
      
//       console.log("✅ Backend response:", response.data);
//       alert("Score saved! Redirecting to leaderboard...");
      
//     } catch (error) {
//       console.error("❌ SAVE ERROR:", error.response?.data || error.message);
//       alert("Score calculated but save failed: " + (error.response?.data?.message || error.message));
//     }
    
//     setTimeout(() => navigate("/ranking"), 2000);
//   };

//   if (quiz.length === 0) return <div className="center-container"><p>Loading quiz...</p></div>;

//   if (submitted) {
//     return (
//       <div className="center-container">
//         <div className="quiz-card">
//           <h2>Quiz Completed!</h2>
//           <h1>{score}/{quiz.length}</h1>
//           <p>Score: {(score/quiz.length*100).toFixed(0)}%</p>
//           <p>Saving to database...</p>
//         </div>
//       </div>
//     );
//   }

//   const q = quiz[currentQuestion];

//   return (
//     <div className="center-container">
//       <div className="quiz-card">
//         <div className="quiz-header">
//           <h3>Question {currentQuestion + 1}/{quiz.length}</h3>
//           <h3 className={`timer ${timer < 10 ? 'urgent' : ''}`}>⏱️ {timer}s</h3>
//         </div>

//         <h4>{q.q}</h4>

//         <div className="options">
//           {q.options.map((option, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleAnswer(idx)}
//               className={answers[currentQuestion] === idx ? 'selected' : ''}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         <div className="quiz-controls">
//           <button
//             onClick={() => {
//               if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//             }}
//             disabled={currentQuestion === 0}
//           >
//             ← Back
//           </button>

//           <button onClick={handleNextQuestion}>
//             {currentQuestion === quiz.length - 1 ? "Submit Quiz" : "Next →"}
//           </button>
//         </div>

//         <div className="progress">
//           Progress: {Object.keys(answers).length}/{quiz.length} answered
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios.get("http://localhost:8080/api/quiz")
      .then((res) => {
        console.log("✅ Quiz loaded:", res.data.length, "questions");
        setQuiz(res.data);
      })
      .catch(err => console.error("❌ Quiz load error:", err));
  }, []);

  useEffect(() => {
    if (submitted || quiz.length === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestion, submitted, quiz.length]);

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(30);
    } else {
      calculateScore();
    }
  };

  const calculateScore = async () => {
    let finalScore = 0;
    quiz.forEach((q, index) => {
      if (answers[index] === q.answer) finalScore++;
    });
    
    console.log("🧮 Final Score:", finalScore, "- Username:", username);
    setScore(finalScore);
    setSubmitted(true);

    // 🔥 SAVE TO YOUR /api/score ENDPOINT
    try {
      console.log("📤 Sending to /api/score:", { username, score: finalScore });
      await axios.post("http://localhost:8080/api/score", {
        username: username,
        score: finalScore
      });
      console.log("✅ SAVED SUCCESSFULLY!");
    } catch (error) {
      console.error("❌ SAVE ERROR:", error.response?.data || error.message);
    }
    
    setTimeout(() => navigate("/ranking"), 2000);
  };

  if (quiz.length === 0) return <div className="center-container"><p>Loading quiz...</p></div>;

  if (submitted) {
    return (
      <div className="center-container">
        <div className="quiz-card">
          <h2>Quiz Completed!</h2>
          <h1>{score}/{quiz.length}</h1>
          <p>Score saved to database!</p>
        </div>
      </div>
    );
  }

  const q = quiz[currentQuestion];
  return (
    <div className="center-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h3>Question {currentQuestion + 1}/{quiz.length}</h3>
          <h3 className={`timer ${timer < 10 ? 'urgent' : ''}`}>⏱️ {timer}s</h3>
        </div>
        <h4>{q.q}</h4>
        <div className="options">
          {q.options.map((option, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)}
              className={answers[currentQuestion] === idx ? 'selected' : ''}>
              {option}
            </button>
          ))}
        </div>
        <div className="quiz-controls">
          <button onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}>← Back</button>
          <button onClick={handleNextQuestion}>
            {currentQuestion === quiz.length - 1 ? "Submit Quiz" : "Next →"}
          </button>
        </div>
        <div className="progress">
          Progress: {Object.keys(answers).length}/{quiz.length} answered
        </div>
      </div>
    </div>
  );
}
