// import React, { useState } from 'react'
// import { executeCode } from '../api';

// const Output = ({ language, editorRef }) => {
//   const [output, setOutput] = useState("");

//   const runCode = async () => {
//     const sourceCode = editorRef.current?.getValue();
//     if (!sourceCode) return;

//     try {
//       const response = await executeCode(language, sourceCode);
//       setOutput(response.run.output);
//     } catch (err) {
//       setOutput("Error running code");
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={runCode}>Run Code</button>

//       <div style={{ height: "90vh", width: "100%", whiteSpace: "pre-wrap" }}>
//         {output}
//       </div>
//     </div>
//   );
// };

// export default Output;


// import { useState } from "react";
// import { runProgram } from "../api";

// function Output({ editorRef, language }) {
//   const [output, setOutput] = useState("Run karoge to output yahan dikhega.");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleRunCode = async () => {
//     const sourceCode = editorRef.current?.getValue();

//     if (!sourceCode?.trim()) {
//       setError(true);
//       setOutput("Editor me code likho.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(false);

//       const result = await runProgram(language, sourceCode);
//       const outputText = result?.run?.output || "No output";
//       const stderr = result?.run?.stderr || "";

//       setError(Boolean(stderr));
//       setOutput(outputText);
//     } catch (err) {
//       setError(true);
//       setOutput(err.message || "Execution failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="output-panel">
//       <div className="output-topbar">
//         <h2>Output</h2>

//         <button className="run-btn" onClick={handleRunCode} disabled={loading}>
//           {loading ? "Running..." : "Run Code"}
//         </button>
//       </div>

//       <pre className={`output-box ${error ? "error" : ""}`}>{output}</pre>
//     </div>
//   );
// }

// export default Output;










//code mirror
import { useState } from "react";
import { runProgram } from "../api";

function Output({ language, code }) {
  const [output, setOutput] = useState("Run karoge to output yahan dikhega.");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleRunCode = async () => {
    if (!code || !code.trim()) {
      setError(true);
      setOutput("Editor me code likho.");
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const result = await runProgram(language, code);
      const outputText = result?.run?.output || "No output";
      const stderr = result?.run?.stderr || "";

      setError(Boolean(stderr));
      setOutput(stderr || outputText);
    } catch (err) {
      setError(true);
      setOutput(err?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="output-panel">
      <div className="output-topbar">
        <h2>Output</h2>
        <button className="run-btn" onClick={handleRunCode} disabled={loading}>
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      <pre className={`output-box ${error ? "error" : ""}`}>{output}</pre>
    </div>
  );
}

export default Output;