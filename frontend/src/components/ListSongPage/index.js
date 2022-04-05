//import useParams from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllSongs } from '../../store/song.js';
import './ListSongPage.css';
import { NavLink } from 'react-router-dom';
function ListSongPage() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector((state) => Object.values(state.song));
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch])
    if (!songs) {
        return null;
    }
    console.log(songs)

    return (
        <div>
            <h1>SONG LIST</h1>
            <div className='songList'>
                {songs.map((song, index) => {
                    return (
                        <div className='song'>
                            <NavLink to={`/songs/${song.id}`} key={index}>
                                <p>{`${song.title}`}</p>
                                <p>{`${song.genre}`}</p>
                            </NavLink>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default ListSongPage;
