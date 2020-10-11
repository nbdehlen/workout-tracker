import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { isEditing, cancelEditing } from '../redux/users/action';

export const UserDetails = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const editUserHandler = (e, user) => {
    e.preventDefault();
    // user.isEditing = false;
    dispatch(cancelEditing(user));
  };

  return (
    <div>
      <div>
        <div>
          <Label> Username: </Label>
          <Input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label> Email: </Label>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={(e) => editUserHandler(e, user)}> EDIT </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
