import React, {useMemo} from 'react';
import {Switch, Route} from 'react-router-dom';
import Client from './Client';
import Host from './Host';

const App = () => {

  const connection = useMemo(() => new WebSocket('ws://localhost:9090'), []);

  return (
    <Switch>
      <Route path="/client" exact>
        <Client />
      </Route>
      <Route path="/host" exact>
        <Host connection={connection} />
      </Route>
    </Switch>
  )
}

export default App;