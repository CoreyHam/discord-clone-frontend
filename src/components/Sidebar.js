import React, { useState, useEffect } from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";



export function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [state] = useGlobalState();
    let server = state.server_id
    let server_name = state.server_name
    // let server = state.currentServer.id
    // console.log(server)
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
    return (
        <div className="sidebar">
            <div className="topper">
                <h3>{server_name}</h3>
                {console.log(channels)}
            </div>
            <div className="channels">
                {channels
                    // .filter(server => server.users.includes(state.currentUser.user_id))
                    .map(channels => <Channel channel={channels.name} />)}
            </div>
        </div>
    )
}

function Channel({ channel }) {
    let name = channel
    return (
        <button className="channel">
            <h4>{name}</h4>
        </button>
    )
}
