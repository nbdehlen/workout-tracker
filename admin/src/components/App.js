import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { SectionOne } from '../styles/section';
import { Container } from '../styles/wrapper';
import { useSelector } from 'react-redux';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Container>{auth?.xAccessToken ? <Dashboard /> : <Login />}</Container>
  );
};

export default App;
