import React, { useState, useEffect } from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";

export function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [state, dispatch] = useGlobalState();
    let server = state.server_id
    let server_name = state.server_name

    useEffect(() => {
        async function getChannels() {
            let options = {
                method: 'GET',
                url: `http://localhost:8000/api/channels/?server=${server}`,
            }
            let response = await request(options)
            setChannels(response.data)
        }
        getChannels()
    }, [server]);

    async function postChannels() {
        let channelName = document.querySelector('.channel-name').value;
        let channelDescription = document.querySelector('.channel-description').value;
        let options = {
            method: 'POST',
            url: `http://localhost:8000/api/channels/`,
            data: { name: channelName, description: channelDescription, server: server }
        }
        let response = await request(options)
        setChannels([...channels, response.data])
    }

    function handleBackClick(e) {
        e.preventDefault();
        document.querySelector('.ch-screen-dimmer').style.display = 'none';
        document.querySelector('.ch-channel-name').value = '';
        document.querySelector('.ch-channel-description').value = '';
    }

    function handleAddChannelClick(e) {
        e.preventDefault();
        let channelName = document.querySelector('.channel-name').value;
        if (channelName) {
            postChannels()
            document.querySelector('.ch-screen-dimmer').style.display = 'none';
            document.querySelector('.channel-name').value = '';
            document.querySelector('.channel-description').value = '';
        }
    }

    function showPopup() {
        document.querySelector('.ch-screen-dimmer').style.display = 'flex';
    }

    return (
        <>
            <div className="ch-screen-dimmer">
                <div className="add-server-popup">
                    <h1>Create a channel</h1>
                    <div>CHANNEL NAME: <input
                        className="channel-name"
                        type="text" /></div>
                    <div>CHANNEL DESCRIPTION: <input
                        className="channel-description"
                        type="text" /></div>
                    <div className="add-server-btn-container">
                        <button
                            className="add-server-popup-btn"
                            onClick={handleBackClick}
                        >Back</button>
                        <button
                            className="add-server-popup-btn"
                            onClick={handleAddChannelClick}
                        >Create</button>
                    </div>

                </div>
            </div>
            <div className="sidebar">
                <div className="topper">
                    <h3>{server_name}</h3>
                </div>
                <div className="channels">
                    {state.server_id ? <button onClick={showPopup} className="add-channel"> Add Channel </button> : ""}
                    {channels
                        .map(channels => <Channel channel={channels.name} channel_id={channels.id} channel_description={channels.description} key={channels.id} />)}
                </div>
            </div>
        </>
    )
}

function Channel({ channel, channel_id, channel_description }) {
    const [state, dispatch] = useGlobalState();

    function handleClick(e) {
        e.preventDefault();
        dispatch({ channel_id: channel_id, channel_name: channel, channel_description: channel_description })
    }
    let name = channel
    return (
        <button
            className="channel"
            onClick={handleClick}>

            <div className="channel-name">{name}</div>
        </button>
    )
}
