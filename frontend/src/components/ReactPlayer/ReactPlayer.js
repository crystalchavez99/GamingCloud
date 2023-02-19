import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ReactPlayer.css';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../store/song';
function ReactPlayer() {
    const audioPlayer = useRef();
    const playSongs = useSelector(state => state.song)
    //const [songs,setSong] = useState(playSongs.url)
    //console.log('RP Line 11',playSongs)
    let current = playSongs.url;
    const dispatch = useDispatch()
    //   useEffect(() => {
    //       dispatch(playSong(playSongs.id))
    //   },[])
    return (
        <div id="audio-footer" className='fixed-bottom mt-4'>
            <div id="audio-container" >
                <AudioPlayer
                   controlsList
                    src={current}
                    controls
                    ref={audioPlayer}
                    autoPlay
                    style={{background:" #f2f2f2"}}
                    // onChange={TrackChange(current)}
                />
            </div>
        </div>
    )
}

export default ReactPlayer;
