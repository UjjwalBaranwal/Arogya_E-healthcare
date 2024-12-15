import { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Optional, you can create your own CSS for styling
import { AiOutlineWechat } from "react-icons/ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", message: "Hello! How may I help you today?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { sender: "user", message: inputMessage };
    
    // Clear input field
    setInputMessage(""); 

    // Update UI with the user's message
    setMessages((prevMessages) => [...prevMessages, userMessage]); 

    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "user", // Replace 'user' with a unique user id if needed
          message: inputMessage,
        }
      );

      const botResponses = response.data.map((msg) => ({
        sender: "bot",
        message: msg.text,
      }));

      // Update messages with both user and bot responses
      setMessages((prevMessages) => [...prevMessages, ...botResponses]); 
    } catch (error) {
      console.error("Error sending message: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", message: "Please connect to the internet." },
      ]); // Add bot response to the UI
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h2>Arogya</h2>
            <button onClick={() => setIsOpen(false)} className="close-button">X</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              className="input-field"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function ChatButton({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={`chat-button ${isOpen ? "active" : ""}`}
    >
      <AiOutlineWechat className="icon" />
    </button>
  );
}

export default Chatbot;
