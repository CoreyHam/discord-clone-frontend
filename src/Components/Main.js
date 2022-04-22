import React from "react";

export function Main() {
    return (
        <div className="container main">
            <div className="topper">
                <h3>Channel Name | Channel Description</h3>
            </div>
            <div className="lower">
                <div className="chat">
                    <div className="messages"></div>
                    <div className="input"></div>
                </div>
                <div className="active"></div>
            </div>
        </div>
    );
}