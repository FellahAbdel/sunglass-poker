import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Button from "./Button"; // Remplacez avec le bon chemin d'importation
import TextInputComponent from "./TextInputComponent"; // Remplacez avec le bon chemin d'importation

const ChatBox = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Initialiser la connexion Socket.IO
    const newSocket = io("http://localhost:3000"); // Assurez-vous que l'URL du serveur est correcte
    setSocket(newSocket);

    // Écoutez les messages entrants
    newSocket.on("chatMessage", (newMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Nettoyez la connexion lorsque le composant est démonté
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chatMessage", message); // Envoyer le message au serveur
      setMessage(""); // Réinitialiser le champ de saisie
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p> // Afficher chaque message
        ))}
      </div>
      <TextInputComponent
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Mettre à jour l'état du message
        placeholder="Tapez votre message ici"
        className="input-chatbox"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage(); // Envoyer le message si l'utilisateur appuie sur Entrée
          }
        }}
      />
      <Button label="Envoyer" onClick={sendMessage} /> {/* Bouton pour envoyer */}
    </div>
  );
};

export default ChatBox;
