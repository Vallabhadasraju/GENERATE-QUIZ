// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Ranking() {
//   const [rankings, setRankings] = useState([]);
//   const [participantCount, setParticipantCount] = useState(0);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/results/count").then((res) => {
//       setParticipantCount(res.data.count);
//     });

//     axios.get("http://localhost:8080/api/results/ranking").then((res) => {
//       setRankings(res.data);
//     });
//   }, []);

//   return (
//     <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
//       <h2>Leaderboard 🏆</h2>
//       <p style={{ fontSize: "18px", marginBottom: "20px" }}>
//         Total Participants: <strong>{participantCount}</strong>
//       </p>

//       {participantCount < 5 ? (
//         <div style={{ backgroundColor: "#fff3cd", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
//           <p>⏳ Waiting for more participants... ({participantCount}/5)</p>
//           <p>The quiz will be available for all once 5 people complete it!</p>
//         </div>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#007bff", color: "white" }}>
//               <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Rank</th>
//               <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Username</th>
//               <th style={{ padding: "12px", textAlign: "right", borderBottom: "2px solid #ddd" }}>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rankings.map((rank, idx) => (
//               <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "white" }}>
//                 <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
//                   {idx === 0 && "🥇"} {idx === 1 && "🥈"} {idx === 2 && "🥉"} {idx + 1}
//                 </td>
//                 <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
//                   <strong>{rank.username === username ? `${rank.username} (You)` : rank.username}</strong>
//                 </td>
//                 <td style={{ padding: "12px", borderBottom: "1px solid #ddd", textAlign: "right", fontSize: "16px", fontWeight: "bold", color: "#007bff" }}>
//                   {rank.score}/10
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div style={{ marginTop: "30px", textAlign: "center" }}>
//         <button
//           onClick={() => {
//             localStorage.removeItem("userId");
//             localStorage.removeItem("username");
//             navigate("/");
//           }}
//           style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", borderRadius: "5px", cursor: "pointer" }}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Ranking() {
//   const [rankings, setRankings] = useState([]);
//   const [participantCount, setParticipantCount] = useState(0);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/results/count").then((res) => {
//       setParticipantCount(res.data.count);
//     });

//     axios.get("http://localhost:8080/api/results/ranking").then((res) => {
//       setRankings(res.data);
//     });
//   }, []);

//   return (
//     <div className="center-container">
//       <div className="ranking-card">
//         <h1>Leaderboard 🏆</h1>
        
//         <div className="stats">
//           Total Participants: <strong>{participantCount}</strong>
//         </div>

//         {participantCount < 5 ? (
//           <div className="waiting">
//             ⏳ Waiting for more participants... ({participantCount}/5)
//           </div>
//         ) : (
//           <table className="leaderboard">
//             <thead>
//               <tr>
//                 <th>Rank</th>
//                 <th>Username</th>
//                 <th>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rankings.map((rank, idx) => (
//                 <tr key={idx}>
//                   <td>
//                     {idx === 0 && "🥇"} {idx === 1 && "🥈"} {idx === 2 && "🥉"} {idx + 1}
//                   </td>
//                   <td>
//                     <strong>{rank.username === username ? `${rank.username} (You)` : rank.username}</strong>
//                   </td>
//                   <td>{rank.score}/10</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         <button className="logout-btn" onClick={() => {
//           localStorage.removeItem("userId");
//           localStorage.removeItem("username");
//           navigate("/");
//         }}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [participantCount, setParticipantCount] = useState(0);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    // 🔥 YOUR ENDPOINTS
    axios.get("http://localhost:8080/api/score/count")
      .then((res) => setParticipantCount(res.data))
      .catch(err => console.error("Count error:", err));

    axios.get("http://localhost:8080/api/score/leaderboard")
      .then((res) => setRankings(res.data))
      .catch(err => console.error("Leaderboard error:", err));
  }, []);

  return (
    <div className="center-container">
      <div className="ranking-card">
        <h1>Leaderboard 🏆</h1>
        <div className="stats">
          Total Participants: <strong>{participantCount}</strong>
        </div>

        {participantCount < 5 ? (
          <div className="waiting">
            ⏳ Waiting for more participants... ({participantCount}/5)
          </div>
        ) : (
          <table className="leaderboard">
            <thead>
              <tr><th>Rank</th><th>Username</th><th>Score</th></tr>
            </thead>
            <tbody>
              {rankings.map((rank, idx) => (
                <tr key={idx}>
                  <td>{idx === 0 && "🥇"} {idx === 1 && "🥈"} {idx === 2 && "🥉"} {idx + 1}</td>
                  <td><strong>{rank.username === username ? `${rank.username} (You)` : rank.username}</strong></td>
                  <td>{rank.score}/10</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("userId");
          localStorage.removeItem("username");
          navigate("/");
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}
