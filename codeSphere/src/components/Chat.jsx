
import { useState, useEffect } from 'react';
import './chat.css';
import socket from './socket';

export default function Chat({ roomId = 'global-room' }) {
    const [userName, setUserName] = useState('');
    const [showNamePopup, setShowNamePopup] = useState(true);
    const [inputName, setInputName] = useState('');
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        socket.emit('join_chat_room', roomId);

        socket.on('chat-history', (data) => {
            if (data.roomId !== roomId) return;

            setMessages(
                (data.messages || []).map((message, index) => ({
                    ...message,
                    id: `${message.ts || Date.now()}-${index}`,
                }))
            );
        });

        socket.on('receive_message', (data) => {
            setMessages((prev) => [
                ...prev,
                { ...data, id: Date.now() }
            ]);
        });

        return () => {
            socket.emit('leave_chat_room', roomId);
            socket.off('chat-history');
            socket.off('receive_message');
        };
    }, [roomId]);

    function formatTime(ts) {
        const d = new Date(ts);
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    }

    function handleNameSubmit(e) {
        e.preventDefault();
        if (!inputName.trim()) return;

        setUserName(inputName);
        setShowNamePopup(false);
    }

    function sendMessage() {
        if (!text.trim()) return;

        const msg = {
            sender: userName,
            text: text,
            ts: Date.now(),
            roomId,
        };

        socket.emit('send_message', msg);
        setText('');
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    function getInitials(name) {
        return (name || '?').trim().slice(0, 1).toUpperCase();
    }

    return (
        <div className="app-shell">
            {showNamePopup && (
                <div className="name-popup-overlay">
                    <div className="name-popup">
                        <h1>Enter your name</h1>
                        <form onSubmit={handleNameSubmit}>
                            <input
                                autoFocus
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder="Your name"
                            />
                            <button type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            )}

            {!showNamePopup && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div>
                            <p className="chat-title">Room Chat</p>
                            <small>{roomId}</small>
                        </div>
                        <div className="chat-user-chip">
                            <span>{getInitials(userName)}</span>
                            <b>{userName}</b>
                        </div>
                    </div>

                    <div className="chat-message-list">
                        {messages.map((m) => {
                            const mine = m.sender === userName;

                            return (
                                <div
                                    key={m.id}
                                    className={mine ? 'mine' : 'other'}
                                >
                                    {!mine && (
                                        <div className="message-avatar">
                                            {getInitials(m.sender)}
                                        </div>
                                    )}
                                    <div className="bubble">
                                        {!mine && (
                                            <div className="message-sender">
                                                {m.sender}
                                            </div>
                                        )}
                                        <div>{m.text}</div>
                                        <small>
                                            {formatTime(m.ts)}
                                        </small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="chat-input">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
