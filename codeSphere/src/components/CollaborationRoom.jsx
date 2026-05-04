import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Chat from "./Chat";
import VideoCallPanel from "./VideoCallPanel";
import LanguageSelector from "./code/components/LanguageSelector";
import CodeEditor, { STARTER_CODE } from "./code/components/CodeEditor";
import Output from "./code/components/Output";
import socket from "./socket";
import "./CollaborationRoom.css";

function CollaborationRoom({
  pageClassName,
  title,
  subtitle,
  roleLabel,
  roomPrefix,
  allowCodeToggle = false,
  defaultCodeEnabled = true,
  defaultCodeShared = true,
  showShareLink = true,
  showPrejoinCard = true,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRoomId = searchParams.get("room") || `${roomPrefix}-room`;
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(STARTER_CODE.javascript);
  const [roomIdInput, setRoomIdInput] = useState(initialRoomId);
  const [activeRoomId, setActiveRoomId] = useState(initialRoomId);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(Boolean(searchParams.get("room")));
  const [codeEnabled, setCodeEnabled] = useState(defaultCodeEnabled);
  const [codeShared, setCodeShared] = useState(defaultCodeShared);
  const isApplyingRemoteStateRef = useRef(false);

  const shareableLink = useMemo(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("room", activeRoomId);
    return url.toString();
  }, [activeRoomId]);

  useEffect(() => {
    if (!hasJoinedRoom) return;

    function handleCollaborationState(nextState) {
      isApplyingRemoteStateRef.current = true;
      setLanguage(nextState.language || "javascript");
      setCode(nextState.code || STARTER_CODE.javascript);
      setCodeEnabled(
        typeof nextState.codeEnabled === "boolean"
          ? nextState.codeEnabled
          : defaultCodeEnabled
      );
      setCodeShared(
        typeof nextState.codeShared === "boolean"
          ? nextState.codeShared
          : defaultCodeShared
      );

      window.setTimeout(() => {
        isApplyingRemoteStateRef.current = false;
      }, 0);
    }

    socket.emit("join-collaboration-room", {
      roomId: activeRoomId,
      initialState: {
        language,
        code,
        codeEnabled,
        codeShared,
      },
    });

    socket.on("collaboration-state", handleCollaborationState);

    return () => {
      socket.emit("leave-collaboration-room", { roomId: activeRoomId });
      socket.off("collaboration-state", handleCollaborationState);
    };
  }, [activeRoomId, hasJoinedRoom, defaultCodeEnabled, defaultCodeShared]);

  useEffect(() => {
    if (!hasJoinedRoom || isApplyingRemoteStateRef.current) return;

    socket.emit("sync-collaboration-state", {
      roomId: activeRoomId,
      updates: {
        language,
        code,
        codeEnabled,
        codeShared,
      },
    });
  }, [activeRoomId, hasJoinedRoom, language, code, codeEnabled, codeShared]);

  function handleLanguageChange(nextLanguage) {
    setLanguage(nextLanguage);
    setCode(STARTER_CODE[nextLanguage]);
  }

  function handleJoinRoom() {
    const nextRoomId = roomIdInput.trim() || `${roomPrefix}-room`;
    setActiveRoomId(nextRoomId);
    setSearchParams({ room: nextRoomId });
    setHasJoinedRoom(true);
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareableLink);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCodeRoundChange(nextValue) {
    setCodeEnabled(nextValue);
    if (!nextValue) {
      setCodeShared(false);
    }
  }

  function toggleCodeShare() {
    if (!codeEnabled) return;
    setCodeShared((prev) => !prev);
  }

  const showCodePanel = allowCodeToggle ? codeEnabled && codeShared : true;

  return (
    <main className={`room-page ${pageClassName || ""}`}>
      <section className="room-header">
        <div>
          <p className="section-label">{roleLabel}</p>
          <h1>{title}</h1>
          <p className="room-subtitle">{subtitle}</p>
        </div>

        <div className="room-summary">
          <div className="summary-box">
            <span>Room Code</span>
            <div className="room-id-row">
              <input
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                placeholder="Enter room code"
              />
              <button type="button" onClick={handleJoinRoom}>
                Join
              </button>
            </div>
            <p className="active-room-text">Active room: {activeRoomId}</p>
          </div>

          {showShareLink && (
            <div className="summary-box">
              <span>Share Link</span>
              <p className="share-link-text">{shareableLink}</p>
              <button
                type="button"
                className="summary-action"
                onClick={handleCopyLink}
              >
                Copy Invite Link
              </button>
            </div>
          )}

          {allowCodeToggle && (
            <div className="summary-box">
              <span>Interview Type</span>
              <div className="toggle-row">
                <label>
                  <input
                    type="radio"
                    checked={codeEnabled}
                    onChange={() => handleCodeRoundChange(true)}
                  />
                  Coding Round
                </label>
                <label>
                  <input
                    type="radio"
                    checked={!codeEnabled}
                    onChange={() => handleCodeRoundChange(false)}
                  />
                  Discussion Round
                </label>
              </div>
            </div>
          )}
        </div>
      </section>

      {!hasJoinedRoom && showPrejoinCard ? (
        <section className="prejoin-card">
          <div className="prejoin-left">
            <p className="section-label">Pre Join</p>
            <h2>Anyone can join with the same room code.</h2>
            <p>
              Enter a room code and join the session. Once connected, room
              members can access video, chat, and shared coding features based
              on the selected workflow.
            </p>
            <ul className="prejoin-list">
              <li>The same room code opens the same meeting and chat.</li>
              <li>In interviewer mode, the coding view appears only when the coding round is enabled and code sharing is started.</li>
              <li>In developer mode, the coding workspace remains available by default.</li>
            </ul>
          </div>

          <div className="prejoin-right">
            <div className="prejoin-preview">
              <p className="section-label">Preview</p>
              <div className="preview-box">
                The camera preview will appear after you join the meeting.
              </div>
            </div>
          </div>
        </section>
      ) : hasJoinedRoom ? (
        <section className="room-grid">
          <div className="room-main">
            <VideoCallPanel roomId={activeRoomId} />

            <div className="room-panel">
              <div className="panel-head">
                <div>
                  <p className="section-label">Coding Area</p>
                  <h2>
                    {allowCodeToggle
                      ? "Shared coding screen"
                      : "Collaborative code workspace"}
                  </h2>
                </div>

                <div className="panel-actions">
                  <LanguageSelector
                    language={language}
                    setLanguage={handleLanguageChange}
                  />
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={toggleCodeShare}
                    disabled={!codeEnabled}
                  >
                    {codeShared ? "Stop Code Share" : "Share Code Screen"}
                  </button>
                </div>
              </div>

              {!codeEnabled && allowCodeToggle && (
                <div className="code-placeholder">
                  The discussion round is active, so the coding screen is hidden.
                </div>
              )}

              {codeEnabled && !showCodePanel && allowCodeToggle && (
                <div className="code-placeholder">
                  The coding round is enabled. The shared coding screen will
                  appear for everyone once a participant starts code sharing.
                </div>
              )}

              {showCodePanel && (
                <>
                  <div className="room-editor">
                    <CodeEditor
                      language={language}
                      code={code}
                      setCode={setCode}
                    />
                  </div>

                  <div className="room-output">
                    <Output language={language} code={code} />
                  </div>
                </>
              )}
            </div>
          </div>

          <aside className="room-side">
            <div className="room-panel">
              <div className="panel-head">
                <div>
                  <p className="section-label">Team Chat</p>
                  <h2>Chat portal</h2>
                </div>
              </div>

              <div className="room-chat">
                <Chat roomId={activeRoomId} />
              </div>
            </div>
          </aside>
        </section>
      ) : null}
    </main>
  );
}

export default CollaborationRoom;
