import React from 'react';
import { Avatar } from '@material-ui/core'
import './Message.css'
function Message({timestamp,message,user}) {
        return (
            <div className="message">
            <Avatar src = {user.photo} /> 
            <div className="messageInfo">
                <h4>
                {user.displayName}
                <span className="MessageTime">{new Date(timestamp?.toDate()).toLocaleString()}</span></h4>
                <p>{message}</p>
            </div>
            </div>
        )
    };



export default Message