import React, { useState } from "react";
import "./ChatBox.css";
import Button from "../button/Button.tsx";
import TextInputComponent from "../textInput/TextInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/clientInteractionsCreator.js";

const ChatBox = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            dispatch(actions.sendMessage(newMessage));
            setNewMessage("");
        }
    };

    return (
        <div className={`chatBox-V2 ${isOpen && "chatBoxOpen-V2"}`}>
            {!isOpen && (
                <Button
                    label={""}
                    onClick={onClose}
                    iconSrc={require("./../assets/images/icons/white/chat.png")}
                />
            )}
            {isOpen && (
                <>
                    <img
                        className={"btn-chatClose-V2"}
                        onClick={onClose}
                        src={require("./../assets/images/icons/white/cross.png")}
                        alt="exit-chat"
                    />
                    <ul>
                        {messages.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                    <TextInputComponent
                        name="Message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={"Messages"}
                        styleClass={"input-chatBox-V2"}
                    />
                    <Button
                        label={"Send"}
                        onClick={handleSendMessage}
                        styleClass="send-message-button"
                        iconSrc={require("./../assets/images/icons/white/return.png")}
                    />
                </>
            )}
        </div>
    );
};

export default ChatBox;
