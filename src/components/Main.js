import React, {useEffect, useState} from "react";
import { getData } from "../utils/data";
import { useGlobalState } from "../context/GlobalState";




export function Main() {
    const [data, setData] = useState([]);
    const [ state, dispatch ] = useGlobalState();
    console.log(state.currentUser)
    useEffect(() => {
        getData("http://localhost:8000/api/servers/")
        .then(data => setData(data))
    }, []);

    return (
        <div className="main">
            <div className="topper">
                <h3>Channel Name | {state.currentUser.user_id}</h3>
            </div>
            <div className="lower">
                <div className="chat">
                    <div className="messages">
                        
                    </div>
                    <div className="input"></div>
                </div>
                <div className="active"></div>
            </div>
        </div>
    );
}

