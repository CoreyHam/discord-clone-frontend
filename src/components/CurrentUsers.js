import React, { useEffect, useState } from "react";
import request from '../services/api.request'
import { useGlobalState } from "../context/GlobalState";

export function CurrentUsers() {
    const [users, setUsers] = useState([]);
    const [state, dispatch] = useGlobalState();

    let server = state.server_id

    useEffect(() => {
        async function getMessage() {
            let options = {
                method: 'GET',
                url: `http://localhost:8000/api/servers/${server}/`,
            }
            let response = await request(options)
            setUsers(response.data.users)
        }
        getMessage()
    }, [server]);
    // console.log("This is USERS: ", users.users[0].username)
    return (
        <div className="current-users">
            <h3>USERS - {users.length}</h3>
            {/* {console.log("HERES THE USERS", users)} */}
            {users.map(user => <User user={user.username} key={user.id} />)}
        </div>
    )
}

    function User({ user }) {
        return (
            <div className="user">
                
                <div className="user-name channel-name">{user}</div>
            </div>
        )
    }

