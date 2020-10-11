import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { isEditing, cancelEditing } from '../redux/users/action';
import { fetchUsers, deleteUser, editUser } from '../redux/requests/action';
import { BtnTiny } from '../styles/btn';

export const UserDetails = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const cancelEditUser = (e, user) => {
    e.preventDefault();
    dispatch(cancelEditing(user));
  };

  const editUserHandler = (e, user) => {
    e.preventDefault();
    dispatch(cancelEditing(user));
    dispatch(editUser(auth.xAccessToken, user._id, username, email));
    dispatch(fetchUsers(auth.xAccessToken));
  };

  const deleteUserHandler = (e, user) => {
    e.preventDefault();
    dispatch(deleteUser(auth.xAccessToken, user._id));
    dispatch(cancelEditing(user));
    dispatch(fetchUsers(auth.xAccessToken));
  };

  return (
    <div>
      <div>
        <div>
          <Label> Username: </Label>
          <Input
            type='text'
            value={username}
            onChange={(e) => (
              console.log(e.target.value), setUsername(e.target.value)
            )}
          />
          <Label> Email: </Label>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <BtnTiny cancel onClick={(e) => cancelEditUser(e, user)}>
            CANCEL
          </BtnTiny>
          <BtnTiny done onClick={(e) => editUserHandler(e, user)}>
            SAVE
          </BtnTiny>
          <BtnTiny del onClick={(e) => deleteUserHandler(e, user)}>
            DELETE
          </BtnTiny>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
