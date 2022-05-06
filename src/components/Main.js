import React, { useEffect, useState } from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CurrentUsers } from "./CurrentUsers";


export function Main() {
    const [messages, setMessage] = useState([]);
    const [state, dispatch] = useGlobalState();
    let server = state.server_id
    let channel = state.channel_id
    let channel_name = state.channel_name
    let channel_description = state.channel_description
    // console.log(state.currentUser)
    useEffect(() => {
        async function getMessage() {
            let options = {
                method: 'GET',
                url: `http://127.0.0.1:8000/api/messages/?channel=${channel}`,
            }
            let response = await request(options)
            setMessage(response.data)
            console.log("channel changed: ", response.data)
        }
        getMessage()
    }, [channel]);

    console.log(channel)
    useEffect(() => {
        console.log("Before clear")
        setMessage([])
        dispatch({channel_id: null, channel_name: null, channel_description: null})
        console.log("After clear")
    }
        , [server])

    async function postMessage() {
        let content = document.querySelector('.message-input').value;
        let options = {
            method: 'POST',
            url: `http://localhost:8000/api/post-messages/`,
            data: { content: content, channel: channel, sent_by: state.currentUser.user_id }
        }
        let response = await request(options)
        setMessage([...messages, response.data])
        document.querySelector('.message-input').value = ''
    }

    return (
        <div className="main">
            {channel_name ? 
            <div className="topper">
                <h3>{`${channel_name} |`}</h3> <h4>{`  ${channel_description}`}</h4>
                {/* {console.log("THIS IS THE MESSAGES", messages)} */}
            </div> : <div className="topper"><h3> </h3></div>}
            <div className="lower">
                <div className="chat">
                    <div className="messages">
                        {messages
                            .map(messages => <Message user={messages.sent_by.username} message={messages.content} time={messages.created_at} key={messages.id} />)}
                    </div>
                    <Input postMessage={postMessage} />
                </div>
                <div className="active">
                    <CurrentUsers />
                </div>
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
            <div className="message-header"><b>{user}</b> {time}</div>
            <ReactMarkdown children={message} remarkPlugins={[remarkGfm]} />
        </div>
    )
}

function Input({ postMessage }) {

    function testFunction(e) {
        // console.log("test")
        if (e.code === 'Enter' && e.shiftKey === false && document.querySelector('.message-input').value) {
            // console.log('Enter was pressed and the message was', document.querySelector('.message-input').value);
            postMessage()
        }
    }
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type a message..."
                className="message-input"
                maxLength={1000}
                onKeyUp={testFunction} />
        </div>
    )
}

