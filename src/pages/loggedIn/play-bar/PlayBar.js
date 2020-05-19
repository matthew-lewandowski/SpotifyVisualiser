import React, { useState, useEffect } from "react";

const playBarStyle = {
    height: '15%',
    display: 'flex',
    flexDirection: 'column',
};
const playButtonsStyle = {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
};

function PlayBar() {
    useEffect(() => {
        getCurrentPlaybackState();
    },[]);
    const getCurrentPlaybackState = () => {
        fetch('/api/getMyCurrentPlaybackState')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            }).catch(error => {
            console.log(error)
        });
    };
    return(
        <div style={playBarStyle}>
            <p>This is the song title</p>
            <div style={playButtonsStyle}>
                <button>Previous</button>
                <button>Play/Pause</button>
                <button>Next</button>
            </div>
            <p>this is the progress bar</p>
        </div>
    )
}
export default PlayBar;