import React, {useState} from 'react';
import {useHistory} from 'react-router';
import '../styles/mainScreen.css'

const MainScreen = () => {
  const [clientName, setClientName] = useState('');
  const history = useHistory();
  
  return (
    <div className="main-screen">
      <input className="main-screen-input" placeholder="Select your client username" onChange={(event) => setClientName(event.target.value)} />
      <button className="main-screen-btn" onClick={() => history.push('/client', {clientName})}>Client</button>
      <button className="main-screen-btn" onClick={() => history.push('/host')}>Host</button>
    </div>
  )
};

export default MainScreen;
