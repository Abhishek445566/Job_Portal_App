import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat() {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize the SockJS connection and STOMP client
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        setIsConnected(true);
        client.subscribe('/topic/public', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages(prevMessages => [...prevMessages, receivedMessage]);
        });
        // If username is set (on join), send a join message
        if (username) {
          client.publish({
            destination: '/app/chat.addUser',
            body: JSON.stringify({ sender: username, type: "JOIN" })
          });
        }
      },
      onDisconnect: () => {
        setIsConnected(false);
      }
    });
    
    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [username]);

  const sendMessage = () => {
    if (stompClient && isConnected && messageContent.trim() !== "") {
      const message = {
        sender: username,
        content: messageContent,
        type: "CHAT"
      };
      stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
      setMessageContent("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      {!username && (
        <div>
          <input 
            type="text" 
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', margin: '1rem 0', padding: '0.5rem' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong> {msg.content}
          </div>
        ))}
      </div>
      <div>
        <input 
          type="text"
          placeholder="Type a message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage} disabled={!isConnected || !username}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
