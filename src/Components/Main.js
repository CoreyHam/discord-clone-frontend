import React, {useEffect, useState} from "react";
import { getData } from "../utils/data";



export function Main() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData("http://localhost:8000/api/servers/")
        .then(data => setData(data))
    }, []);

    return (
        <div className="container main">
            <div className="topper">
                <h3>Channel Name | Channel Description</h3>
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

