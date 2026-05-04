import { useEffect, useState } from "react";
import "./index.css";
import LanguageSelector from "./components/LanguageSelector";
import CodeEditor, { STARTER_CODE } from "./components/CodeEditor";
import Output from "./components/Output";

function EditorApp() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(STARTER_CODE.javascript);

  useEffect(() => {
    setCode(STARTER_CODE[language]);
  }, [language]);

  return (
    <div className="code-page">
      <div className="code-header">
        <div>
          <p className="code-tag">Code Editor</p>
          <h1>Online Coding Platform</h1>
          <p className="code-subtitle">
            Monaco editor ke saath code likho aur JavaScript browser me run
            karo.
          </p>
        </div>
      </div>

      <div className="code-layout">
        <div className="editor-panel">
          <div className="editor-toolbar">
            <h2>Write Code</h2>
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />
          </div>

          <CodeEditor
            language={language}
            code={code}
            setCode={setCode}
          />
        </div>

        <Output
          language={language}
          code={code}
        />
      </div>
    </div>
  );
}

export default EditorApp;
