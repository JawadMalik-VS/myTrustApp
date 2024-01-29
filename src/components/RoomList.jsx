import React from 'react';

function RoomList({ rooms }) {
  return (
    <div>
      {rooms && (
        <p>
          <em>Active Rooms:</em>{' '}
          {rooms.map((room, index) => (
            <span key={room}>
              {room}
              {index < rooms.length - 1 && ','}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export default RoomList;
