import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function ReactPlayer({song}){

    return(
        <ReactAudioPlayer
        src={song?.url}
        controls
    />
    )
}

export default ReactPlayer;
