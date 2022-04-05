//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllSongs } from '../../store/song.js';
import './ListSongPage.css';
import { NavLink } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

function ListSongPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector((state) => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }

    return (
        <div>
            <h1>SONG LIST</h1>
            <div className='songList'>
                {songs.map((song, index) => {
                    let sessionLinks;
                    if(sessionUser){
                        if(sessionUser.id === song.userId){
                            sessionLinks = (<><NavLink to={`/songs/${song.id}/edit`}>Edit</NavLink>
                            <button>Delete</button></>)
                        }
                    }
                    return (
                        <div className='song'>
                            <NavLink to={`/songs/${song.id}`} key={index}>
                                <p>{`${song.title}`}</p>
                                <p>{`${song.genre}`}</p>
                                {/* <p>{`${sessionUser.username}`}</p> */}
                                <ReactAudioPlayer
                                    src={song.url}
                                    controls
                                />
                            </NavLink>
                            {sessionLinks}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ListSongPage;
