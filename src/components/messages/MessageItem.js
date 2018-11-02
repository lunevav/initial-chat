import React from 'react';
import {randomColor} from '../../utils/randomColor';

const message = (props) => {
    return(
        <li key={props.id}>
            <div className="avatar" style={{background: randomColor(props.name)}}>{props.name[0].toUpperCase()}</div>
            <div className="name">{props.name}</div>
            <div className="message">{props.message}</div>
        </li>
    )
}

export default message;