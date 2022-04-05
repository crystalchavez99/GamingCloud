import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './SplashPage.css';
import ListSongPage from '../ListSongPage';

function SplashPage() {
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
