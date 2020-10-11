import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label } from '../styles/input';
import { BtnTiny } from '../styles/btn';
import axios from 'axios';
import { login } from '../redux/auth/action';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // if user return you're already logged in. Do you want to logout? <box to logout>
  const userHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      // const id = Math.random();
      // const title = post;
      // const isEditing = false;
      // dispatch(addPost({ id, title, isEditing }));

      const loginStatus = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        {
          username,
          password,
        },
      );

      setUsername('');
      setPassword('');
      console.log(loginStatus);
      dispatch(login(loginStatus.data));

      //Redirect to somewhere
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Label> Username: </Label>
        <Input type='text' value={username} onChange={userHandler} />
        <Label> Password: </Label>
        <Input type='password' value={password} onChange={passwordHandler} />
        <BtnTiny type='submit' onClick={postSubmit}>
          save
        </BtnTiny>
      </div>
    </>
  );
};

export default Login;
