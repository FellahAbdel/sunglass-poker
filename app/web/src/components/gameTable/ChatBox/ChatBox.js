import React, { useState } from 'react';
import './ChatBox.css'; // Assurez-vous que le chemin vers le fichier CSS est correct

const ChatBox = ({ isVisible, closeChat, message, setMessage }) => {
  const handleSendMessage = () => {
    // Logique d'envoi de message
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    isVisible && (
      <div className="chatBoxContainer">
        <button onClick={closeChat}>Close</button>
        <div className="messagesContainer">
          {/* Affichage des messages */}
        </div>
        <input
          type="text"
          className="chatInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    )
  );
};

export default ChatBox;
