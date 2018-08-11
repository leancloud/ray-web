import React, { Component } from 'react'
import { PacmanLoader } from 'react-spinners';
import { css } from 'react-emotion';
import { Helmet } from 'react-helmet';

const Subject = (props) => {
  return (
    <header className="subject-box">
      <span className="subject">{props.text}</span>
    </header>
  )
}

const Address = (props) => {
  let name = props.address.name
  const email = props.address.email

  if (!name || name.length === 0) {
    name = email
  }

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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  )
}

const loader = css`
    display: block;
    margin: 0 auto;
`;

class Message extends Component {
  state = { messageData: null, error: null }

  componentDidMount() {
    const { shareToken } = this.props.match.params;
    fetch(`https://us-alpha-mail.leancloud.cn/shares/${shareToken}`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error('Message not found.');
      }
    }).then(json => {
      this.setState({ messageData: json });
    }).catch(error => {
      this.setState({ error })
    });
  }

  render() {
    if (this.state.error) {
      return (
        <p>
          An error occured when loading the message: {this.state.error.message}
        </p>
      );
    } else if (this.state.messageData) {
      console.log(this.state.messageData);
      const { subject, from, to, date, body } = this.state.messageData;
      console.log(subject);
      console.log(from);
      return (
        <section className="message-box">
          <Helmet>
            <title>Ray - {subject}</title>
          </Helmet>
          <Subject text={subject} />
          <Summary from={from} to={to} date={date} />
          <Content html={body} />
        </section>
      )
    } else {
      return (<PacmanLoader className={loader} />);
    }
  }
}

export default Message
