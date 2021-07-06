import React,{useState, useEffect} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SideChannel from "./SideChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import  InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import { Avatar } from '@material-ui/core'
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import HeadSetIcon from '@material-ui/icons/Headset'
import MicIcon from '@material-ui/icons/Mic'
import SettingsIcon from '@material-ui/icons/Settings'
import './Sidebar.css'
import db,{auth} from '../components/firebase'
function Sidebar(){
    const user=useSelector(selectUser);
    const [channels,setChannels]=useState([])
    
    useEffect(()=> {
        db.collection('channels').onSnapshot(snapshot=>(
            setChannels(snapshot.docs.map(doc => ({
                id:doc.id,
                channel:doc.data()
            })))
        ))
    })
    const handleChat=()=>{
        const channelName=prompt("Enter a Channel Name")
        if(channelName){
            db.collection('channels').add({
                channelName:channelName
            })
        }
    }
    return(
    <div className="sidebar">
    <div className="sidebar_above">
        <h3>{user.displayName}</h3>
        <ExpandMoreIcon />
        </div>
    <div className="channel">
    <div className="channelHeader">
    <div className="sidebar_header">
    <h4>Channel</h4>
    </div>
    <AddIcon onClick={handleChat}
    className="sidebar_add"/>
    </div>
    <div className="channelList">
    {
        channels.map(({id,channel})=>(
            <SideChannel 
            key={id}
            id={id}
            channelName ={channel.channelName}
            />
        ))
    }
   
    </div>
     </div>
    <div className="voice_channel">
    <SignalCellularAltIcon className="sideVoiceIcon"/>
        <div className="sideVoiceInfo">
            <h3>Voice Connected</h3>
                 <p>Stream</p>
        </div>
    <div className = "side_voiceIcon">
    <InfoOutlinedIcon />
     <CallIcon />
    </div>
    </div>
    <div className="sideProfile">
        <Avatar onClick={()=>auth.signOut()}  src={user.photo} 
        className="side_profileAvatar"/>
    </div> 
    <div className="sideProfileInfo">
        <h3>{user.displayName}</h3>
        <p>#{user.uid.substring(0,5)}</p>
    </div>
    <div className="sideProfileIcons">
        <MicIcon />
        <HeadSetIcon />
        <SettingsIcon />
    </div>
    </div>
    );
}
export default Sidebar;