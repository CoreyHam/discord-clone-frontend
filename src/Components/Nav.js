import React, {useState, useEffect} from "react";
import {getData} from "../utils/data";

export function Nav() {
    const [servers, setServers] = useState([]);
    useEffect(() => {
        getData("http://localhost:8000/api/servers/")
        .then(data => setServers(data))
    }, []);
    return (
        <div className="container servers">
            here is some text!
            {console.log(servers)}
            {servers.map(server => <Server name={server.name} id={server.id} />)}
        </div>
    )

}

const Server = ({name, id}) => {
    return (
        <div className="server" style={{ backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16)}}>
            {name}
        </div>
    )
}