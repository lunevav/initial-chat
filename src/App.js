import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';


// @REDUX ACTIONS
import { sendMessage, addUserAndUpdate } from './actions/senders';

// @COMPONENTS
import MessageList from './components/messages/MessagesList';

class App extends Component {

    constructor() {
        super();

        this.state = {
            message: ""
        };
    }

    componentDidMount() { this._input.focus(); }

    componentWillMount() { window.addEventListener("beforeunload", this.onCloseFromGoogleChromeHandler) }
    componentWillUnmount() {window.removeEventListener("beforeunload", this.onCloseFromGoogleChromeHandler) }
    onCloseFromGoogleChromeHandler = () => {
        const { addUserAndUpdate,  sendMessage } = this.props;
        addUserAndUpdate(false);
        sendMessage('Bye bye! ' + localStorage.getItem('userData'));
    }

    onValue = (e) => this.setState({message: e.target.value});

    sendMessage = (e) => {
      e.preventDefault();
      this.props.sendMessage(this.state.message);
      this.setState({
          message: ""
      });
    };

  render() {

    const userList = this.props.userList.length > 0 ? this.props.userList.map(item => (
        <li style={{ color: item.status ? 'green' : 'red' }} key={item.id}>
            {item.name}
        </li>
        )
    ) : <div>User list loading...</div>
    return (
      <div className="App">
          <div className="active-users-list">
              <ul>
                  {userList}
              </ul>
          </div>
          <div  className="messsages-container">
              <MessageList
                messages={this.props.MESSAGES}
              />
              {/* TODO CREATE COMPONENT WITH HANDLERS*/}
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
        MESSAGES: state.messageReducer.messages,
        userList: state.userListReducer.userList
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => dispatch(sendMessage(message)),
        addUserAndUpdate: (status) => dispatch(addUserAndUpdate(status))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

