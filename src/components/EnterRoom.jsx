import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';

function EnterRoomForm() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [socket, setSocket] = useState(null);

    
    useEffect(() => {
        const newSocket = io('http://localhost:3500/');
        setSocket(newSocket);
    
        return () => {
          newSocket.disconnect();
        };
      }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('message', handleNewMessage);
//       socket.on('activity', handleTypingActivity);
//       socket.on('userList', handleUserList);
//       socket.on('roomList', handleRoomList);
//     }
//   }, [socket]);
    
  const handleEnterRoom = (e) => {
    e.preventDefault();
    if (name && room) {
      console.log('Emitting "enterRoom" event');
      socket.emit('enterRoom', {
        name: name,
        room: room,
      });
    }
  };

  return (
    <form onSubmit={handleEnterRoom}>
      <input
        type="text"
        id="nameInput"
        maxLength="8"
        placeholder="Your name"
        size="5"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="chatRoom"
        placeholder="Chat room"
        size="5"
        required
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
}

export default EnterRoomForm;
