import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

// @REDUX ACTIONS
import { sendMessage } from './actions/senders';

import Navigation from './components/Navigation';
import messageReducer from "./reducers/messagesReducer";

class App extends Component {

    constructor() {
        super();

        this.state = {
            message: ""
        }

    }
  onValue = (e) => this.setState({message: e.target.value});


  sendMessage = () => {
      this.props.sendMessage(this.state.message);
      this.setState({
          message: ""
      });
  }

  render() {
      console.log(this.props.MESSAGES);
      const messages = this.props.MESSAGES.length > 0 ? this.props.MESSAGES.map(item => (
          <li key={item.id}><strong>{item.name}:</strong> {item.message}</li>
        )
      ) : <div>Loading....</div>;
    return (
      <div className="App">
          <ul>
              {messages}
          </ul>
          <input value={this.state.message} onChange={this.onValue} type="text"/>
          <button onClick={this.sendMessage}>SEND</button>
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

