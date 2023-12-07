import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import { Routes } from './Components/Routes';
import './wdyr';

const App: React.FC = () => {
  return (
    <Router>
      <RecoilRoot>
        <Routes />
      </RecoilRoot>
    </Router>
  );
};

export default hot(App);
