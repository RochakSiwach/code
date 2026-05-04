import React from "react";
import Chat from "./Chat";
import "./ChatPortal.css";

const ChatPortal = () => {
  return (
    <main className="chat-portal-page">
      <section className="chat-portal-hero">
        <div>
          <p className="chat-portal-badge">Chat Portal</p>
          <h1>Stay in sync with your team in real time.</h1>
          <p className="chat-portal-subtitle">
            Use the chat portal to share updates, ask quick questions, and keep
            every conversation in one focused workspace.
          </p>
        </div>

        <div className="chat-portal-stats">
          <div className="chat-portal-stat-card">
            <span>Mode</span>
            <strong>Live Messaging</strong>
          </div>
          <div className="chat-portal-stat-card">
            <span>Access</span>
            <strong>Room Based</strong>
          </div>
        </div>
      </section>

      <section className="chat-portal-shell">
        <div className="chat-portal-card">
          <div className="chat-portal-card-header">
            <div>
              <p className="chat-portal-section-label">Conversation</p>
              <h2>Team Chat Workspace</h2>
            </div>
            <span className="chat-portal-pill">Realtime</span>
          </div>

          <div className="chat-portal-chat-wrap">
            <Chat roomId="chat-portal" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChatPortal;
