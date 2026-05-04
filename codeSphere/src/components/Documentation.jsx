import React from "react";
import "./Documentation.css";

const docs = [
  {
    id: "chapter-1",
    heading: "Chapter 1 - Software Project Planning",
    sections: [
      {
        title: "1. System Overview",
        content:
          "Code Sphere is a web-based collaborative coding platform designed to let multiple users work together in a shared environment. It combines coding, communication, and collaboration features in one place so developers and students can work on projects in real time.",
        subpoints: [
          {
            subTitle: "Main Features",
            items: [
              "Real-time collaborative code editing",
              "Instant team chat",
              "Video and audio communication",
              "File sharing support",
              "Room-based collaboration",
            ],
          },
          {
            subTitle: "Primary Users",
            items: ["Students", "Developers", "Teams and organizations"],
          },
        ],
      },
      {
        title: "2. Data Collection",
        content:
          "The project was planned after reviewing existing collaboration tools and communication technologies that support real-time interaction.",
        subpoints: [
          {
            subTitle: "GitHub Collaboration Tools",
            items: [
              "Studied version control workflows and project collaboration patterns.",
            ],
          },
          {
            subTitle: "Online Coding Platforms",
            items: [
              "Reviewed tools such as CodePen and Replit to understand real-time coding interactions and interface design.",
            ],
          },
          {
            subTitle: "WebRTC Documentation",
            items: [
              "Used to understand video and audio communication in the browser.",
            ],
          },
          {
            subTitle: "Socket.IO Documentation",
            items: [
              "Used to understand real-time events for chat and shared code synchronization.",
            ],
          },
        ],
      },
      {
        title: "3. Tools and Platforms",
        content:
          "The platform is designed with modern web technologies that support collaboration, scalability, and responsive user experiences.",
        subpoints: [
          {
            subTitle: "Minimum Hardware Requirements",
            items: ["4 GB RAM", "20 GB free disk space", "Intel i3 or higher"],
          },
          {
            subTitle: "Supported Operating Systems",
            items: ["Windows", "Linux", "macOS"],
          },
          {
            subTitle: "Frontend Stack",
            items: ["HTML", "CSS", "JavaScript", "React.js"],
          },
          {
            subTitle: "Backend Stack",
            items: ["Node.js", "Express.js"],
          },
          {
            subTitle: "Database",
            items: ["MongoDB"],
          },
          {
            subTitle: "Real-Time Technologies",
            items: ["Socket.IO", "WebRTC"],
          },
          {
            subTitle: "Security",
            items: ["JWT-based authentication"],
          },
        ],
      },
      {
        title: "4. Project Planning",
        content:
          "The project plan is divided into focused phases to ensure a structured development process and timely delivery.",
        subpoints: [
          {
            subTitle: "Major Development Phases",
            items: [
              "UI design and layout planning",
              "Backend setup and API preparation",
              "Real-time integration with Socket.IO",
              "Communication setup using WebRTC",
              "Testing and validation of core workflows",
            ],
          },
        ],
      },
      {
        title: "5. Methodology",
        content:
          "The platform follows an Agile Software Development Life Cycle approach. Agile supports iterative development, quick feedback cycles, continuous testing, and frequent improvements.",
        subpoints: [
          {
            subTitle: "Why Agile Fits This Project",
            items: [
              "Supports rapid iteration",
              "Allows continuous testing and refinement",
              "Works well for real-time collaboration features that require repeated improvement",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chapter-2",
    heading: "Chapter 2 - Software Requirement Specification",
    sections: [
      {
        title: "1. Information System Description",
        content:
          "Code Sphere is a collaborative web application that accepts room requests, code updates, and chat messages from users, processes them through the server, and returns synchronized outputs to connected participants.",
        subpoints: [
          {
            subTitle: "External Entities",
            items: ["User or Developer", "Administrator"],
          },
          {
            subTitle: "Core System Modules",
            items: [
              "Authentication",
              "Room management",
              "Code editor",
              "Chat module",
              "Video communication",
              "Reporting",
            ],
          },
          {
            subTitle: "Data Stores",
            items: ["User database", "Room database", "Message database"],
          },
        ],
      },
      {
        title: "2. Product Features",
        content:
          "The system is designed around a set of collaboration-focused features that support coding, communication, and room management.",
        subpoints: [
          {
            subTitle: "Main Features",
            items: [
              "User authentication",
              "Room creation and joining",
              "Real-time code editing",
              "Instant chat communication",
              "Video communication support",
              "Activity and reporting workflows",
            ],
          },
        ],
      },
      {
        title: "3. Input and Output Elements",
        content:
          "The application takes structured input from users and transforms it into synchronized collaboration outputs.",
        subpoints: [
          {
            subTitle: "Input Examples",
            items: [
              "Registration details such as name, email, and password",
              "Login credentials",
              "Room creation details",
              "Code text and selected language",
              "Chat messages",
            ],
          },
          {
            subTitle: "Output Examples",
            items: [
              "Synchronized code updates",
              "Delivered chat messages",
              "Room activity information",
              "Generated reports",
            ],
          },
        ],
      },
      {
        title: "4. Procedures and Rules",
        content:
          "The application relies on a set of rules that convert user actions into secure and synchronized system responses.",
        subpoints: [
          {
            subTitle: "System Rules",
            items: [
              "Only authenticated users can create or join rooms",
              "Code changes must be synchronized across participants",
              "Chat messages must be delivered instantly to the correct room",
              "System activity can be processed into reports",
            ],
          },
        ],
      },
      {
        title: "5. Product Constraints",
        content:
          "The system must operate within technical and user-environment constraints that affect reliability and performance.",
        subpoints: [
          {
            subTitle: "Constraints",
            items: [
              "Requires a stable internet connection",
              "Must work on modern browsers such as Chrome, Edge, and Firefox",
              "Relies on Socket.IO and WebRTC for real-time features",
              "Performance may be limited on lower-end hardware",
              "Must protect user data through secure authentication",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "chapter-3",
    heading: "Chapter 3 - System Design",
    sections: [
      {
        title: "1. Data Flow Diagram",
        content:
          "The Data Flow Diagram explains how data enters the system, how it is processed, and how it is returned as useful output for participants.",
        subpoints: [
          {
            subTitle: "Level 0 DFD",
            items: [
              "Represents Code Sphere as one central process",
              "Shows interactions between users, administrators, and the system",
            ],
          },
          {
            subTitle: "Level 1 DFD",
            items: [
              "Breaks the platform into major processes such as authentication, room management, code editing, chat, video, and reporting",
            ],
          },
          {
            subTitle: "Level 2 DFD",
            items: [
              "Explains the internal flow of authentication, room creation, code synchronization, chat delivery, and video sessions",
            ],
          },
        ],
      },
      {
        title: "2. Entity Relationship Design",
        content:
          "The ER structure models the relationships between users, rooms, messages, code sessions, and reports inside the database layer.",
        subpoints: [
          {
            subTitle: "Core Entities",
            items: ["User", "Room", "Message", "Code Session", "Report"],
          },
          {
            subTitle: "Key Relationships",
            items: [
              "A user creates or joins rooms",
              "A room contains messages",
              "A room contains code sessions",
              "Reports are linked to user activity",
            ],
          },
        ],
      },
      {
        title: "3. Database Specification",
        content:
          "The database stores platform data in structured collections for users, rooms, messages, code sessions, and reports.",
        subpoints: [
          {
            subTitle: "Main Collections",
            items: [
              "users",
              "rooms",
              "messages",
              "code_sessions",
              "reports",
            ],
          },
          {
            subTitle: "Stored Information",
            items: [
              "User identity and role data",
              "Room metadata",
              "Message content and timestamps",
              "Shared code content and language",
              "Activity and reporting history",
            ],
          },
        ],
      },
      {
        title: "4. Validation Specification",
        content:
          "Validation rules are required to maintain correctness, completeness, and security across all main user flows.",
        subpoints: [
          {
            subTitle: "Validation Rules",
            items: [
              "Registration fields must be complete and valid",
              "Login credentials must match stored records",
              "Room information must be valid before access is granted",
              "Code synchronization should not accept empty submissions",
              "Empty chat messages should be blocked",
              "Only valid users should enter video sessions or access reports",
            ],
          },
        ],
      },
    ],
  },
];

const Documentation = () => {
  return (
    <div className="docs-page">
      <section className="docs-hero">
        <p className="docs-badge">Documentation</p>
        <h1 className="docs-title">Code Sphere Product Documentation</h1>
        <p className="docs-description">
          This documentation provides a structured overview of the platform,
          including planning, requirements, system design, and operational
          rules for collaboration features.
        </p>
      </section>

      <div className="docs-chapter-list">
        {docs.map((chapter) => (
          <section key={chapter.id} className="docs-chapter-card">
            <div className="docs-chapter-header">
              <p className="docs-badge">Chapter</p>
              <h2>{chapter.heading}</h2>
            </div>

            <div className="docs-section-list">
              {chapter.sections.map((section) => (
                <article key={section.title} className="docs-section-card">
                  <h3 className="docs-section-title">{section.title}</h3>
                  <p className="docs-section-text">{section.content}</p>

                  <div className="docs-subpoint-grid">
                    {section.subpoints.map((subpoint) => (
                      <div key={subpoint.subTitle} className="docs-subpoint-card">
                        <h4>{subpoint.subTitle}</h4>
                        <ul>
                          {subpoint.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
