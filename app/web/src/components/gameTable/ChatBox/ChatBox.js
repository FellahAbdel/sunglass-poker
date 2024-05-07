// ChatBox.js
import React, { useState } from 'react';
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import './ChatBox.css';

const ChatBox = ({ isGameTableVisible }) => {
    const [isChatOpen, setisChatOpen] = useState(false);
    const handleChatOpen = () => setisChatOpen(true);
    const handleChatClose = () => setisChatOpen(false);
    const [message, setMessage] = useState("");

    if (!isGameTableVisible) return null;

    return (
        <div className={`chatBox-V2 ${isChatOpen ? "chatBoxOpen-V2" : ""}`}>
            {!isChatOpen ? (
                <Button
                    label={""}
                    onClick={handleChatOpen}
                    iconSrc={require("../assets/images/icons/white/chat.png")}
                />
            ) : (
                <>
                    <img
                        className="btn-chatClose-V2"
                        onClick={handleChatClose}
                        src={require("../assets/images/icons/white/cross.png")}
                        alt="exit-chat"
                    />
                    <TextInputComponent
                        name="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Messages"
                        styleClass="input-chatBox-V2"
                    />
                </>
            )}
        </div>
    );
};

export default ChatBox;
