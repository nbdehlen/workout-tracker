import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { isEditing } from '../redux/users/action';
import { ContainerTwo } from '../styles/wrapper';
import { BtnTiny } from '../styles/btn';
import { addUser, fetchUsers } from '../redux/requests/action';

export const Users = ({ data }) => {
  // const [curUser, setCurUser] = useState();
  // const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [showAddUser, setShowAddUser] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const editUserHandler = (e, user) => {
    e.preventDefault();
    dispatch(isEditing(user));
  };

  const addUserHandler = () => {
    dispatch(addUser(auth.xAccessToken, username, email, password));
    dispatch(fetchUsers(auth.xAccessToken));
    setShowAddUser(!showAddUser);
  };

  // const cancelEditUserHandler = () => {
  //   setIsEditing(false);
  //   setCurUser('');
  // };

  console.log(data);
  return (
    <div>
      {showAddUser ? (
        <div style={{ marginTop: '8px', height: '36px' }}>
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
          <Label> Password: </Label>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BtnTiny cancel onClick={addUserHandler}>
            ADD
          </BtnTiny>
          <BtnTiny onClick={() => setShowAddUser(!showAddUser)}>CANCEL</BtnTiny>
        </div>
      ) : (
        <div style={{ marginTop: '8px', height: '36px' }}>
          <BtnTiny cancel onClick={() => setShowAddUser(!showAddUser)}>
            ADD
          </BtnTiny>
        </div>
      )}

      <div>
        <h1 style={{ color: 'white' }}> Users </h1>

        {data.map((user) => (
          <ContainerTwo style={{ marginBottom: '8px' }}>
            <div key={user._id} style={{ color: 'white', fontSize: '20px' }}>
              {user.username}
            </div>

            <BtnTiny onClick={(e) => editUserHandler(e, user)}> EDIT </BtnTiny>
          </ContainerTwo>
        ))}
      </div>
    </div>
  );
};

export default Users;
