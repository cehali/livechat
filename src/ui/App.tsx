import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Client from './Client';
import Host from './Host';
import MainScreen from './MainScreen';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MainScreen />
      </Route>
      <Route path="/client" exact>
        <Client />
      </Route>
      <Route path="/host" exact>
        <Host />
      </Route>
    </Switch>
  )
}

export default App;