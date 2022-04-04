import React, { useState } from 'react';
// import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './SplashPage.css';
import banner from '../../images/banner.jpg';

function SplashPage() {
    return (
        <div className='splash'>
            <div className='banner'>
                <h1><span>GamingCloud</span></h1>
                <p>GamingCloud gives our users the ability to create your musicial talent, find fans & industries, and connect with others. </p>
            </div>
            <div className='player'>
                <p>[WIP] Will Implement List of Songs and Artists</p>
                {/* <ReactPlayer url='https://res.cloudinary.com/dreambssd/video/upload/v1649091553/Stardew_Valley_OST_-_Stardew_Valley_Overture_fd1jmc.mp4' /> */}
                <ReactAudioPlayer
                    src="https://res.cloudinary.com/dreambssd/video/upload/v1649091553/Stardew_Valley_OST_-_Stardew_Valley_Overture_fd1jmc.mp4"
                    autoPlay
                    controls
                />
            </div>
        </div>
    )
}

export default SplashPage;
