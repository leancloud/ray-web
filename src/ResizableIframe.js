import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ResizableIframe extends Component {

  constructor() {
    super()

    this.state = {
      height: '0px'
    }
  }

  render() {
    return (
      <iframe
        style={{
          width: "100%",
          height: this.state.height,
          minWidth: "100%",
          overflow: "visible"
        }}
        onLoad={() => {
          const iframe = ReactDOM.findDOMNode(this)
          this.setState({
            height: iframe.contentWindow.document.body.scrollHeight + "px"
          })
        }}
        title="Ray Message"
        ref="iframe"
        srcDoc={this.props.srcDoc}
        width="100%"
        height={this.state.height}
        frameBorder="0"
        scrolling="no"
      />
    )
  }

}

export default ResizableIframe
