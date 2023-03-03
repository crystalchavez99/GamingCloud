import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './ProfilePage.css';
import { useEffect } from 'react';
import { getUser } from '../../store/users';
import React from 'react';
function ProfilePage() {
    const dispatch = useDispatch();
    const { userName } = useParams();

    useEffect(() => {
        dispatch(getUser(userName))
    }, [dispatch, userName])

    let artistInfo = useSelector(state => state?.user?.profileUser)

    // if (artistInfo.username !== userName) {
    //     return null;
    // }

    // if (!userName) {
    //     return null;
    // }

    return (
        <div>
            {artistInfo  && artistInfo.username === userName && (
                <div className="profilepage">
                    <div className='profilebanner'>
                        <div className='artistide'>
                            <img src={artistInfo?.profilePicture} alt={artistInfo?.username} />
                            <p>{artistInfo?.username}</p>
                        </div>
                    </div>
                    <div className='profilecontent'>
                        <h3>Your Songs</h3>
                        <div className='artistsong'>
                        {artistInfo?.Songs?.map(song => {
                         return (
                             <div className='singsongInfo'>
                                 <div className='songImg'>
                                     <img src={song.songCover} alt={song.title} />
                                 </div>
                                 <div className='songCatch'>
                                     <NavLink to={`/songs/${song.id}`}>
                                         <p>{`${song.title.toUpperCase()}`}</p>
                                     </NavLink>
                                 </div>
                             </div>
                         )
                     })}
                        </div>
                    </div>
                </div>

            )}
        </div>

    )
}
export default ProfilePage;
