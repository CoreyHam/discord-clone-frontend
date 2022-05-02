import React, { useState, useEffect } from "react";
import { getData } from "../utils/data";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useGlobalState } from "../context/GlobalState";
import request from '../services/api.request'


export function Nav() {
    const [servers, setServers] = useState([]);
    const [ state, dispatch ] = useGlobalState();
    let user = state.currentUser.user_id

    useEffect(() => {
        // getData(`http://127.0.0.1:8000/api/servers/?users=${user}`)
        //     .then(data => setServers(data))
        async function getServers() {
            let options = {
                method: 'GET',
                url: `http://localhost:8000/api/servers/?users=${user}`,
            }
            let response = await request(options)
            setServers(response.data)
        }
        getServers()
        }, []);
    return (
        <div className="servers">
            {console.log(servers)}
            {servers
                // .filter(server => server.users.includes(state.currentUser.user_id))
                .map(server => <Server name={server.name} id={server.id} />)}
        </div>
    )

}

const Server = ({ name, id }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {name}
        </Tooltip>
    );
    return (
        <>
            <div >
            </div>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <button
                    variant="success"
                    className="server"
                    style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }}
                >{name.charAt(0)}</button>
            </OverlayTrigger>,
        </>
    )
}