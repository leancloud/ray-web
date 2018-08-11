import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App';

const root = document.getElementById('root');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root);
// const messageToken = encodeURIComponent(window.location.pathname.slice(1))
// 
// Request.fetchMessage(messageToken)
//   .then(data => ReactDOM.render(<Message data={data} />, root))
//   .catch(error => ReactDOM.render(<Failure error={error} />, root))
