import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './SplashPage.css';
import ListSongPage from '../ListSongPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/song';
import {getAllUsers} from '../../store/users';

function SplashPage() {
    const songs = useSelector(state => Object.values(state?.song));
    const artists = useSelector(state => Object.values(state?.user))
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllSongs());
        dispatch(getAllUsers())
    },[dispatch])
    //
    if(!songs){
        return null;
    }


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
            <div className='artists'>
                <p>Artists You Should Know</p>
                <div className='art-list'>
                {artists?.map(artist=>{
                    if(!artist){
                        return null;
                    }
                    return(
                    <div id="artist-information">
                        <img src={artist?.profilePicture}/>
                        <a href={`/profile/${artist?.username}`}><p>{artist?.username}</p></a>
                    </div>
                    )
                })}
                </div>
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
