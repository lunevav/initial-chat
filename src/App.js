import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

// @REDUX ACTIONS
import { sendMessage } from './actions/senders';

class App extends Component {

    constructor() {
        super();

        this.state = {
            message: ""
        };

        this.global = React.createRef();
    }
    scrollToBottom = () => {
        const scrollHeight =  this._global.scrollHeight;
        const height =  this._global.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this._global.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    componentDidMount() {
        this.scrollToBottom();
        this._input.focus();
    }

    componentWillReceiveProps(nextProps) {
            this.scrollToBottom();
    }
    onValue = (e) => this.setState({message: e.target.value});

    sendMessage = (e) => {
      e.preventDefault();
      this.props.sendMessage(this.state.message);
      this.setState({
          message: ""
      });
    };

    randomColor(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        let hex = '#' + "00000".substring(0, 6 - c.length) + c;
        let rgba;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            rgba = hex.substring(1).split('');
            if (c.length == 3) {
                rgba = [rgba[0], rgba[0], rgba[1], rgba[1], rgba[2], rgba[2]];
            }
            rgba = '0x' + rgba.join('');
            return 'rgba(' + [(rgba >> 16) & 255, (rgba >> 8) & 255, rgba & 255].join(',') + ',0.1)';
        }
    }
  render() {
      const messages = this.props.MESSAGES.length > 0 ? this.props.MESSAGES.map(item => (
          <li key={item.id}>
              <div className="avatar" style={{backgroundColor:this.randomColor(item.name)}}>{item.name[0].toUpperCase()}</div>
              <div className="name">{item.name}</div>
              <div className="message">{item.message}</div>
          </li>
        )
      ) : <div>Loading....</div>;
    return (
      <div className="App">
          <div className="active-users-list"></div>
          <div  className="messsages-container">
              <ul ref={(ref) => this._global = ref}>
                  {messages}
              </ul>
              <div className="input-container">
                  <form onSubmit={this.sendMessage}>
                      <input
                          value={this.state.message}
                          placeholder="Write a message..."
                          ref={(ref) => this._input = ref}
                          onChange={this.onValue} type="text"/>
                      <button type="submit">SEND</button>
                  </form>
              </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        messageStatus: state.sendMessageReducer,
        MESSAGES: state.messageReducer.messages
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App)

