import React, { Component } from 'react'

class Failure extends Component {

  render() {
    let error = this.props.error
    let response = error.response

    if (response.status === 404) {
      return <h1>Not found</h1>
    } else {
      return <h1>Error</h1>
    }
  }

}

export default Failure
