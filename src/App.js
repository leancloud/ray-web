import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Message from './Message';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path='/:shareToken' component={Message} />
      </Switch>
    );
  }

}

export default App
