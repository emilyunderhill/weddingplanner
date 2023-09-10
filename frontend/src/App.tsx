import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from './components/button/Button';

function App() {
  return (
    <div className="App">
     
      <Button content="log in" action={() => null} variant='primary' />
    </div>
  );
}

export default App;
