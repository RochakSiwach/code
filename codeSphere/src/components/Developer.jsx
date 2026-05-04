import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import './Developer.css';
import LanguageSelector from './code/components/LanguageSelector';
import CodeEditor, { STARTER_CODE } from './code/components/CodeEditor';
import Output from './code/components/Output';

const Developer = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(STARTER_CODE.javascript);

  useEffect(() => {
    setCode(STARTER_CODE[language]);
  }, [language]);

  return (
    <main className="developer-page">
      <div className="developer-backdrop developer-backdrop-one" />
      <div className="developer-backdrop developer-backdrop-two" />

      <section className="developer-hero">
        <div>
          <p className="developer-eyebrow">Collaborative Workspace</p>
          <h1>Build, run and discuss code in one focused developer room.</h1>
          <p className="developer-subtitle">
            Keep your editor on the left and live team chat on the right,
            creating a premium developer workspace that helps you stay focused
            and ship faster without breaking flow.
          </p>
        </div>

        <div className="developer-stats">
          <div className="developer-stat-card">
            <span>Language</span>
            <strong>{language}</strong>
          </div>
          <div className="developer-stat-card">
            <span>Mode</span>
            <strong>Pair Programming</strong>
          </div>
        </div>
      </section>

      <section className="developer-workspace">
        <div className="developer-panel developer-editor-panel">
          <div className="developer-panel-header">
            <div>
              <p className="developer-panel-kicker">Code Studio</p>
              <h2>Editor Playground</h2>
            </div>
            <LanguageSelector
              language={language}
              setLanguage={setLanguage}
            />
          </div>

          <div className="developer-editor-shell">
            <CodeEditor
              language={language}
              code={code}
              setCode={setCode}
            />
          </div>

          <div className="developer-output-shell">
            <Output language={language} code={code} />
          </div>
        </div>

        <aside className="developer-panel developer-chat-panel">
          <div className="developer-panel-header">
            <div>
              <p className="developer-panel-kicker">Team Channel</p>
              <h2>Live Chat</h2>
            </div>
            <span className="developer-badge">Realtime</span>
          </div>

          <div className="developer-chat-shell">
            <Chat />
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Developer;
