import React, { useState, useEffect } from 'react';

const UserListWithImages = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List with Profile Images</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map(user => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <img
              src={`https://robohash.org/${user.id}?size=100x100`}
              alt={`${user.name}'s profile`}
              style={{
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{user.name}</h2>
              <p style={{ margin: 0 }}>{user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListWithImages;
