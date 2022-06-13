import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../store/song';
function ReactPlayer() {
    const playSongs = useSelector(state => state?.song?.playingSong)
    //const [songs,setSong] = useState(playSongs?.url)
    console.log('current song is', playSongs)
    const dispatch = useDispatch()
     useEffect(() => {
         dispatch(playSong(playSongs?.id))
     })


    return (
        <div id="audio-footer">
            <div id="audio-container">
                <audio
                   controlsList
                    src={playSongs?.url}
                    controls
                    //onChange={async e => await dispatch(playSong(playSongs?.id))}
                />
            </div>
        </div>
    )
}

export default ReactPlayer;
