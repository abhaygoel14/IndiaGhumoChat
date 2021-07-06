import React from 'react';
import { useEffect, useState } from 'react';
import "./Chat.css"
import ChatHeader from './ChatHeader';
import Message from './Message';
import {selectChatId, selectChatName} from '../features/chatSlice' 
import { selectUser } from '../features/userSlice'
import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import db from './firebase'
import firebase from 'firebase'
function Chat() {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChatId)
    const channelName = useSelector(selectChatName)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        if(channelId){
            db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => doc.data()))
            )
        }
    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('channels').doc(channelId).collection('messages').add({
            user: user,
            messsage: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }

    return (
        <div className = "chat">
            <ChatHeader channelName = {channelName}/>

            <div className = "chatMessage">
                { messages.map((message) => (
                    <Message 
                        timestamp = {message.timestamp}
                        message = {message.messsage}
                        user = {message.user}
                    />
                ))}
                

            </div>
            <div className = "Addchat">
                <AddCircle />
                <form>
                    <input 
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                    placeholder = {`message #${channelName}`}/>
                    <button 
                    onClick = {sendMessage}
                    //disabled = {!channelId}
                    className = "ChatButton"
                    type = "submit">
                        send
                    </button>
                </form>
                <div className = "chat_inputIcon">
                    <CardGiftcard fontSize
                    = "large"/>
                    <Gif fontSize = "large" />
                    <EmojiEmotions fontSize = "large" />
            </div>
        </div>
    </div>
    )
}

export default Chat