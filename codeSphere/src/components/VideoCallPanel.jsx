import { useEffect, useRef, useState } from "react";
import socket from "./socket";

function VideoCallPanel({ roomId }) {
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef(new Map());
  const pendingCandidatesRef = useRef(new Map());

  const [callJoined, setCallJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [status, setStatus] = useState("Join call to start meeting.");
  const [remoteVideos, setRemoteVideos] = useState([]);
  const [participantIds, setParticipantIds] = useState([]);
  const [selfId, setSelfId] = useState("");

  useEffect(() => {
    async function handleRoomUsers({ peerIds, selfId: nextSelfId }) {
      setSelfId(nextSelfId || "");

      for (const peerId of peerIds) {
        await createOffer(peerId);
      }

      if (peerIds.length === 0) {
        setStatus("Joined room. Waiting for others...");
      }
    }

    function handleUserJoined() {
      setStatus("A new user joined the room.");
    }

    function handleParticipants({ peerIds }) {
      setParticipantIds(peerIds);
    }

    async function handleOffer({ from, offer }) {
      await ensureLocalStream();
      const connection = getOrCreateConnection(from);
      await connection.setRemoteDescription(new RTCSessionDescription(offer));
      await flushPendingCandidates(from);

      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);

      socket.emit("video-answer", {
        target: from,
        answer,
      });

      setStatus("Connected to meeting.");
    }

    async function handleAnswer({ from, answer }) {
      const connection = peerConnectionsRef.current.get(from);
      if (!connection) return;

      await connection.setRemoteDescription(new RTCSessionDescription(answer));
      await flushPendingCandidates(from);
      setStatus("Connected to meeting.");
    }

    async function handleIceCandidate({ from, candidate }) {
      if (!candidate) return;

      const connection = peerConnectionsRef.current.get(from);

      if (!connection || !connection.remoteDescription) {
        queueCandidate(from, candidate);
        return;
      }

      try {
        await connection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.log(error);
      }
    }

    function handlePeerLeft({ peerId }) {
      removePeer(peerId);
      setStatus("A participant left the meeting.");
    }

    socket.on("video-room-users", handleRoomUsers);
    socket.on("video-participants", handleParticipants);
    socket.on("video-user-joined", handleUserJoined);
    socket.on("video-offer", handleOffer);
    socket.on("video-answer", handleAnswer);
    socket.on("video-ice-candidate", handleIceCandidate);
    socket.on("video-peer-left", handlePeerLeft);

    return () => {
      socket.off("video-room-users", handleRoomUsers);
      socket.off("video-participants", handleParticipants);
      socket.off("video-user-joined", handleUserJoined);
      socket.off("video-offer", handleOffer);
      socket.off("video-answer", handleAnswer);
      socket.off("video-ice-candidate", handleIceCandidate);
      socket.off("video-peer-left", handlePeerLeft);
    };
  }, []);

  useEffect(() => {
    return () => {
      leaveCall();
    };
  }, [roomId]);

  function queueCandidate(peerId, candidate) {
    const current = pendingCandidatesRef.current.get(peerId) || [];
    current.push(candidate);
    pendingCandidatesRef.current.set(peerId, current);
  }

  async function flushPendingCandidates(peerId) {
    const connection = peerConnectionsRef.current.get(peerId);
    const queued = pendingCandidatesRef.current.get(peerId) || [];

    for (const candidate of queued) {
      try {
        await connection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.log(error);
      }
    }

    pendingCandidatesRef.current.delete(peerId);
  }

  function updateRemoteVideo(peerId, stream) {
    setRemoteVideos((prev) => {
      const filtered = prev.filter((item) => item.peerId !== peerId);
      return [...filtered, { peerId, stream }];
    });
  }

  function removePeer(peerId) {
    const connection = peerConnectionsRef.current.get(peerId);

    if (connection) {
      connection.ontrack = null;
      connection.onicecandidate = null;
      connection.close();
      peerConnectionsRef.current.delete(peerId);
    }

    pendingCandidatesRef.current.delete(peerId);
    setRemoteVideos((prev) => prev.filter((item) => item.peerId !== peerId));
  }

  function getOrCreateConnection(peerId) {
    const existingConnection = peerConnectionsRef.current.get(peerId);
    if (existingConnection) return existingConnection;

    const connection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    localStreamRef.current?.getTracks().forEach((track) => {
      connection.addTrack(track, localStreamRef.current);
    });

    connection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      updateRemoteVideo(peerId, remoteStream);
      setStatus("Connected to meeting.");
    };

    connection.onicecandidate = (event) => {
      if (!event.candidate) return;

      socket.emit("video-ice-candidate", {
        target: peerId,
        candidate: event.candidate,
      });
    };

    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "failed") {
        setStatus("Connection failed. Please rejoin call.");
      }

      if (
        connection.connectionState === "closed" ||
        connection.connectionState === "disconnected"
      ) {
        removePeer(peerId);
      }
    };

    peerConnectionsRef.current.set(peerId, connection);
    return connection;
  }

  async function createOffer(peerId) {
    const connection = getOrCreateConnection(peerId);
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    socket.emit("video-offer", {
      target: peerId,
      offer,
    });
  }

  async function ensureLocalStream() {
    if (localStreamRef.current) return localStreamRef.current;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      localVideoRef.current.play().catch(() => {});
    }

    return stream;
  }

  async function joinCall() {
    try {
      await ensureLocalStream();
      socket.emit("join-video-room", { roomId });
      setCallJoined(true);
      setStatus("Joining meeting...");
    } catch (error) {
      setStatus("Camera aur mic permission allow karo.");
    }
  }

  function stopLocalTracks() {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
  }

  function leaveCall() {
    socket.emit("leave-video-room", { roomId });

    peerConnectionsRef.current.forEach((_, peerId) => {
      removePeer(peerId);
    });

    stopLocalTracks();
    setRemoteVideos([]);
    setParticipantIds([]);
    setSelfId("");
    setCallJoined(false);
    setMicOn(true);
    setCameraOn(true);
    setStatus("Call ended.");
  }

  function toggleTrack(kind) {
    const stream = localStreamRef.current;
    if (!stream) return;

    const track = stream.getTracks().find((item) => item.kind === kind);
    if (!track) return;

    track.enabled = !track.enabled;

    if (kind === "audio") {
      setMicOn(track.enabled);
    }

    if (kind === "video") {
      setCameraOn(track.enabled);
    }
  }

  return (
    <div className="video-panel">
      <div className="panel-head">
        <div>
          <p className="section-label">Meeting Room</p>
          <h2>Video call</h2>
        </div>
        <span className="room-pill">{roomId}</span>
      </div>

      <p className="video-status">{status}</p>

      <div className="participant-strip">
        {(participantIds.length > 0 ? participantIds : selfId ? [selfId] : []).map(
          (participantId, index) => (
            <div key={participantId} className="participant-chip">
              {participantId === selfId ? "You" : `Participant ${index + 1}`}
            </div>
          )
        )}
      </div>

      <div className="video-grid">
        <div className="video-card">
          <p>You</p>
          <video ref={localVideoRef} autoPlay muted playsInline />
        </div>

        {remoteVideos.length === 0 && (
          <div className="video-card empty-video-card">
            <p>Participant</p>
            <div className="video-placeholder">
              {participantIds.length > 1
                ? "Participant joined hai. Video stream connect ho rahi hai..."
                : "Waiting for another person..."}
            </div>
          </div>
        )}

        {remoteVideos.map((item) => (
          <div key={item.peerId} className="video-card">
            <p>Participant</p>
            <video
              autoPlay
              playsInline
              ref={(node) => {
                if (node && node.srcObject !== item.stream) {
                  node.srcObject = item.stream;
                  node.play().catch(() => {});
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="meeting-footer">
        <div className="meeting-count">
          Participants: {participantIds.length || (callJoined ? 1 : 0)}
        </div>

        <div className="video-actions">
          {!callJoined ? (
            <button type="button" onClick={joinCall}>
              Join Call
            </button>
          ) : (
            <button type="button" onClick={leaveCall}>
              Leave Call
            </button>
          )}

          <button
            type="button"
            onClick={() => toggleTrack("audio")}
            disabled={!callJoined}
          >
            {micOn ? "Mute Mic" : "Unmute Mic"}
          </button>

          <button
            type="button"
            onClick={() => toggleTrack("video")}
            disabled={!callJoined}
          >
            {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCallPanel;
