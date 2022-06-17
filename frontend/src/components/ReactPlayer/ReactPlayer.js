import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ReactPlayer.css';
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
                <AudioPlayer
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
