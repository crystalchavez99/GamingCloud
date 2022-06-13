import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './SplashPage.css';
import ListSongPage from '../ListSongPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/song';

function SplashPage() {
    const songs = useSelector(state => Object.values(state.song));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllSongs());
    },[dispatch])
    //console.log(songs);
    if(!songs){
        return null;
    }
    const country = songs.map(song=>{
        //console.log(song)
        if(song.genre === 'Country'){
            return song;
        }
    })
    const gregorian = songs.map(song=>{
        //console.log(song)
        if(song.genre === 'Gregorian'){
            return song;
        }
    })
   // console.log(`country`,country)

    return (
        <div className='splash'>
            <div className='banner'>
                <h1><span>GamingCloud</span></h1>
                <p>GamingCloud gives our users the ability to create your musicial talent, find fans & industries, and connect with others. </p>
            </div>
            <div className='tracks'>
                <p>GamingCloud Weekly</p>
                <p>All of GamingCloud. Just for you.</p>
                <ListSongPage />
            </div>
            {/* <div className='player'>
                <ReactAudioPlayer
                    src="https://res.cloudinary.com/dreambssd/video/upload/v1649091553/Stardew_Valley_OST_-_Stardew_Valley_Overture_fd1jmc.mp4"
                    controls
                />
            </div> */}
        </div>
    )
}
export default SplashPage;
