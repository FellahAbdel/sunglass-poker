import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = ({ isVisible, closeChat, message, setMessage }) => {
  const handleSendMessage = () => {
    // Logic for sending message
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    isVisible && (
      <div className="chatBoxContainer">
        <div className="chatBoxHeader">
          <button onClick={closeChat} className="chatCloseButton">X</button>
        </div>
        <div className="messagesContainer">
          {/* Dynamic list of messages will be displayed here */}
        </div>
        <input
          type="text"
          className="chatInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} className="sendButton">Send</button>
      </div>
    )
  );
};

export default ChatBox;
