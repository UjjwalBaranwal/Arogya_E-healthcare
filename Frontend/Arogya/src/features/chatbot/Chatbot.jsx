import { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Optional, you can create your own CSS for styling
import { AiOutlineWechat } from "react-icons/ai";
const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", message: "how may i help you today" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { sender: "user", message: inputMessage };
    setInputMessage(""); // Clear input field

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
      <div className="fixed right-0.5 bottom-0.5 flex flex-col w-[400px] h-[400px] border-1  border-[#ccc] border-solid rounded-lg bg-[#f9f9f9] ">
        <div className="flex-grow overflow-y-auto p-3 bg-[#fff] border-b border-[#ccc] border-solid">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mx-1 my-2 p-4 border-solid border-[2px] max-w-[80%] rounded-xl ${
                msg.sender === "user"
                  ? "bg-[#e0e0e0] text-right self-end"
                  : "bg-[#d1ecf1] self-start text-left"
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>

        <div className="input-container flex p-4 bg-[#f1f1f1]">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyUp={handleKeyPress}
            className="flex-grow p-4 border-[#ccc] rounded-md outline-none border-solid "
          />
          <button
            onClick={handleSendMessage}
            className="p-4 ml-3 border-solid border-2 border-red-500 bg-[#007bff] rounded-lg cursor-pointer text-[white] hover:bg-[#0056b3]"
          >
            Send
          </button>
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
      className={`fixed right-5 ${isOpen ? "bottom-[25.5rem]  " : "bottom-3 "}`}
    >
      <AiOutlineWechat className="text-5xl" />
    </button>
  );
}
export default Chatbot;
