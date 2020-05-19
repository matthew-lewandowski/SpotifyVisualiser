import React from "react";
import PlayBar from "./play-bar/PlayBar";

const loggedInStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
};
const tempStyle = {
    height: "85%",
};

function LoggedIn(props) {
    return (
        <div style={loggedInStyle}>
            <div style={tempStyle}>temporary main div</div>
            <PlayBar
            />
        </div>
    )
}
export default LoggedIn;