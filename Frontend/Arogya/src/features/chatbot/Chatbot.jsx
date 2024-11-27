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
    setMessages([...messages, userMessage]); // Update UI with the user's message

    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          sender: "user", // Replace 'user' with a unique user id if needed
          message: inputMessage,
        }
      );

      const botResponses = await response.data.map((msg) => ({
        sender: "bot",
        message: msg.text,
      }));

      setMessages([...messages, userMessage, ...botResponses]); // Add bot response to the UI
    } catch (error) {
      console.error("Error sending message: ", error);
      setMessages([
        ...messages,
        { sender: "bot", message: "Please connect to internet" },
      ]); // Add bot response to the UI
    }

    setInputMessage(""); // Clear input field
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  if (!isOpen) return <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />;
  return (
    <>
      <ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="chatbot-container ">
        <div className="chat-window">
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
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};
function ChatButton({ isOpen, setIsOpen }) {
  return (
    <button
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className={`absolute right-5 ${
        isOpen ? "bottom-[25.5rem]  " : "bottom-3 "
      }`}
    >
      <AiOutlineWechat className="text-5xl" />
    </button>
  );
}
export default Chatbot;
