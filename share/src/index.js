import React from 'react'
import ReactDOM from 'react-dom'

import Request from './Request'
import Message from './Message'
import Failure from './Failure'

const root = document.getElementById('root')
const messageToken = encodeURIComponent(window.location.pathname.slice(1))

Request.fetchMessage(messageToken)
  .then(data => ReactDOM.render(<Message data={data} />, root))
  .catch(error => ReactDOM.render(<Failure error={error} />, root))
