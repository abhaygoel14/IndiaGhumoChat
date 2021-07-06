import React from 'react';
import { EditLocation, HelpRounded, Notifications, PeopleAltRounded, SearchRounded, SendRounded } from '@material-ui/icons'
import './ChatHeader.css';
function ChatHeader({channelName}){
            return (
            <div className="chatHeader">
            <div className="chatLeft">
            <h3><span className="chatHeader_hash">#</span>{channelName}</h3> 
            </div>
           <div className="chatRight">
               <Notifications />
               <EditLocation />
               <PeopleAltRounded />
               <div className = "chatSearch">
                    <input placeholder = "search" />
                    <SearchRounded />
                </div>
                <SendRounded />
                <HelpRounded />
           </div>
            </div>
        );
    }

export default ChatHeader;