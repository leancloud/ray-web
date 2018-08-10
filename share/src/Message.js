import React, { Component } from 'react'
import ResizableIframe from './ResizableIframe'

const Subject = (props) => {
  return (
    <header className="subject-box">
      <span className="subject">{props.text}</span>
    </header>
  )
}

const Address = (props) => {
  const name = props.address.name
  const email = props.address.email
  const mailto = `mailto:${email}`

  return (
    <span className="address-box">
      <span className="address-name">{name}</span>
      <a className="address-email" href={mailto}>&lt;{email}&gt;</a>
    </span>
  )
}

const Summary = (props) => {
  const { from, to, date } = props

  const time = new Date(date * 1000)
  const dateNode = <span className="summary-date">{time.toLocaleString()}</span>
  const fromNodeList = from.map(address => <Address key={address.email} address={address} />)
  const toNodeList = to.map(address => <Address key={address.email} address={address} />)

  return (
    <section className="summary-box">
      <section className="summary-top-box">
        <div className="summary-from-box">{fromNodeList}</div>
        <div className="summary-date-box">{dateNode}</div>
      </section>
      <section className="summary-to-box">
        <span className="summary-to-label">To:</span>
        {toNodeList}
      </section>
    </section>
  )
}

const Content = (props) => {
  const html = props.html

  return (
    <section className="content-box">
      <ResizableIframe className="content-iframe" srcDoc={html} />
    </section>
  )
}

class Message extends Component {

  render() {
    const data = this.props.data

    return (
      <section className="message-box">
        <Subject text={data.subject} />
        <Summary from={data.from} to={data.to} date={data.date} />
        <Content html={data.body} />
      </section>
    )
  }

}

export default Message
