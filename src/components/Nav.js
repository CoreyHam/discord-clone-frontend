import React, { useState, useEffect } from "react";
// import { getData } from "../utils/data";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useGlobalState } from "../context/GlobalState";
import request from '../services/api.request'


export function Nav() {
    const [servers, setServers] = useState([]);
    const [state, dispatch] = useGlobalState();
    let user = state.currentUser.user_id

    function handleBackClick(e) {
        e.preventDefault();
        document.querySelector('.screen-dimmer').style.display = 'none';
        document.querySelector('.server-name').value = '';
    }
    function handleAddServerClick(e) {
        e.preventDefault();
        let serverName = document.querySelector('.server-name').value;
        console.log(serverName);
        if (serverName) {
            postServer( )
            document.querySelector('.screen-dimmer').style.display = 'none';
            document.querySelector('.server-name').value = '';
        }
    }

    useEffect(() => {
        // getData(`http://127.0.0.1:8000/api/servers/?users=${user}`)
        //     .then(data => setServers(data))
        async function getServers() {
            let options = {
                method: 'GET',
                url: `servers/?users=${user}`,
            }
            let response = await request(options)
            setServers(response.data)
            
        }
        getServers()
    }, [user]);

    async function postServer() {
        let serverName = document.querySelector('.server-name').value;
        let options = {
            method: 'POST',
            url: `post-servers/`,
            data: { name: serverName, users: [user], created_by: user }
        }
        let response = await request(options)
        console.log("heres the user that is making the server!", user)
        setServers([...servers, response.data])
    }

    return (
        <>
            <div className="screen-dimmer">
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
            </div>
            <div className="servers dark">
                {/* {console.log(servers)} */}
                {servers
                    // .filter(server => server.users.includes(state.currentUser.user_id))
                    .map(server => <Server name={server.name} id={server.id} key={server.id} />)}
                <AddServer />
            </div>
        </>
    )

}

const Server = ({ name, id }) => {
    const [state, dispatch] = useGlobalState();

    function getChannels(e) {
        e.preventDefault();
        // console.log(e.target.id)
        dispatch({ server_id: e.target.id, server_name: name,})
        
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {name}
        </Tooltip>
    );
    return (
        <>

            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <button
                    onClick={getChannels}
                    variant="success"
                    className="server sidebar-icon"
                    // style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) }}
                    id={id}
                >{name.charAt(0)}</button>
            </OverlayTrigger>
            <br></br>
        </>
    )
}

const AddServer = ({ id }) => {

    function handleClick(e) {
        e.preventDefault();
        document.querySelector('.screen-dimmer').style.display = 'flex';
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {'Add Server'}
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
                    className="add-server-btn server sidebar-icon"
                    onClick={handleClick}
                >{'+'}</button>
            </OverlayTrigger>
        </>
    )
}