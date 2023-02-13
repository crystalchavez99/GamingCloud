import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './ProfilePage.css';
import { useEffect } from 'react';
import { getUser } from '../../store/users';
import React from 'react';
function ProfilePage() {
    const dispatch = useDispatch();
    const {userName} = useParams();
    console.log("PP", userName)
    const artistInfo = useSelector(state => Object.values(state.user))
    const userProfile = artistInfo[0];
    useEffect(() => {
        dispatch(getUser(userName))
    })

    if (!artistInfo) {
        return null;
    }
    if (!userName) {
        return null;
    }

    return (
        <div className="profilepage">
            <div className='profilebanner'>
                <div className='artistide'>
                    <img src={userProfile.profilePicture} alt={userProfile.username} />
                    <p>{userProfile.username}</p>
                </div>
                <div className='d-flex justify-content-end'>
                    <button>Share</button>
                    <button>Edit</button>
                </div>
            </div>
            <div className='profilecontent'>
                <h3>Your Songs</h3>
                        <div className='artistsong'>
                            {userProfile.Songs.map(song => {
                                    return (
                                        <div className='singsongInfo'>
                                            <div className='songImg'>
                                                <img src={song.songCover} alt={song.title}/>
                                            </div>
                                            <div className='songCatch'>
                                                <NavLink to={`/songs/${song.id}`}>
                                                    <p>{`${song.title.toUpperCase()}`}</p>
                                                </NavLink>
                                                {/* <ReactAudioPlayer controls src={song.url} /> */}
                                            </div>
                                        </div>

                                    )


                            })}
                        </div>



            </div>
        </div>
    )
}
export default ProfilePage;
