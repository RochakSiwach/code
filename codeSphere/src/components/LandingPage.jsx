import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import chat from "../assets/chat.png";
import editor from "../assets/Editor.png";

const featureContent = {
  chat: {
    title: "Real-Time Chat Collaboration",
    text: "Discuss ideas, share quick updates, and stay connected with your team while building together in the same room.",
    image: chat,
    alt: "Real-Time Chat Collaboration",
  },
  connections: {
    title: "Live Connections",
    text: "Join the same room code, start a live session, and work with video, chat, and shared context without switching tools.",
    image: chat,
    alt: "Live Connections",
  },
  code: {
    title: "Code Editor",
    text: "Use the integrated editor to write, review, and share code with a smoother collaborative workflow.",
    image: editor,
    alt: "Code Editor",
  },
};

const useCases = [
  {
    title: "Developers",
    subtitle: "Ship features faster",
    points: [
      "Build, debug, and review code together in real time.",
      "Collaborate with your team in one shared workspace.",
      "Reduce context switching between tools.",
    ],
  },
  {
    title: "Students",
    subtitle: "Learn together",
    points: [
      "Practice coding with classmates and friends.",
      "Work on assignments with instant discussion support.",
      "Understand problems better through shared sessions.",
    ],
  },
  {
    title: "Interviewers",
    subtitle: "Run cleaner interviews",
    points: [
      "Conduct live coding rounds in a structured room.",
      "See how candidates think and solve problems.",
      "Use chat, video, and code in one place.",
    ],
  },
];

const LandingPage = () => {
  const [view, setView] = useState("chat");
  const currentFeature = featureContent[view];

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-badge">Collaborative Coding Platform</p>
          <h1 className="landing-title">
            Code, chat and collaborate in one premium workspace.
          </h1>
          <p className="landing-description">
            Code Sphere helps developers, students, and interviewers work in
            the same room with chat, live collaboration, and a shared coding
            experience.
          </p>

          <div className="landing-actions">
            <div className="landing-input-card">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="landing-email-input"
              />
              <Link to="/signup" className="landing-primary-btn">
                Join now
              </Link>
            </div>

            <a
              href="https://github.com/RochakSiwach"
              className="landing-secondary-btn"
            >
              Our Source Code
            </a>
          </div>

          <div className="landing-tech-stack">
            <p>Built with</p>
            <div className="landing-tech-list">
              <a href="https://react.dev/">React.js</a>
              <a href="https://nodejs.org/en">Node.js</a>
              <a href="https://www.mongodb.com/">MongoDB</a>
              <a href="https://socket.io/">Socket.io</a>
            </div>
          </div>
        </div>

        <div className="landing-hero-panel">
          <div className="hero-panel-card">
            <p className="hero-panel-label">Live Room</p>
            <h3>Everything in one place</h3>
            <div className="hero-panel-grid">
              <div className="hero-metric-card">
                <span>Mode</span>
                <strong>Pair Session</strong>
              </div>
              <div className="hero-metric-card">
                <span>Tools</span>
                <strong>Chat + Code + Video</strong>
              </div>
              <div className="hero-metric-card">
                <span>Access</span>
                <strong>Room Code Join</strong>
              </div>
              <div className="hero-metric-card">
                <span>Use Case</span>
                <strong>Interview + Team Work</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="section-heading">
          <p className="section-badge">Features</p>
          <h2>Built for collaboration, not just coding.</h2>
        </div>

        <div className="feature-tabs">
          <button
            className={view === "chat" ? "feature-tab active" : "feature-tab"}
            onClick={() => setView("chat")}
          >
            Real-Time Chat
          </button>
          <button
            className={
              view === "connections" ? "feature-tab active" : "feature-tab"
            }
            onClick={() => setView("connections")}
          >
            Live Connections
          </button>
          <button
            className={view === "code" ? "feature-tab active" : "feature-tab"}
            onClick={() => setView("code")}
          >
            Code Editor
          </button>
        </div>

        <div className="feature-showcase">
          <div className="feature-copy">
            <p className="section-badge">Feature Spotlight</p>
            <h3>{currentFeature.title}</h3>
            <p>{currentFeature.text}</p>
          </div>

          <div className="feature-image-wrap">
            <img src={currentFeature.image} alt={currentFeature.alt} />
          </div>
        </div>
      </section>

      <section className="landing-usecases">
        <div className="section-heading">
          <p className="section-badge">Who Is It For</p>
          <h2>Made for people who build, learn, and evaluate together.</h2>
        </div>

        <div className="usecase-grid">
          {useCases.map((item) => (
            <article key={item.title} className="usecase-card">
              <p className="usecase-subtitle">{item.subtitle}</p>
              <h3>{item.title}</h3>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-card">
          <p className="section-badge">Start Today</p>
          <h2>Join Code Sphere and build together.</h2>
          <p>
            Create a room, invite people, and turn collaboration into a single
            smooth workflow.
          </p>
          <Link to="/developer" className="landing-primary-btn">
            Explore Workspace
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 Code Sphere</p>
        <div className="landing-footer-links">
          <a href="/about">About</a>
          <a href="/documentation">Docs</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
