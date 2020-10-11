import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { isEditing } from '../redux/users/action';

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
        <h1> Users </h1>

        {data.map((user) => (
          <div>
            <div key={user._id}> {user.username} </div>

            <button onClick={(e) => editUserHandler(e, user)}> Edit </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
