import React, {useState} from 'react';
import {useHistory} from 'react-router';

const MainScreen = () => {
  const [clientName, setClientName] = useState('');
  const history = useHistory();
  
  return (
    <>
      <input onChange={(event) => setClientName(event.target.value)}></input>
      <button onClick={() => history.push('/client', {clientName})}>Client</button>
      <button onClick={() => history.push('/host')}>Host</button>
    </>
  )
};

export default MainScreen;
