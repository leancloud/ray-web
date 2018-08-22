import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

const Address = (props) => {
  let name = props.address.name;
  const email = props.address.email;

  if (!name || name.length === 0) {
    name = email;
  }

  const mailto = `mailto:${email}`;

  return (
    <a className="content" href={mailto}>{name}</a>
  )
}

const Summary = (props) => {
  const { from, to, date } = props
  const time = new Date(date * 1000)
  const dateNode = <span className="content">{time.toLocaleString()}</span>
  const fromNodeList = from.map(address => <Address key={address.email} address={address} />)
  const toNodeList = to.map(address => <Address key={address.email} address={address} />)

  return (
    <div role='list' className='ui list'>
      <div role='listitem' className='item'>
        <i aria-hidden='true' className='arrow left icon' />
        {fromNodeList}
      </div>
      <div role='listitem' className='item'>
        <i aria-hidden='true' className='arrow right icon' />
        {toNodeList}
      </div>
      <div role='listitem' className='item'>
        <i aria-hidden='true' className='clock outline icon' />
        {dateNode}
      </div>
    </div>
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
      const { subject, from, to, date, body } = this.state.messageData;
      return (
        <section className="message-box">
          <Helmet>
            <title>Ray - {subject}</title>
            <meta property="og:title" content={subject} />
            <meta property="og:url" content={window.location.href} />
          </Helmet>
          <h2 className="ui header">{subject}</h2>
          <Summary from={from} to={to} date={date} />
          <Content html={body} />
        </section>
      )
    } else {
      return (
        <div className='ui active transition visible inverted dimmer'>
          <div className='content'>
            <div className='ui inverted text loader'>Loading</div>
          </div>
        </div>
      );
    }
  }
}

export default Message
