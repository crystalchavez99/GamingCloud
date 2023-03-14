import React, { useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Scrollbar } from 'react-scrollbars-custom';
// import './SplashPage.css';
import ListSongPage from '../ListSongPage';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/song';
import { getAllUsers } from '../../store/users';
import { NavLink } from 'react-router-dom';

function SplashPage() {
    const songs = useSelector(state => Object.values(state.song));
    const artists = useSelector(state => Object.values(state.user.allUsers));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSongs());
        dispatch(getAllUsers())
    }, [dispatch])
    //
    if (!songs) {
        return null;
    }


    return (
        <div className='splash d-flex flex-column justify-content-center align-items-center' style={{ marginLeft: "20%", marginRight: "20%", background: "white"}}>
            <div className='card w-100'>
                <img className='card-img' src="https://res.cloudinary.com/dreambssd/image/upload/v1676262531/band-4671748_960_720_c4bs8h.jpg" style={{height: "21.875rem"}}/>
                <div className='card-img-overlay '>
                    <h1 className='card-title text-center'><span>GamingCloud</span></h1>
                    <p className='card-text text-center'>GamingCloud gives our users the ability to create your musicial talent, find fans & industries, and connect with others. </p>
                </div>
            </div>
            <div className='w-100 mb-1' style={{padding: "0.313rem", color:"black", height: "20.625rem"}}>
                <h4>GamingCloud Weekly</h4>
                <p>All of GamingCloud. Just for you.</p>
                    <Scrollbar>
                        <ListSongPage />
                    </Scrollbar>
            </div>
            <div className='w-100 ' style={{height: "20.625rem", padding: "0.313rem"}}>
                <h4 style={{color: "black"}}>Artists You Should Know</h4 >
                <div className='d-flex overflow-auto'>
                    {artists.map(artist => {
                        if (!artist || artist.length > 1) {
                            return null;
                        }
                        return (
                            <div className="artist-information" >
                                <img src={artist.profilePicture} className="rounded-circle" style={{height: "11.25rem", width: "11.25rem"}}/>
                                <NavLink to={`/profile/${artist.username}`} className="text-decoration-none"><p className='text-center'>{artist.username}</p></NavLink>
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
