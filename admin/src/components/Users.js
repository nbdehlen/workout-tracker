import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { isEditing } from '../redux/users/action';
import { ContainerTwo } from '../styles/wrapper';
import { BtnTiny } from '../styles/btn';

export const Users = ({ data }) => {
  // const [curUser, setCurUser] = useState();
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const editUserHandler = (e, user) => {
    e.preventDefault();
    dispatch(isEditing(user));
  };

  // const cancelEditUserHandler = () => {
  //   setIsEditing(false);
  //   setCurUser('');
  // };

  console.log(data);
  return (
    <div>
      <div>
        <h1 style={{ color: 'white' }}> Users </h1>

        {data.map((user) => (
          <ContainerTwo>
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
