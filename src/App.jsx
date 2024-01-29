import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import "./index.scss";

function App() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [activity, setActivity] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  console.log("User-->", users);
  console.log("Rooms-->",rooms)
  useEffect(() => {
    const newSocket = io('http://localhost:3500/');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Remove existing event listeners
      socket.off('message');
      socket.off('activity');
      socket.off('userList');
      socket.off('roomList');
  
      // Add new event listeners
      socket.on('message', handleNewMessage);
      socket.on('activity', handleTypingActivity);
      socket.on('userList', handleUserList);
      socket.on('roomList', handleRoomList);
    }
  }, [socket, currentUser]);
  

  const sendMessage = (e) => {
    e.preventDefault();
    if (name && message && room) {
      socket.emit('message', {
        name: name,
        text: message,
      });
      setMessage('');
    }
  };


  const enterRoom = (e) => {
    e.preventDefault();
    if (name && room) {
      console.log('Emitting "enterRoom" event');
      socket.emit('enterRoom', {
        name: name,
        room: room,
      });
    }
  };
  const handleNewMessage = (data) => {
    setActivity('');
    const { name, text, time } = data;

    

    const newMessage = {
        key: time, // Assuming time can be used as a unique key
        name: name,
        text: text,
        time: time
    };

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
};

// Add a useEffect hook to scroll to the bottom of the chat display
useEffect(() => {
    const chatDisplay = document.getElementById('chat-display');
    if (chatDisplay) {
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}, [chatHistory]);



  
  const handleTypingActivity = (name) => {
    setActivity(`${name} is typing...`);
    setTimeout(() => {
      setActivity('');
    }, 3000);
  };

  const handleUserList = ({ users }) => {
    showUsers(users);

    setUsers(users);

       for (let i = 0; i < users.length; i++) {
      if (users.length > 0) {
        setCurrentUser(users[i].name);
      }
    };
  }

  const handleRoomList = ({ rooms }) => {
    showRooms(rooms);
  };

  const showUsers = (users) => {
    setUsers(users);
  };

  const showRooms = (rooms) => {
    setRooms(rooms);
  };

  return (
    <main>
      <form className="form-join" onSubmit={enterRoom}>
        <input
          type="text"
          id="name"
          maxLength="8"
          placeholder="Your name"
          size="5"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="room"
          placeholder="Chat room"
          size="5"
          required
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button id="join" type="submit">
          Join
        </button>
      </form>

      <ul className="chat-display" id="chat-display">
    {chatHistory.map((message) => (
      <li key={message.key}
        className="post post--left post__header--user"
      >
            <div className="post__header">
                <span className="post__header--name">{message.name}</span>
                <span className="post__header--time">{message.time}</span>
            </div>
            <div className="post__text">{message.text}</div>
        </li>
    ))}
</ul>

      <p className="user-list"></p>

      <p className="room-list"></p>

      <p className="activity">{activity}</p>

      <form className="form-msg" onSubmit={sendMessage}>
        <input
          type="text"
          id="message"
          placeholder="Your message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
