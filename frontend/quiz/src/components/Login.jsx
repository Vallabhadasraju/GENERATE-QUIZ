// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/login", {
//         username,
//         password
//       });
      
//       if (res.data.success) {
//         localStorage.setItem("userId", res.data.userId);
//         localStorage.setItem("username", res.data.username);
//         setMessage("Login successful!");
//         setTimeout(() => navigate("/quiz"), 1000);
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage("Login failed: " + (err.response?.data?.message || "Server error"));
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/api/auth/register", {
//         username,
//         password,
//         email: username + "@quiz.com"
//       });
      
//       if (res.data.success) {
//         setMessage("Registered successfully! Now login.");
//         setUsername("");
//         setPassword("");
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       setMessage("Registration failed: " + (err.response?.data?.message || "Server error"));
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Quiz Platform</h2>
//       <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "0 auto" }}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
//         />
//         <button type="submit" style={{ width: "100%", padding: "10px", marginBottom: "10px", cursor: "pointer" }}>
//           Login
//         </button>
//         <button type="button" onClick={handleRegister} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", cursor: "pointer" }}>
//           Register
//         </button>
//       </form>
//       <p style={{ color: "red" }}>{message}</p>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      console.log("Logging in with:", { username, password });
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });
      
      console.log("Response:", res.data);
      
      if (res.data.success) {
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("username", res.data.username);
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/quiz"), 1500);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Server error: " + (err.response?.data?.message || err.message || "Can't reach backend"));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      console.log("Registering with:", { username, password });
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        email: username + "@quiz.com"
      });
      
      console.log("Response:", res.data);
      
      if (res.data.success) {
        setMessage("✅ Registered! Now login with same credentials.");
        setUsername("");
        setPassword("");
        setIsRegistering(false);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Server error: " + (err.response?.data?.message || err.message || "Can't reach backend"));
    }
  };

  return (
    <div className="center-container">
      <div className="login-card">
        <h1>🎯 Quiz Platform</h1>
        
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <h2>{isRegistering ? "Register" : "Login"}</h2>
          
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
          
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Back to Login" : "Create New Account"}
          </button>
        </form>
        
        <p>{message}</p>

       
      </div>
    </div>
  );
}
// cd C:\mysql\mysql-9.5.0-winx64\bin
// mysqld --console
// mysql -u root -p
// USE quizdb;
// SHOW TABLES;
// SELECT * FROM results;
// SELECT * FROM users;