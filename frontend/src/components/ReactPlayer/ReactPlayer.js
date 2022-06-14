import React, { useEffect, useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../store/song';
function ReactPlayer() {
    const playSongs = useSelector(state => state?.song?.playingSong)
    //const [songs,setSong] = useState(playSongs?.url)
    let current = playSongs?.url;
    console.log('current song is', playSongs)
    if(current == playSongs?.url){
        current = playSongs?.url;
    }
    const dispatch = useDispatch()
      useEffect(() => {
          dispatch(playSong(playSongs?.id))
      })
     const audioPlayer = useRef();
    return (
        <div id="audio-footer">
            <div id="audio-container">
                <audio
                   controlsList
                    src={current}
                    controls
                    ref={audioPlayer}
                    autoPlay
                    //onChange={async e => await dispatch(playSong(playSongs?.id))}
                />
            </div>
        </div>
    )
}

export default ReactPlayer;
