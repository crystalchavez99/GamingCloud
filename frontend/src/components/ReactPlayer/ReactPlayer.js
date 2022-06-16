import React, { useEffect, useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../store/song';
function ReactPlayer() {
    const audioPlayer = useRef();
    const playSongs = useSelector(state => state?.song?.playingSong)
    //const [songs,setSong] = useState(playSongs?.url)
    let current = playSongs?.url;
    
    const dispatch = useDispatch()
    //   useEffect(() => {
    //       dispatch(playSong(playSongs?.id))
    //   },[])

    return (
        <div id="audio-footer">
            <div id="audio-container">
                <audio
                   controlsList
                    src={current}
                    controls
                    ref={audioPlayer}
                    autoPlay
                    // onChange={TrackChange(current)}
                />
            </div>
        </div>
    )
}

export default ReactPlayer;
