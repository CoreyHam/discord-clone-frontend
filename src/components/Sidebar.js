import React, { useState, useEffect } from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";



export function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [state, dispatch] = useGlobalState();
    let server = state.server_id
    let server_name = state.server_name
    // let server = state.currentServer.id
    // console.log(server)
    // function handleBackClick(e) {
    //     e.preventDefault();
    //     document.querySelector('.screen-dimmer').style.display = 'none';
    //     document.querySelector('.server-name').value = '';
    // }
    // // function handleAddServerClick(e) {
    //     e.preventDefault();
    //     let serverName = document.querySelector('.server-name').value;
    //     console.log(serverName);
    //     if (serverName) {
    //         postChannel( )
    //         document.querySelector('.screen-dimmer').style.display = 'none';
    //         document.querySelector('.server-name').value = '';
    //     }
    // }
    useEffect(() => {
        // getData(`http://127.0.0.1:8000/api/servers/?users=${user}`)
        //     .then(data => setServers(data))
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

    // async function postChannel() {
    //     let serverName = document.querySelector('.server-name').value;
    //     let options = {
    //         method: 'POST',
    //         url: `http://localhost:8000/api/post-servers/`,
    //         data: { name: serverName, users: [user], created_by: user }
    //     }
    //     let response = await request(options)
    //     console.log("heres the user that is making the server!", user)
    //     setServers([...servers, response.data])
    // }
    return (
        <>
            {/* <div className="screen-dimmer">
                <div className="add-server-popup">
                    <h1>Create a server</h1>
                    <div>SERVER NAME: <input
                        className="server-name"
                        type="text" /></div>
                    <div className="add-server-btn-container">
                        <button
                            className="add-server-popup-btn"
                            onClick={handleBackClick}
                        >Back</button>
                        <button
                            className="add-server-popup-btn"
                            onClick={handleAddServerClick}
                        >Create</button>
                    </div>

                </div>
            </div> */}
            <div className="sidebar">
                <div className="topper">
                    <h3>{server_name}</h3>
                    {/* {console.log(state)} */}
                </div>
                <div className="channels">
                    {state.server_id ? <button className="add-channel"> Add Channel </button> : ""}
                    {/* {console.log("HERES THE CHANNELS", channels)} */}
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
        // console.log(channel_id)
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
