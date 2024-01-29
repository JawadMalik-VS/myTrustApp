import React from 'react';

function UserList({ users, chatRoom }) {
  return (
    <div>
      {users && (
        <p>
          <em>Users in {chatRoom}:</em>{' '}
          {users.map((user, index) => (
            <span key={user.id}>
              {user.name}
              {index < users.length - 1 && ','}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export default UserList;
