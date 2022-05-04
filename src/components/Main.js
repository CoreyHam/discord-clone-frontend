import React, {useEffect, useState} from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";


export function Main() {
    const [messages, setMessages] = useState([]);
    const [ state, dispatch ] = useGlobalState();
    let channel = state.channel_id
    let channel_name = state.channel_name
    let channel_description = state.channel_description
    console.log(state.currentUser)
    useEffect(() => {
        async function getMessages() {
            let options = {
                method: 'GET',
                url: `http://127.0.0.1:8000/api/messages/?channel=${channel}`,
            }
            let response = await request(options)
            setMessages(response.data)
            console.log("channel changed: ", response.data)
        }
        getMessages()
    }, [channel]);

    return (
        <div className="main">
            <div className="topper">
                <h3>{`${channel_name} |`}</h3> <h4>{`  ${channel_description}`}</h4>
                {console.log("THIS IS THE MESSAGES", messages)}
            </div>
            <div className="lower">
                <div className="chat">
                    <div className="messages">
                    {messages
                    .map(messages => <Message user={messages.sent_by.username} message={messages.content} time={messages.created_at} />)}
                    </div>
                    <div className="input"></div>
                </div>
                <div className="active"></div>
            </div>
        </div>
    );
}

function Message({ message, time, user }) {
    time = time.split('T').join(' ').split('.')
    time.pop()
    time = time.join('').split(':')
    time.pop()
    time = time.join(':')
    return (
        <div className="message">
            <div>{user} {time}</div>
            {message}
        </div>
    )
}

