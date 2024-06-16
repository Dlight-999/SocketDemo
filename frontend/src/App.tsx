import React, { useState } from "react";
import { io, Socket } from "socket.io-client";
const socket: Socket = io("http//localhost:5000");
function App() {
  const [message, setMessage] = useState<string>("");
  const handlePress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
      } else {
        event.preventDefault();
        sendMessage();
      }
    }
  };
  const sendMessage = () => {
    if (message) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };
  return (
    <>
      <div className=" bg-slate-900 text-white h-screen flex flex-col items-center justify-between">
        <div className="msg bg-slate-600 p-5 w-full h-full overflow-auto">
          All messages are displayed here
        </div>
        <div className="func flex justify-between w-full">
          <div className="input w-full">
            <textarea
              name="msg"
              id="msg"
              value={message}
              onKeyDown={handlePress}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-full p-2 text-black flex"
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
    </>
  );
}

export default App;
