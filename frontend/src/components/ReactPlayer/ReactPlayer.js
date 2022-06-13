import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from '../../store/song';
function ReactPlayer(){
    const playSongs = useSelector(state => state?.song?.playingSong)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(playSong(playSongs?.id))
    },[dispatch,playSongs])
    return(
        <ReactAudioPlayer
         src={playSongs?.url}
        controls
    />
    )
}

export default ReactPlayer;
