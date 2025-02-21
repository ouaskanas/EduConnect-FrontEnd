import React, { useState } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid" style={{ paddingTop: 100 }}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="chat-box p-3 border rounded mt-3">
              <h5>Messagerie</h5>
              <div className="chat-messages border p-4 mb-2" style={{ height: "500px", overflowY: "auto" }}>
                {messages.map((msg, index) => (
                  <div key={index} className="message bg-light p-1 rounded mb-1">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrire un message..."
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
