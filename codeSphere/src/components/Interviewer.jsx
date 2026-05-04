import React from "react";
import CollaborationRoom from "./CollaborationRoom";
import "./Interviewer.css";

const Interviewer = () => {
  return (
    <CollaborationRoom
      pageClassName="interviewer-page"
      roleLabel="Interviewer Room"
      title="Structured interview room with flexible collaboration"
      subtitle="Use video and chat throughout the interview, and enable the coding round only when you want candidates to work on a shared coding task."
      roomPrefix="interview"
      allowCodeToggle={true}
      defaultCodeEnabled={true}
      showPrejoinCard={false}
    />
  );
};

export default Interviewer;
