import React from 'react';
import { useDispatch } from 'react-redux';
import { setChatInfo } from '../features/chatSlice';
import './SideChannel.css'
function SideChannel({id,channelName}){
    const dispatch=useDispatch()
            return (
            <div className="sideChannelBar" onClick={()=>dispatch
            (setChatInfo({
                chatId:id,
                chatName:channelName
            }))}>
            <h4><span className="sideChannelView">#
    </span>{channelName}</h4>
            </div>
        );
    }

export default SideChannel;