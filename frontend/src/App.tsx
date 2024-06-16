import React, { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
const socket: Socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );
  const [username, setUsername] = useState<string>(() => {
    // Initialize username from localStorage if available, otherwise prompt
    const storedUsername = localStorage.getItem("username");
    return storedUsername || "";
  });

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handlePress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { user: username, message }); // Send username with the message
      setMessage("");
    }
  };

  useEffect(() => {
    if (!username) {
      const user = prompt("Please enter your username:") || "Anonymous";
      setUsername(user);
      localStorage.setItem("username", user);
    }
  }, [username]);

  useEffect(() => {
    socket.on("receive_message", (data: { user: string; message: string }) => {
      console.log("Message received:", data); // Log received message
      setMessages((prevMessages) => [...prevMessages, data]);
      // Scroll to the bottom when a new message is received
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="bg-slate-900 text-white h-screen flex flex-col items-center justify-between">
      <div
        ref={messageContainerRef}
        className="msg bg-slate-600 p-5 w-full h-full pb-6 overflow-y-auto"
      >
        Convo:
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="func flex justify-between w-full">
        <div className="input w-full">
          <textarea
            name="msg"
            id="msg"
            value={message}
            onKeyDown={handlePress}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-full p-2 text-black"
            style={{ resize: "none" }}
            placeholder="Type a message..."
          ></textarea>
        </div>
        <div className="btn">
          <button className="h-full w-full p-3" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
