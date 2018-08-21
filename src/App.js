import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { css } from 'react-emotion';
import Message from './Message';
import './index.css';

const headerStyle = css`
  font-family: -apple-system,'BlinkMacSystemFont','Helvetica Neue','Arial',sans-serif;
  font-weight: 200;
  font-size: 2rem;
`;

class App extends Component {

  render() {
    return (
      <div>
        <Menu borderless>
          <Container text>
            <Menu.Item header style={{ padding: '0.5em 0' }}>
            <img src="/icon-round.png" className="ui right spaced image"
              alt="Ray Icon"
              style={{height: '36px', width: '36px'}} />
              <a className={headerStyle} href="https://helloray.io">
              Ray
              </a>
            </Menu.Item>
          </Container>
        </Menu>
        <Container text>
          <Switch>
            <Route path='/:shareToken' component={Message} />
          </Switch>
        </Container>
      </div>
    );
  }

}

export default App
