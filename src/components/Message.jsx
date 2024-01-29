import React, { useState } from 'react';

function SendMessageForm({ socket }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (name && message) {
      socket.emit('message', {
        name: name,
        text: message,
      });
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <input
        type="text"
        id="msgInput"
        placeholder="Your message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default SendMessageForm;
