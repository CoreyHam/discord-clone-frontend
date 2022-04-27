import React, { useState, useEffect } from "react";
import { getData } from "../utils/data";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export function Nav() {
    const [servers, setServers] = useState([]);
    useEffect(() => {
        getData("http://localhost:8000/api/servers/")
            .then(data => setServers(data))
    }, []);
    return (
        <div className="servers">
            {console.log(servers)}
            {servers.map(server => <Server name={server.name} id={server.id} />)}
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