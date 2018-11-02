import React from 'react';

const message = (props) => {
    return(
        <li key={props.id}>
            <div className="avatar">{props.name[0].toUpperCase()}</div>
            <div className="name">{props.name}</div>
            <div className="message">{props.message}</div>
        </li>
    )
}

export default message;