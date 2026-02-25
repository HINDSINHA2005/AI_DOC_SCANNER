// import { useState } from "react";
// import { uploadFile, askQuestion } from "./api";
// import "./App.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await uploadFile(formData);
//       alert(res.message);
//       setUploaded(true);
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAsk = async () => {
//     if (!question) return;

//     try {
//       setLoading(true);
//       const res = await askQuestion(question);
//       setAnswer(res.answer);
//     } catch (err) {
//       alert("Error getting answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1>AI Document Assistant</h1>

//         {/* Upload Section */}
//         <div className="section">
//           <h3>Upload PDF / DOCX</h3>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button onClick={handleUpload}>
//             Upload File
//           </button>
//         </div>

//         {/* Question Section */}
//         {uploaded && (
//           <div className="section">
//             <h3>Ask Question</h3>
//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             />
//             <button onClick={handleAsk}>
//               Ask
//             </button>
//           </div>
//         )}

//         {/* Loading */}
//         {loading && <p className="loading">Processing...</p>}

//         {/* Answer */}
//         {answer && (
//           <div className="answer-box">
//             <h3>Answer:</h3>
//             <p>{answer}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useState } from "react";
// import { uploadFile, askQuestion } from "./api";
// import "./App.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await uploadFile(formData);
//       alert(res.message || "File uploaded successfully");
//       setUploaded(true);
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAsk = async () => {
//     if (!question.trim()) return;

//     try {
//       setLoading(true);
//       const res = await askQuestion(question);
//       setAnswer(res.answer);
//     } catch (err) {
//       alert("Error getting answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1>AI Document Assistant</h1>

//         {/* Upload Section */}
//         <div className="section">
//           <h3>Upload PDF / DOCX</h3>

//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setFile(e.target.files[0])}
//             disabled={loading}
//           />

//           <button onClick={handleUpload} disabled={loading}>
//             {loading && !uploaded ? "Scanning..." : "Upload File"}
//           </button>
//         </div>

//         {/* Question Section */}
//         {uploaded && (
//           <div className="section">
//             <h3>Ask Question</h3>

//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               disabled={loading}
//             />

//             <button onClick={handleAsk} disabled={loading}>
//               {loading && uploaded ? "Thinking..." : "Ask"}
//             </button>
//           </div>
//         )}

//         {/* Scan Animation */}
//         {loading && (
//           <div className="scan-wrapper">
//             <div className="scan-doc">
//               <div className="scan-line"></div>
//             </div>
//             <p className="loading-text">
//               {uploaded ? "Analyzing question..." : "Scanning document..."}
//             </p>
//           </div>
//         )}

//         {/* Answer */}
//         {answer && !loading && (
//           <div className="answer-box">
//             <h3>Answer:</h3>
//             <p>{answer}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


// import { useState, useRef, useEffect } from "react";
// import { uploadFile, askQuestion } from "./api";
// import "./App.css";

// function App() {
//   const [file, setFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploaded, setUploaded] = useState(false);
//   const chatEndRef = useRef(null);

//   // Auto scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const res = await uploadFile(formData);

//       setMessages((prev) => [
//         ...prev,
//         { role: "system", content: "Document uploaded successfully ✅" },
//       ]);

//       setUploaded(true);
//     } catch (err) {
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAsk = async () => {
//     if (!question.trim()) return;

//     const userMessage = { role: "user", content: question };
//     setMessages((prev) => [...prev, userMessage]);
//     setQuestion("");

//     try {
//       setLoading(true);
//       const res = await askQuestion(question);

//       const aiMessage = { role: "ai", content: res.answer };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (err) {
//       alert("Error getting answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <h2>AI Doc Assistant</h2>

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <button onClick={handleUpload} disabled={loading}>
//           Upload Document
//         </button>
//       </div>

//       <div className="chat-container">
//         <div className="chat-box">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 msg.role === "user" ? "user" : "ai"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}

//           {loading && (
//             <div className="message ai typing">
//               Typing...
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         {uploaded && (
//           <div className="input-area">
//             <input
//               type="text"
//               placeholder="Ask something about the document..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleAsk()}
//             />
//             <button onClick={handleAsk} disabled={loading}>
//               Send
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState, useRef, useEffect } from "react";
import { uploadFile, askQuestion } from "./api";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleUpload = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await uploadFile(formData);

      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Document uploaded successfully ✅" },
      ]);

      setUploaded(true);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMsg = { role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");

    try {
      setLoading(true);
      const res = await askQuestion(question);

      const aiMsg = { role: "ai", content: res.answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      alert("Error getting answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>AI Doc Assistant</h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Scanning..." : "Upload Document"}
        </button>

        {/* SCANNING ANIMATION */}
        {uploading && (
          <div className="scan-wrapper">
            <div className="scan-doc">
              <div className="scan-line"></div>
            </div>
            <p className="loading-text">Scanning document...</p>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="message ai typing">Analyzing...</div>
          )}

          <div ref={chatEndRef} />
        </div>

        {uploaded && (
          <div className="input-area">
            <input
              type="text"
              placeholder="Ask about the document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <button onClick={handleAsk} disabled={loading}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;