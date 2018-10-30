import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './App.css';

// @REDUX ACTIONS
import { sendMessage } from './actions/senders';

class App extends Component {

    constructor() {
        super();

        this.state = {
            message: ""
        }
        this.global = React.createRef();

    }


    scrollToBottom = () => {
        const scrollHeight =  this._global.scrollHeight;
        const height =  this._global.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this._global.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

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
  }

  render() {
      const messages = this.props.MESSAGES.length > 0 ? this.props.MESSAGES.map(item => (
          <li key={item.id}>
              <span className="name">{item.name}:</span>
              <span className="message">{item.message}</span>
          </li>
        )
      ) : <div>Loading....</div>;
    return (
      <div className="App">
          <div  className="messsages-container">
              <ul ref={(ref) => this._global = ref}>
                  {messages}
              </ul>
          </div>
          <div className="input-container">
              <form onSubmit={this.sendMessage}>
                  <input
                      value={this.state.message}
                      placeholder="Type your message"
                      ref={(ref) => this._input = ref}
                      onChange={this.onValue} type="text"/>
                  <button type="submit">SEND</button>
              </form>
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

