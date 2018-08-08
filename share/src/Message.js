import React, { Component } from 'react'

const Subject = (props) => {
  return <h1>{props.subject}</h1>
}

const Participant = (props) => {
  return <div></div>
}

const Content = (props) => {
  return <div></div>
}

class Message extends Component {

  render() {
    let data = this.props.data

    return (
      <div className="message">
        <Subject subject={data.subject} />
        <Participant from={data.from} to={data.to} date={data.date} />
        <Content body={data.body} />
      </div>
    )
  }

}

export default Message
