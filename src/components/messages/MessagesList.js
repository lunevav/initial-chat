import React, { Component } from 'react';
import { notifyMe } from '../../utils/showNotification';
// @COMPONENTS
import MessageItem from './MessageItem';

export default class MessagesList extends Component{
    constructor(props) {
        super(props);

        this._global = React.createRef();
    }

    scrollToBottom = () => {
        const scrollHeight =  this._global.scrollHeight;
        const height =  this._global.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this._global.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    };

    componentDidUpdate() {
        // EXAMPLE
        const lastMessage = this.props.messages[this.props.messages.length -1].message;
        document.title = lastMessage;
        notifyMe(lastMessage);
        this.scrollToBottom();
    }

    render() {
        const { messages } = this.props;
        const myMessages = messages.length > 0 ? messages.map(item => (
            <MessageItem
                key={item.id}
                id={item.id}
                name={item.name}
                message={item.message}
            />
            )
        ) : <div>Loading....</div>;
        return (
            <ul ref={(ref) => this._global = ref}>
                {myMessages}
            </ul>
        )
    }
}